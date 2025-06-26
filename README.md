# 📚 Library Management API

A production-ready, modular, and type-safe RESTful API for managing a digital library system. Built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB (via Mongoose)**.

🔗 **Live Link**: [Library Management API on Vercel](https://library-management-api-ts-mongoose.vercel.app/)

---

## 🚀 Features

- 📘 Full CRUD support for books
- 🔄 Borrow functionality with availability logic
- 🧠 Mongoose middleware for business logic enforcement
- 📊 Aggregation pipeline for borrow summary
- 🛡️ TypeScript interfaces for strict type checking
- 🧼 Clean folder structure and response formatting
- ⚙️ Custom middleware: `pre-save` and `post-update`

---

## 🗂️ Folder Structure

```
src/
├── app.ts              # Express app setup
├── server.ts           # Entry point & DB connection
├── controllers/        # Route logic (books, borrow)
├── routes/             # API route definitions
├── models/             # Mongoose schemas and methods
├── types/              # TypeScript interfaces and enums
├── utils/              # Reusable utilities (response formatting)
```

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Vercel** for deployment

---

## 📦 Installation & Setup

```bash
git clone https://github.com/pxgacademy/Library-Management-APIs-with-Express-TypeScript-Mongoose.git
cd Library-Management-APIs-with-Express-TypeScript-Mongoose
npm install
```

### 📄 .env Configuration

Create a `.env` file at the root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
```

### ▶️ Running the Server

```bash
npm run start:dev     # development mode with hot reload
npm run build         # compile TypeScript to JS
npm run start:prod    # run compiled JS with nodemon
```

### 📜 Scripts (from package.json)

```json
"scripts": {
  "start:prod": "nodemon ./dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "lint": "npx eslint",
  "lint:fix": "npx eslint . --fix",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## 🔗 API Endpoints

### 📘 Books

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| POST   | `/api/books`     | Create a book                     |
| GET    | `/api/books`     | List all books (with filter/sort) |
| GET    | `/api/books/:id` | Get single book by ID             |
| PUT    | `/api/books/:id` | Update book                       |
| DELETE | `/api/books/:id` | Delete book                       |

### 🔄 Borrow

| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| POST   | `/api/borrow` | Borrow book with validation & update |
| GET    | `/api/borrow` | Aggregation summary by book          |

---

## 📐 Validation & Business Logic

### ✅ Borrow Logic

- Borrow is only allowed if the requested quantity ≤ available copies.
- Book copies are automatically reduced during borrowing.
- If the book’s `copies` becomes 0, `available` is set to `false`.

### 🧠 Mongoose Middleware Used

1. **`pre('save')` in Borrow Model**

   - Checks book stock before borrowing
   - Reduces book copies accordingly
   - Calls `book.updateAvailability()` instance method

2. **Instance Method: `book.updateAvailability()`**

   - Dynamically sets `available = true/false` based on remaining copies

3. **`post('findOneAndUpdate')` in Book Model**
   - Ensures availability status is also updated after manual update of copies via PATCH `/api/books/:id`

```ts
bookSchema.post("findOneAndUpdate", async function (doc, next) {
  if (doc) {
    doc.available = doc.copies > 0;
    await doc.save();
  }
  next();
});
```

✅ This ensures no scenario is missed where the availability flag goes out of sync with the actual number of copies.

---

## 📊 Borrow Summary Aggregation

**GET `/api/borrow`** returns:

```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```

Aggregation Pipeline:

- Group borrow records by `book`
- Sum the total quantity borrowed
- Lookup book details from the `Book` model
- Return `{ title, isbn, totalQuantity }`

---

## ⚠️ Error Response Format

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

All errors are structured and human-readable.

---

## ✅ Code Highlights

- ✅ Modular controller/service separation
- ✅ Strict TypeScript types and validation
- ✅ Custom instance + post-update Mongoose logic
- ✅ Aggregation and population in MongoDB
- ✅ Reusable response helpers

---

## 📈 Future Improvements

- [ ] Track returned books (`isReturned`, `returnedAt`)
- [ ] Swagger/OpenAPI docs
- [ ] Jest test suite
- [ ] Role-based access control
- [ ] Add rate limiting and request logging

---

## 👤 Author

**PxG Academy**  
GitHub: [@pxgacademy](https://github.com/pxgacademy)

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

📚 Thank you for checking out the Library Management API! Contributions and feedback are welcome.

Happy coding! ✨
