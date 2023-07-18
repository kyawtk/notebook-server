const express = require("express");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("./util/authenticateUser");
const isValid = require("./util/validUser");
const verifyToken = require("./util/verifyToken");
const cors = require('cors')
const User = require("./models/user");
const {loginUser, registerUser} = require('./controllers/indexControllers')

// Initialize app
const app = express();

// Connect to MongoDB
const connectToMongoDb = require("./db");
connectToMongoDb();

// Middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}))
// Routers
const notesRouter = require("./routes/notes");

// Middleware to verify token for all /notes routes
app.use("/notes", verifyToken);

// Mount the notes router
app.use("/notes", notesRouter);

// Route to handle the login request
app.post("/login", loginUser);
// Route to handle user registration
app.post("/register", registerUser);
// Default route
app.get("/", (req, res) => {
  res.send("Hello from the server");
});


// Catch all unmatched routes (404)
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
