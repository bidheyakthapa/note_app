
# 📝 Note App

## 🚀 Run the Project Locally

Make sure you have **Node.js** installed on your machine.

---

### 📁 Clone the Repository

```bash
git clone https://github.com/bidheyakthapa/note_app.git
cd note_app
```

---

## ⚙️ Project Setup (Frontend + Backend)

### 🖥️ Frontend

1. Navigate to the frontend directory:

    ```bash
    cd app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

    The frontend will typically run at [http://localhost:5173](http://localhost:5173).

---

### 🔧 Backend

1. Open a new terminal window and navigate to the backend directory:

    ```bash
    cd server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the following:

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000  # Optional: Change this if you want to run on a different port
    ```

4. Start the backend server:

    ```bash
    nodemon main.js
    ```

    The backend will typically run at [http://localhost:5000](http://localhost:5000).

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance
- [Nodemon](https://www.npmjs.com/package/nodemon) installed globally or as a dev dependency
