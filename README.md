# Pico - A Tiny State Management Library

Pico is a lightweight and intuitive state management library for JavaScript. It provides a simple API to manage and update application state seamlessly without the complexity of large frameworks.

---

---

## Installation

You can install **Pico** via npm:

```bash
npm install pico-state


import { createPico } from 'pico-state';

const store = createPico({ count: 0 });

// Get specific state or all state
const count = store.getState('count');  // 0
const allState = store.getStore();  // { count: 0 }

// Set new state
store.setState({ count: 1 });

store.subscribeEffect('count', (prev, curr) => {
  console.log(`Count changed from ${prev.count} to ${curr.count}`);
});

// Will log: "Count changed from 0 to 1"
store.setState({ count: 1 });

store.unsubscribeEffect('count');

API

createPico(initialState = {})
    Description: Creates a new instance of the Pico Store with the provided initial state.

    Arguments:
        initialState (Object): The initial state to initialize the store. Default is {}.

    Returns: A new instance of the Pico Store.

store.getState(stateName)
    Description: Retrieves the value of a specific state key.

    Arguments:
        stateName (String): The key of the state to retrieve.
    
    Returns: The value of the state key.
    
store.getStore(stateNames = [])
    Description: Retrieves specific state values or the entire state.
    
    Arguments:
        stateNames (Array): An array of state keys to retrieve.
    
    Returns: An object containing the requested state.
    
store.setState(newState)
    Description: Updates the state and triggers the associated listeners.
    
    Arguments:
        newState (Object): The new state object, which can include functions or static values.
    
    Throws:
        Throws an error if there is already an ongoing state update.
    
store.subscribeEffect(target, effect)
    Description: Adds a listener that detects changes in a specific state.
    
    Arguments:
        target (String): The state key to listen for (or "all" for all states).
        effect (Function): The callback function to execute when the state changes.
    
    Throws:
        Throws an error if the state key does not exist or the effect is not a function.
    
store.unsubscribeEffect(target)
    Description: Removes the listener for a specific state change.
    
    Arguments:
        target (String): The state key to unsubscribe from.
    
    Throws:
        Throws an error if the state key does not exist.