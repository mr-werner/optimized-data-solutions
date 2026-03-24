//const bcrypt = require('bcrypt');
const argon2 = require('argon2');
const pool = require('./db');

module.exports = pool;

exports.testDB = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB test failed' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};