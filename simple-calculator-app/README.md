# Simple Calculator App

Minimal web app with a backend API and frontend UI.

Quick start

1. Install dependencies

```bash
cd simple-calculator-app
npm install
```

2. Start

```bash
npm start
```

Open http://localhost:3000

API

- POST `/api/calc` with JSON `{ "op": "add|sub|mul|div", "a": number, "b": number }` returns `{ "result": number }`.
