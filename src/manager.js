/**
 * @class TinyStore
 * @description A simple state management class.
 */
export class TinyStore {
  #state;
  #listeners;
  #isUpdating;

  /**
   * @constructor
   * @param {Object} [initialState={}] - The initial state object.
   */
  constructor(initialState = {}) {
    this.#state = initialState;
    this.#listeners = { all: () => {} };
    this.#isUpdating = false;
  }

  /**
   * @method getStore
   * @description Returns specific state values or the entire state.
   * @param {string[]} [stateNames=[]] - An array of state keys to retrieve.
   * @returns {Object} - The requested state object.
   */
  getStore(stateNames = []) {
    if (stateNames.length === 0) {
      return this.#state;
    }
    let result = {};
    for (const key of stateNames) {
      result[key] = this.#state[key];
    }
    return result;
  }

  /**
   * @method getState
   * @description Returns the value of a specific state key.
   * @param {string} stateName - The key of the state to retrieve.
   * @returns {*} - The requested state value.
   */
  getState(stateName) {
    return this.#state[stateName];
  }

  /**
   * @method setState
   * @description Updates the state and triggers listeners.
   * @param {Object} newState - The new state object (can contain functions or values).
   * @throws {Error} - Prevents nested state updates.
   */
  setState(newState = {}) {
    if (this.#isUpdating) {
      throw new Error(
        "State update is already in progress. Avoid triggering setState inside an effect."
      );
    }

    this.#isUpdating = true;

    if (Object.keys(newState).length === 0) {
      throw new Error("You must provide new state.");
    }
    let copied = this.#state;
    let result = {};
    let keys = ["all", ...Object.keys(newState)];

    for (let key of Object.keys(newState)) {
      if (typeof newState[key] === "function") {
        let prevValue = this.getState(key);
        let callBack = newState[key];
        let newValue = callBack(prevValue);
        result[key] = newValue;
      } else {
        result[key] = newState[key];
      }
    }

    this.#state = { ...copied, ...result };

    for (let key of keys) {
      if (key in this.#listeners) {
        if (key === "all") {
          this.#effect(key, copied, this.#state);
        } else {
          let prev = { [key]: copied[key] };
          let curr = { [key]: this.#state[key] };
          this.#effect(key, prev, curr);
        }
      }
    }

    this.#isUpdating = false;
  }

  /**
   * @method subscribeEffect
   * @description Adds a listener to detect changes in a specific state.
   * @param {string} target - The state key to listen for ("all" is also allowed).
   * @param {Function} effect - The callback function to execute when the state changes.
   * @throws {Error} - Throws an error if the state key does not exist.
   */
  subscribeEffect(target, effect) {
    if (this.#state[target] === undefined && target !== "all") {
      throw new Error("You must provide an existing state or 'all'.");
    }
    if (typeof effect !== "function") {
      throw new Error("You must provide a function for callBack.");
    }
    this.#listeners[target] = effect;
  }

  /**
   * @method unsubscribeEffect
   * @description Removes a listener for a specific state change.
   * @param {string} target - The state key to unsubscribe from ("all" is also allowed).
   * @throws {Error} - Throws an error if the state key does not exist.
   */
  unsubscribeEffect(target) {
    if (this.#state[target] === undefined && target !== "all") {
      throw new Error("You must provide an existing state or 'all'.");
    }
    let filtered = {};
    for (let key of Object.keys(this.#listeners)) {
      if (key !== target) {
        filtered[key] = this.#listeners[key];
      }
    }
    this.#listeners = filtered;
  }

  /**
   * @method #effect
   * @description Executes registered listeners when the state changes.
   * @param {string} key - The changed state key.
   * @param {Object} prevStore - The previous state.
   * @param {Object} currentStore - The current state.
   */
  #effect(key, prevStore, currentStore) {
    let callBack = this.#listeners[key];
    callBack(prevStore, currentStore);
  }
}
