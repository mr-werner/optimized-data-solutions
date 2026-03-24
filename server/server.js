const express = require('express');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // or wherever your client runs
  credentials: true
}));
app.options('*', cors()); 
app.use(express.json());



// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

//Add Login Route - JMW
app.post('/api/login', (req, res) => {
  const { email } = req.body;

  // create user INSIDE the route
  const user = {
    id: 1,
    email,
    companyId: 123
  };

  // generate token USING that user
  const token = jwt.sign(user, process.env.JWT_SECRET);

  res.json({ token });
});

app.get('/api/login', (req, res) => {
  res.status(405).json({
    error: 'Method Not Allowed. Use POST.'
  });
});

// Test supersecretkey
console.log(process.env.JWT_SECRET);


// Add Protected Route for Middleware
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'You accessed protected data!',
    user: req.user
  });
});

//Test API services
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
