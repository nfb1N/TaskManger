const pool = require('../db/index');

exports.getAll = async () => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id');
  return result.rows;
};

exports.create = async (title, description) => {
  const result = await pool.query(
    'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
    [title, description || '']
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return result.rowCount > 0;
};

exports.update = async (id, updates) => {
  const fields = [];
  const values = [];
  let idx = 1;
  if (updates.title !== undefined) {
    fields.push(`title = $${idx++}`);
    values.push(updates.title);
  }
  if (updates.description !== undefined) {
    fields.push(`description = $${idx++}`);
    values.push(updates.description);
  }
  if (fields.length === 0) return null;
  values.push(id);
  const result = await pool.query(
    `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
}; 