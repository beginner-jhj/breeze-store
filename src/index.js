import { Store } from "./store.js";

/**
 * @function createStore
 * @description A helper function to create a new Store instance with the provided initial state.
 * @param {Object} [initialState={}] - The initial state object for the store.
 * @returns {Store} - A new instance of the store with the given initial state.
 */

export function createStore(initialState) {
  return new Store(initialState);
}
