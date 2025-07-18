const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER || 'root',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'task_manager_db',
  password: process.env.PGPASSWORD || 'root',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

module.exports = pool; 