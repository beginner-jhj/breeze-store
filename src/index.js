import { Pico } from "./manager.js";

/**
 * @function createPico
 * @description A helper function to create a new Pico Store instance with the provided initial state.
 * @param {Object} [initialState={}] - The initial state object for the Pico store.
 * @returns {Pico} - A new instance of the Pico Store with the given initial state.
 */

export function createPico(initialState) {
  return new Pico(initialState);
}
