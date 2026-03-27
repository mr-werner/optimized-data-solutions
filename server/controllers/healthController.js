const pool = require('../db'); // ✅ THIS LINE WAS MISSING

exports.testDB = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error('DB TEST ERROR:', err);
    res.status(500).json({ error: 'DB test failed' });
  }
};