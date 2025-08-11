NodeExpress - REST API Backend
Live Demo
https://vercel.com/manibala-sinhas-projects-273c5a77/node-express

A clean and scalable Node.js + Express.js RESTful API boilerplate with optional MongoDB or PostgreSQL support. This project is designed to be used as a starting point for building real-world backend services.

Live Demo Build & Deploy a Website with Node.js and Express – Full Step-by-Step Tutorial
https://youtu.be/ne4wsjVzjUk

TBD I deployed using Render, Vercel 

Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB / PostgreSQL (select and integrate your preferred DB)

Authentication: JWT (optional - see roadmap)

Testing: Postman / Jest (if added)

Folder Structure

NodeExpress/
├── controllers/       # Route logic
├── models/            # Data models (Mongoose/Sequelize)
├── routes/            # API route definitions
├── middleware/        # Custom middleware (auth, error handling)
├── config/            # Database config, env setup
├── .env               # Environment variables
├── app.js             # App entry point
└── server.js          # Server launcher

Features

Full CRUD APIs for resource models (e.g., User, Post, etc.)

Express Router structure

.env configuration using dotenv

Middleware for request parsing and error handling

Clean code following MVC principles

🔐 Authentication (Planned)

JSON Web Token (JWT)-based login/signup

Secure route protection middleware

🧪 API Testing

Use Postman or Thunder Client to test routes:

GET /api/resources

POST /api/resources

PUT /api/resources/:id

DELETE /api/resources/:id

🛠️ How to Run

git clone https://github.com/ManibalaSinha/NodeExpress.git
cd NodeExpress
npm install
cp .env.example .env
npm run dev

# 1) Quick roadmap

1. What Node.js is
2. Minimal HTTP server (core `http`)
3. Why Express exists
4. Basic Express app (`GET`, `POST`)
5. Middleware (what & order)
6. Routing & `express.Router()`
7. Async routes & error handling
8. Static files, body parsing, and common middleware
9. Security, tooling & deployment notes
10. Small hands-on exercises you can try

---

# 2) What is Node.js (core concepts)

* **Runtime, not a framework**: Node.js runs JavaScript on the server (V8 engine + libuv).
* **Single-threaded event loop**: handles concurrent I/O by non-blocking callbacks/promises instead of blocking threads. Great for I/O heavy apps.
* **Modules**: CommonJS (`require`) or ES Modules (`import` + `"type":"module"` in `package.json`).
* **npm**: package manager; `package.json` describes your app and scripts.

Commands:

```bash
node -v
npm init -y
npm i express
npm i --save-dev nodemon
```

---

# 3) Minimal Node HTTP server (why Express helps)

Plain Node HTTP server (shows plumbing Express abstracts):

```js
// server.js (core http)
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node http!\n');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});
server.listen(3000);
```

This works, but it gets verbose quickly (routing, parsing bodies, middleware, error handling) — Enter **Express**.

---

# 4) Hello World with Express

```js
// index.js
const express = require('express');
const app = express();

app.use(express.json()); // parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening ${PORT}`));
```

Run: `node index.js` or `npm run dev` (with nodemon).

---

# 5) Request & Response basics

* `req` — incoming request object: `req.params`, `req.query`, `req.body`, `req.headers`.
* `res` — response helpers: `res.send()`, `res.json()`, `res.status()`, `res.sendFile()`, `res.set()`.

Example usage:

```js
app.get('/users/:id', (req, res) => {
  const id = req.params.id;        // route param
  const q = req.query.verbose;    // ?verbose=true
  res.json({ id, q });
});
```

---

# 6) Middleware — the heart of Express

* **What**: functions that run in sequence for each request: `function (req, res, next)`.
* **Order matters**: middleware runs in registration order.
* **Types**: app-level, route-level, error-handling (4 args), third-party.

Logger example:

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

Error-handling middleware:

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});
```

---

# 7) Routing & `express.Router()`

Modularize routes using `Router()`:

```js
// routes/tasks.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json(tasks));
router.post('/', (req, res) => { /* create */ });

module.exports = router;

// index.js
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);
```

---

# 8) CRUD example (in-memory tasks)

```js
const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.get('/tasks/:id', (req, res) => {
  const t = tasks.find(x => x.id === +req.params.id);
  if (!t) return res.status(404).json({ error: 'not found' });
  res.json(t);
});

app.put('/tasks/:id', (req, res) => {
  const t = tasks.find(x => x.id === +req.params.id);
  if (!t) return res.status(404).json({ error: 'not found' });
  Object.assign(t, req.body);
  res.json(t);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(x => x.id !== +req.params.id);
  res.status(204).end();
});

app.listen(3000);
```

This demonstrates route handlers, status codes, and JSON bodies.

---

# 9) Async routes and error handling

Async DB calls must propagate errors to Express. Use `try/catch` or an async wrapper:

```js
// wrapper
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// usage
app.get('/db', asyncHandler(async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
}));
```

If you omit `.catch(next)`, rejected promises may crash or become unhandled.

---

# 10) Common middlewares & tools

* `express.json()` / `express.urlencoded()` — body parsing (built-in).
* `cors` — enable Cross-Origin Resource Sharing.
* `helmet` — sets secure HTTP headers.
* `morgan` — request logging.
* `dotenv` — load env vars from `.env`: `require('dotenv').config()`.
* `multer` — file uploads.
* `express-validator` — input validation/sanitization.

Install examples:

```bash
npm i cors helmet morgan dotenv
npm i express-validator
```

---

# 11) Static files & templating

* Serve static: `app.use(express.static('public'))`
* Render server-side templates: set a view engine (Pug/EJS) and use `res.render('page', data)`.

---

# 12) Testing & debugging

* Test endpoints: `supertest` + `jest`/`mocha`.
* Debug: `node --inspect` and Chrome DevTools or VSCode debugger.
* Dev auto-reload: `nodemon`.

---

# 13) Deployment & production tips

* Read `PORT` from `process.env.PORT` and use `NODE_ENV` to toggle behavior.
* Use a process manager: PM2 or a PaaS (Heroku, Render, Railway).
* Use a reverse proxy (nginx) for TLS, load balancing, and static caching.
* Graceful shutdown: listen to `SIGINT`/`SIGTERM` to close DB connections.

---

# 14) Best practices

* Project layout: `src/` with `routes/`, `controllers/`, `services/`, `models/`, `middleware/`.
* Keep controllers thin; business logic in services.
* Validate all input.
* Centralize error handling.
* Avoid blocking the event loop (no heavy CPU in main thread). For CPU-heavy work, use workers or offload to other services.

---

# 15) Common pitfalls

* Forgetting `express.json()` → `req.body` is `undefined`.
* Middleware order mistakes (e.g., registering auth after routes).
* Not catching promise rejections in routes.
* Blocking the event loop with sync heavy work.
* Leaving secrets in code (use env vars).

---

# 16) mini roadmap (hands-on)

1. Build the `tasks` CRUD API above and test with Postman.
2. Add validation (`express-validator`) and persist to SQLite/Postgres.
3. Add JWT authentication (login + protected routes).
4. Add file uploads (profile picture with `multer`).
5. Add tests with `supertest` + `jest`.

Author

Manibala SinhaGitHub • LinkedIn

License

This project is open source and available under the MIT License.
