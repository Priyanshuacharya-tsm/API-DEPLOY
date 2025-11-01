const express = require('express');
const connectDB = require('./db');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// --- Error Handling Middleware ---
// This MUST be the last middleware used
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});