# nabi-state - A Tiny State Management Library

nabi-state is a lightweight and intuitive state management library for JavaScript.

---

---

## Installation

You can install **nabi-state** via npm:

```bash
npm install nabi-state


## Usage

Once nabi-state is installed, you can import and use it as follows:

```javascript
// usage.js
import { createStore } from 'nabi-state';

const store = createStore({ count: 0 });

// Get specific state or all state
const count = store.getState('count');  // 0
const allState = store.getStore();  // { count: 0 }

// Set new state
store.setState({ count: 1 });

// Subscribe to state change
store.subscribeEffect('count', (prev, curr) => {
  console.log(`Count changed from ${prev.count} to ${curr.count}`);
});

// Will log: "Count changed from 0 to 1"
store.setState({ count: 1 });

// Unsubscribe from state change
store.unsubscribeEffect('count');

