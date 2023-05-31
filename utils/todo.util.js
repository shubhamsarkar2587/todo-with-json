const fs = require('fs');
const path = require('path');

const todoFile = '../data/todo.json';
const filePath = path.join(__dirname, todoFile);

const getTodoFromFile = async () => {
  if (fs.existsSync(filePath)) {
    const todoString = await fs.promises.readFile(filePath, 'utf8');
    return await JSON.parse(todoString)
  } else {
    const initData = [];
    await fs.promises.writeFile(filePath, JSON.stringify(initData))
    const todoString = await fs.promises.readFile(filePath, 'utf8');
    return await JSON.parse(todoString)
  }
};

const saveTodoToFile = async (todos) => {
  await fs.promises.writeFile(filePath, JSON.stringify(todos));
  const todoString = await fs.promises.readFile(filePath, 'utf8');
  return await JSON.parse(todoString)
};

module.exports = {
  getTodoFromFile,
  saveTodoToFile
};
