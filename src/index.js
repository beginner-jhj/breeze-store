import { Breeze } from "./manager.js";

/**
 * @function createStore
 * @description A helper function to create a new Store instance with the provided initial state.
 * @param {Object} [initialState={}] - The initial state object for the store.
 * @returns {Breeze} - A new instance of the store with the given initial state.
 */

export function createBreeze(initialState) {
  return new Breeze(initialState);
}
