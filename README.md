# MERN Stack Todo Application with Role-Based Authentication

This is a full-stack Todo web application built using **MongoDB**, **Express.js**, **React.js**, and **Node.js** (MERN Stack). It features robust user authentication, role-based access control (RBAC), and comprehensive Todo management functionality.

---

## 🚀 Implemented Features

### 🔐 User Authentication
- **Registration:**
  - Users can sign up with an email, username, and password.
  - Email format validation and enforcement of a minimum password length of 8 characters.
  - Passwords are securely hashed using bcrypt before being stored in the database.
  - Each registered user is assigned a default role of `user`.
- **Login:**
  - Enables login with either email or username and password.
  - Returns a JWT (JSON Web Token) upon successful login for session management.
  - Includes the user's role in the JWT payload for access control.
- **Security & Role-Based Access:**
  - All Todo-related routes are protected to ensure only authenticated users can access them.
  - Role-based authorization is implemented:
    - Only `admin` users can access certain specific routes or perform actions.
  - Middleware verifies both authentication (JWT) and role (if needed).

### ✅ Todo Functionality
- **Create Todo:**
  - Users can create a todo with a title, description, due date, and category.
  - Title is required (max 100 characters), description is optional (max 500 characters).
  - Category is a dropdown with `Urgent` or `Non-Urgent` options.
  - Each Todo is automatically linked to the authenticated user who created it.
- **View Todos:**
  - `user` role: can view only their own todos.
  - `admin` role: can toggle between viewing their own todos and viewing all users' todos.
- **Edit Todo:**
  - `user` role: can edit only their own todos.
  - `admin` role: can edit any todo.
- **Delete Todo:**
  - `user` role: can delete only their own todos.
  - `admin` role: can delete any todo.
- **Mark as "completed" & Filter:**
  - Todos can be marked as "completed".
  - Todos can be filtered based on their completion status.
- **Search & Filter:**
  - Todos can be searched and filtered by title, description, or category.

### 📊 Admin Dashboard
- Visible only to `admin` role users.
- Ability to view all registered users.
- Ability to view all todos from all users.
- Optional ability to change user roles (e.g., promote to admin, demote to user).

### 🎨 Attractive and Responsive UI
- A modern, attractive, and fully responsive user interface built using React.js and Tailwind CSS.
- Login and Register pages are specifically designed to be beautiful and user-friendly, incorporating gradients, shadows, and smooth transitions.
- Utilizes React Hooks (`useState`, `useEffect`, `useCallback`).
- Built with reusable components (e.g., Navbar, LoadingSpinner).
- Includes loading states (spinners) during API calls.

### ⚙️ Backend (Node.js/Express.js)
- Provides RESTful API endpoints.
- Uses Mongoose for database interactions with MongoDB.
- Includes input validation using express-validator.
- Features proper error handling (e.g., 401 unauthorized, 403 forbidden).

### 🗄️ Database (MongoDB)
- MongoDB is used with Mongoose.
- Two main collections: `users` (email, username, hashed password, role) and `todos` (title, description, due date, category, completed status, user reference).
- Indexes are added on frequently queried fields (e.g., user in todos, email in users).

---

## ✨ Potential Future Enhancements
- **Authentication Enhancements:**
  - Email OTP Verification: Implement email One-Time Password (OTP) verification for registration and login.
  - Forgot Password/Password Reset: Allow users to reset their forgotten passwords.
  - Social Login: Ability to log in via platforms like Google, GitHub, etc.
- **Todo Functionality Enhancements:**
  - Task Priority: Mark todos with priorities like High, Medium, Low.
  - Tags/Labels: Add custom tags or labels to todos.
  - Reminders/Notifications: Reminders for due dates via email or in-app notifications.
  - Recurring Todos: Create todos that repeat daily, weekly, monthly.
  - File Attachments: Attach files or images to todos.
  - Sub-tasks: Create smaller sub-tasks for larger todos.
  - Drag-and-Drop Reordering: Reorder todos by dragging and dropping them.
