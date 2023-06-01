const { getTodoFromFile, saveTodoToFile } = require('../utils/todo.util');

const getAllTodos = async (req, res) => {
	try {
		const todos = await getTodoFromFile();
		res.json(todos);
	} catch (err) {
		console.log(err);
	}
};

const getTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const todos = await getTodoFromFile();
		const todo = todos.find((todo) => todo.id === parseInt(id));
		if (todo) {
			res.json(todo);
		} else {
			res.status(404).json({ error: 'Todo not found' });
		}
	} catch (err) {
		console.log(err);
	}
};

const createTodo = async (req, res) => {
	try {
		const { title } = req.body;
		if (title) {
			const todos = await getTodoFromFile();
			const todo = { id: Date.now(), title };
			todos.push(todo);
			const saveTodos = await saveTodoToFile(todos);
			res.status(201).json(saveTodos);
		} else {
			res.status(400).json({ error: 'Title is required' });
		}
	} catch (err) {
		console.log(err);
	}
};

const updateTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const { title } = req.body;

		const todos = await getTodoFromFile();
		const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

		if (todoIndex !== -1) {
			todos[todoIndex].title = title;
			const saveTodos = await saveTodoToFile(todos);
			res.status(200).json(saveTodos);
		} else {
			res.status(404).json({ error: 'Todo not found' });
		}
	} catch (err) {
		console.log(err);
	}
};

const deleteTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const todos = await getTodoFromFile();
		const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

		if (todoIndex !== -1) {
			const filterTodo = todos.filter((todo) => todo.id !== parseInt(id));
			const saveTodos = await saveTodoToFile(filterTodo);
			res.status(200).json(saveTodos);
		} else {
			res.status(404).json({ error: 'Todo not found' });
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getAllTodos,
	getTodo,
	createTodo,
	updateTodo,
	deleteTodo
};
