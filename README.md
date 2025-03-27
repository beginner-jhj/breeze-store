# Pico - A Tiny State Management Library

Pico is a lightweight and intuitive state management library for JavaScript. It provides a simple API to manage and update application state seamlessly without the complexity of large frameworks.

---

---

## Installation

You can install **Pico** via npm:

```bash
npm install pico-state


## Usage

Once Pico is installed, you can import and use it as follows:

```javascript
// usage.js
import { createPico } from 'pico-state';

const store = createPico({ count: 0 });

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