- **Collaboration Features:**
  - Share Todos: Ability to share todos with other users.
  - Team/Project Management: Group todos for teams or projects.
- **UI/UX Improvements:**
  - Dark Mode: A dark mode toggle for the application.
  - Animations: More engaging animations for todo creation, update, and deletion.
  - User Profile Page: A dedicated page for users to view and edit their profile information.
- **AI Integration:**
  - AI Assistant: Integrate a large language model (LLM) like Gemini or ChatGPT to:
    - Generate todo descriptions based on titles.
    - Summarize long descriptions.
    - Suggest categories or due dates.
    - Answer questions about tasks or productivity.
  - AI-Powered Search: More intelligent search using Natural Language Processing.
- **Real-time Updates:**
  - Use WebSockets (e.g., Socket.IO) for real-time todo updates across multiple clients.
- **Deployment:**
  - Instructions for deploying the application to cloud platforms (e.g., Render, Vercel, Netlify).
- **Testing:**
  - More comprehensive unit/integration testing for both frontend and backend.

---

## 🛠️ Setup Instructions

### **Prerequisites**
- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB (local installation or cloud service like MongoDB Atlas)

### **1. Clone the repository:**
```bash
git clone <your-repository-url>
cd todo-mern-app
```

### **2. Backend Setup:**
```bash
cd server
npm install
```
Create a `.env` file in the `server/` directory with the following content:
```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=a_very_strong_and_random_secret_key_for_jwt_signing
PORT=5000
```
- **MONGO_URI:** Get your MongoDB connection string (e.g., from MongoDB Atlas). Make sure to replace `<username>`, `<password>`, and `<cluster_name>` with your actual information.
- **JWT_SECRET:** Generate a long, random string.

### **3. Frontend Setup:**
```bash
cd ../client
npm install
```
Create a `craco.config.js` file in the `client/` directory with the following content:
```js
// client/craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
```
Modify the `scripts` section in your `client/package.json` file to use craco:
```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
},
```

### **4. Clear Cache and Rebuild:**
To ensure no old configurations are lingering, run the following commands:

```powershell
# Make sure you are in D:\Shivam's Codebase\React Projects\todo-mern-app\client
Remove-Item -Path "node_modules" -Recurse -Force
Remove-Item -Path "package-lock.json" -Force
Remove-Item -Path ".cache" -Recurse -Force -ErrorAction SilentlyContinue
npm cache clean --force
```

### **5. Reinstall all dependencies:**
```bash
npm install
```

---

## 🚀 How to Run the App

### **1. Start the Backend Server:**
In your terminal, navigate to the `server/` directory and run:
```bash
cd server
npm start # or node app.js
```
You should see `MongoDB Connected...` and `Server running on port 5000`.

### **2. Start the Frontend Development Server:**
Open a new terminal, navigate to the `client/` directory and run:
```bash
cd client
npm start
```
This will open the application in your browser, usually at [http://localhost:3000](http://localhost:3000).

---

## 📝 Accessing the Application
- **Registration:** Go to `/register` to create a new user.
- **Admin User:** To create an admin user, you can manually change a user's role in your MongoDB database (e.g., using MongoDB Compass or Atlas UI) from `user` to `admin` for testing purposes, or use the "Promote to Admin" feature on the Admin Dashboard once an admin account exists.
- **Login:** Use the registered credentials to log in.

## 📫 Contact

For any questions, feedback, or collaboration opportunities, feel free to reach out:

- **Name:** Shivam Srivastava
- **Role:** Full Stack Developer
- **Email:** shivamsri142@gmail.com
- **LinkedIn:** [developer-shivam](https://www.linkedin.com/in/developer-shivam)
- **Instagram:** [developer_shivam_](https://www.instagram.com/developer_shivam_)
