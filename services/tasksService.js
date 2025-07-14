const pool = require('./db');

exports.getAllTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id');
  return result.rows;
};

exports.createTask = async (title) => {
  const result = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [title]
  );
  return result.rows[0];
};

exports.deleteTask = async (id) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return result.rowCount > 0;
}; 