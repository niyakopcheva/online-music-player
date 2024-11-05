const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allows React app to make requests to this server
app.use(express.json()); // Parses incoming JSON requests

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '0000',
  database: 'music_player'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Example route to get users from MySQL
/* app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
*/

app.post('/add-song', (req, res) => {
  const {title, artist_id, album, duration, file_path} = req.body;

  const query = `INSERT INTO songs (title, artist_id, album, duration, file_path) VALUES (?, ?, ?, ?, ?)`;
  const values = [title, artist_id, album, duration, file_path];

  db.query(query, values, (err, result) => {
    if (err) {
        res.status(500).json({ error: 'Failed to add song', message: err.message });
    } else {
        res.status(201).json({ message: 'Song added successfully', songId: result.insertId });
    }
  });
  
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


