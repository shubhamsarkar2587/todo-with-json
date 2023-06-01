const express = require('express');
const { getAllTodos, createTodo, getTodo, deleteTodo } = require('../controllers/todo.controller');
const { updateTodo } = require('../controllers/todo.controller');

const router = express.Router();

router.get('/', getAllTodos).post('/', createTodo);
router.get('/:id', getTodo).put('/:id', updateTodo).delete('/:id', deleteTodo)

module.exports = router;
