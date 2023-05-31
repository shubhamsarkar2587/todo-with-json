const express = require('express');
const todoRouter = require('./routes/todo.route');

// init 
const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/v1/', todoRouter);
app.use((err, req, res, next) => {
  console.error(err, 'Internal server error');
  res.status(500).json({ error: 'Internal server error' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`)
});
