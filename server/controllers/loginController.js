const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = [{ username: 'jatna', password: 'mejia' }]; // Password is hashed
const secretKey = 'yourSecretKey'; // Store this securely, e.g., environment variable

// Generate JWT tokens
const generateToken = (username) => {
  return jwt.sign({ username }, secretKey, { expiresIn: '15m' }); // Access token valid for 15 minutes
};

const generateRefreshToken = (username) => {
  return jwt.sign({ username }, secretKey, { expiresIn: '7d' }); // Refresh token valid for 7 days
};

// Simulate user login with token generation
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

  const authToken = generateToken(username);
  const refreshToken = generateRefreshToken(username);

  res.json({ authToken, refreshToken });
});

// Token refresh route
app.post('/api/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const { username } = jwt.verify(refreshToken, secretKey);
    const newAuthToken = generateToken(username);
    res.json({ authToken: newAuthToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
