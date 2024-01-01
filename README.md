# winix

A simple, lightweight, global state management library for React. It is inspired by Zustand, but it is much simpler and has zero dependencies. It is written in TypeScript and has zero dependencies.
The size of the library is 0.3KB (minified and gzipped).

## Installation

```bash
npm install winix
yarn install winix
pnpm install winix
bun install winix
```

## Usage

### Define a store
```javascript
import { createStore } from 'winix';

const useCounter = createStore((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### Use the store
```javascript
import { useCounter } from './useCounter';

function Counter() {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```
A better way would be to use the `selector` function to select the required state from the store.
```javascript
import { useCounter } from './useCounter';

function Counter() {
  const count = useCounter((state) => state.count);

  return (
    <div>
      <h1>Counter is currently at {count}</h1>
    </div>
  );
}
```
This is helpful when you have a large store and you only want to use a small part of it. This will also prevent unnecessary re-renders.

### TypeScript Usage (Recommended)
```typescript
import { createStore } from 'winix';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounter = createStore<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```
This will provide type safety and intellisense. It will also provide type safety for the `selector` function. Return type of `useCounter` will be inferred based on the selector function.

```typescript
import { useCounter } from './useCounter';

function Counter() {
  const count = useCounter((state) => state.count); // variable will be inferred as number
  const countStore = useCounter(); // variable will be inferred as CounterState

  return (
    <div>
      <h1>Counter is currently at {count}</h1>
    </div>
  );
}
```





