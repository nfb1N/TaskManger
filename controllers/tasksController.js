const tasksService = require('../services/tasksService');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await tasksService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }
    const newTask = await tasksService.createTask(title);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await tasksService.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}; 