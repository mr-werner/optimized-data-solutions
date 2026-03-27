const pool = require('../db');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// =======================
// REGISTER
// =======================
exports.register = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 🔐 Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Normalize email
    email = email.toLowerCase();

    // Hash password
    const hashedPassword = await argon2.hash(password);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    // Duplicate email
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    console.error('REGISTER ERROR:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 🔐 Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Normalize email
    email = email.toLowerCase();

    const result = await pool.query(
      'SELECT id, email, password FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 🔐 Create JWT with expiration
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// =======================
// GET CURRENT USER
// =======================
exports.getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);

  } catch (err) {
    console.error('GET ME ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};