# File map — simple-calculator-app

Very brief descriptions of the repository files.

- `package.json`: npm manifest with scripts (`start`, `dev`) and dependencies.
- `server.js`: Express server; serves static files and exposes POST `/api/calc` API.
- `functions/calculator.js`: Calculator logic (`calculate(op, a, b)`) and error handling.
- `public/index.html`: Frontend HTML UI for the calculator.
- `public/app.js`: Frontend JavaScript — sends requests to `/api/calc` and updates the UI.
- `public/styles.css`: Minimal styles for the UI.
- `README.md`: Project overview and run instructions.
- `.gitignore`: Files and folders to ignore (e.g., `node_modules`).
- `FILES.md`: This concise file map.


![alt text](<Public Frontend to Server-2026-03-04-160609.png>)
![alt text](sequence-diagram.png)

To view below files - command+shift+v
==============================

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Calculator as "CalculatorModule"

    User->>Browser: Enter expression & click calculate
    Browser->>Server: POST /calculate with data
    Server->>Calculator: calculate(expression)
    Calculator-->>Server: result
    Server-->>Browser: JSON { result }
    Browser-->>User: display result
```

===============================

```mermaid
    flowchart LR
    User[User Browser]

    subgraph Public_Frontend["Public / Frontend"]
        HTML[index.html]
        JS[app.js]
        CSS[styles.css]
    end

    subgraph ServerSide[Server]
        Express["Express server (server.js)"]
        API["POST /api/calc (API route)"]
        Calc["Calculator module (functions/calculator.js)"]
    end

    Node["Node.js + npm (package.json)"]
    README[README.md]

    User --> HTML
    HTML --> JS
    HTML --> CSS
    JS -->|"POST /api/calc (JSON)"| API
    API --> Express
    Express --> Calc
    Calc --> Express
    Express -->|"serves static files"| HTML
    Express -->|"JSON result"| JS
    Node --> Express
    README --> Node
```