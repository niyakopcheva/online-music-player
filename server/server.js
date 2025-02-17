const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: '*', 
})); // Allows React app to make requests to this server
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

app.get('/artists', (req, res) => {
  db.query('SELECT * FROM artists', (err, results) => {
    if (err) throw err;
    res.json(results);
  })
});

app.get('/songs', (req, res) => {
  db.query('SELECT * FROM songs', (err, results) => {
    if (err) throw err;
    res.json(results);
  } );
});



app.post('/add-artist', (req, res) => {
  const {name, profile_pic_path} = req.body;
  const query = `INSERT INTO artists (name, profile_pic_path) VALUES (?, ?)`;
  const values = [name, profile_pic_path];

  db.query(query, values, (err, result) => {
    if(err) {
      res.status(500).json({ error: 'Failed to add artist', message: err.message });
    } else {
      res.status(201).json({ message: 'Artist added successfully', artistID: result.insertId });
    }
  });
});

app.post('/add-song', (req, res) => {
  const {name, artist_id, album, duration, audio_file_path, pic_path} = req.body;
  if (!name || !artist_id || !album || !duration) {
    return res.status(400).json({ error: 'Please provide name, artist_id, album and duration' });
  }

  const query = `INSERT INTO songs (name, artist_id, album, duration, audio_file_path, pic_path) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [name, artist_id, album, duration,  audio_file_path, pic_path];

  db.query(query, values, (err, result) => {
    if (err) {
        res.status(500).json({ error: 'Failed to add song', message: err.message });
    } else {
        res.status(201).json({ message: 'Song added successfully', songId: result.insertId });
    }
  });
  
});

app.delete('/delete-song', (req, res) => {
  console.log("Received request body:", req.body);
  const {name, artist_id, album} = req.body;

  if (!name || !artist_id || !album) {
    return res.status(400).json({ error: 'Please provide song name, album and artist!' });
  }

  // First, check if the record exists
  const checkSql = "SELECT * FROM songs WHERE name = ? AND artist_id = ? AND album = ?";
  db.query(checkSql, [name, artist_id, album], (err, results) => {
    if (err) {
        console.error("Error checking song:", err);
        return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
        return res.status(404).json({ message: "No matching song found" });
    }

    //If record exists, delete it
    const deteteSql = "DELETE FROM songs WHERE name= ? AND artist_id= ? AND album= ?";
    db.query(deteteSql, [name, artist_id, album], (err, result) => {
        if (err) {
          console.error("Error deleting song:", err);
          return res.status(500).json({ error: "Database error" });
      }

      res.status(200).json({ message: "Song deleted successfully!" });
    })
});
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


