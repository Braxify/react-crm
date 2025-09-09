# React CRM

A small CRM project on React + Vite, built with an emphasis on development convenience, performance, and a modern stack.

---

## Stack

### Libraries I've used

- **[@tanstack/react-query](https://tanstack.com/query/latest)**  
  For working with server data (loading, caching, synchronization).
  It's way better than writing my own wrappers with useEffect etc.

- **[@tanstack/react-virtual](https://tanstack.com/virtual/latest)**  
  For virtualizing long lists and tables.  
  Even with large count of rows, rendering remains fast because only visible elements are added to the DOM.

- **[tailwindcss](https://tailwindcss.com/)**  
  "Rapidly build modern websites without ever leaving your HTML."

- **[shadcn/ui](https://ui.shadcn.com/)**  
  A set of headless components.
  It looks cool and the future is here :)

- **[sonner](https://sonner.emilkowal.ski/)**  
  Lightweight library for notificationss.

- **[react-use](https://github.com/streamich/react-use)**  
  A collection of hooks for React. (`useMount`, `useWindowSize`). I don't need to write my own hooks.

- **[husky](https://typicode.github.io/husky/)**  
  Allows me to run scripts before executing git commits.
  I use it with prettier and eslint.

---

## Launching the project

### Installing dependencies

```bash
npm install
```

### Starting the project

```bash
npm run dev
```
