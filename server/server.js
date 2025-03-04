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

{/* SEARCH */ }
app.get('/search', (req, res) => {
  const { category, query, offset = 0 } = req.query;

  if (!query) return res.json([]);

  const values = [`%${query}%`, parseInt(offset, 10)];

  let sql;

  if (category === 'artists') {
    sql = "SELECT id, name FROM artists WHERE name LIKE ? LIMIT 10 OFFSET ?";
  } else if (category === 'songs') {
    sql = "SELECT id, name FROM songs WHERE name LIKE ? LIMIT 10 OFFSET ?";
  } else {
    return res.status(400).json({ error: "Invalid category" });
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

{/* ARTISTS */ }
app.get('/artists', (req, res) => {
  db.query('SELECT * FROM artists', (err, results) => {
    if (err) throw err;
    res.json(results);
  })
});

app.post('/artists', (req, res) => {
  const { name, profile_pic_path } = req.body;

  if (!name || name === "") {
    return res.status(400).json({ error: 'Please provide name' });
  }

  const query = `INSERT INTO artists (name, profile_pic_path) VALUES (?, ?)`;
  const values = [name, profile_pic_path];

  db.query(query, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add artist', message: err.message });
    } else {
      res.status(201).json({ message: 'Artist added successfully', artistID: result.insertId });
    }
    console.log(res);
  });
});

app.delete('/artists', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Please provide id of the artist' });
  }
  //Check
  const checkSql = `SELECT * FROM artists WHERE id = ? `;
  db.query(checkSql, [id], (err, results) => {
    if (err) {
      console.error("Error checking artist:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No matching song found" });
    }

    //If record exists, delete it
    const deleteSql = `DELETE FROM artists WHERE id = ? `;
    db.query(deleteSql, [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to delete artist", message: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "No artist was deleted. It may not exist." });
      } else {
        res.status(200).json({ message: "Artist deleted successfully!" });
      }
    });
  });
});

app.patch('/artists', (req, res) => {
  console.log("Received request body:", req.body);
  const { id, name, profile_pic_path } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Artist ID is required for updating!' });
  }

  let updates = [];
  let values = [];

  if (name) {
    updates.push('name = ?');
    values.push(name);
  }
  if (profile_pic_path) {
    updates.push('profile_pic_path = ?');
    values.push(profile_pic_path);
  }

  values.push(id);

  const updateSql = `UPDATE artists SET ${updates.join(', ')} WHERE id = ?`;

  db.query(updateSql, values, (err, result) => {
    if (err) {
      console.error("Error updating artist:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Artist not found!" });
    }

    res.status(200).json({ message: "Artist updated successfully!" });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

{/* SONGS */ }
app.get('/songs', (req, res) => {
  db.query('SELECT * FROM songs', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/songs', (req, res) => {
  const { name, artist_id, album, duration, audio_file_path, pic_path } = req.body;
  if (!name || !artist_id || !album || !duration) {
    return res.status(400).json({ error: 'Please provide name, artist_id, album and duration' });
  }

  const query = `INSERT INTO songs (name, artist_id, album, duration, audio_file_path, pic_path) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [name, artist_id, album, duration, audio_file_path, pic_path];

  db.query(query, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add song', message: err.message });
    } else {
      res.status(201).json({ message: 'Song added successfully', songId: result.insertId });
    }
  });

});

app.delete('/songs', (req, res) => {
  console.log("Received request body:", req.body);
  const { name, artist_id } = req.body;

  if (name == null || artist_id == null) {
    return res.status(400).json({ error: 'Please provide song name and artist!' });
  }

  // First, check if the record exists
  const checkSql = "SELECT * FROM songs WHERE name = ? AND artist_id = ? ";
  db.query(checkSql, [name, artist_id], (err, results) => {
    if (err) {
      console.error("Error checking song:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No matching song found" });
    }

    //If record exists, delete it
    const deleteSql = "DELETE FROM songs WHERE name= ? AND artist_id= ? ";
    db.query(deleteSql, [name, artist_id], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to delete song", message: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "No song was deleted. It may not exist." });
      } else {
        res.status(200).json({ message: "Song deleted successfully!" });
      }

    })
  });
});

app.patch('/songs', (req, res) => {
  console.log("Received request body:", req.body);
  const { id, name, artist_id, album, duration, audio_file_path, pic_path } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Song ID is required for updating!' });
  }

  let updates = [];
  let values = [];

  if (name) {
    updates.push('name = ?');
    values.push(name);
  }
  if (artist_id) {
    updates.push('artist_id = ?');
    values.push(artist_id);
  }
  if (album) {
    updates.push('album = ?');
    values.push(album);
  }
  if (duration) {
    updates.push('duration = ?');
    values.push(duration);
  }
  if (audio_file_path) {
    updates.push('audio_file_path = ?');
    values.push(audio_file_path);
  }
  if (pic_path) {
    updates.push('pic_path = ?');
    values.push(pic_path);
  }

  values.push(id);

  const updateSql = `UPDATE songs SET ${updates.join(', ')} WHERE id = ?`;

  db.query(updateSql, values, (err, result) => {
    if (err) {
      console.error("Error updating song:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Song not found!" });
    }

    res.status(200).json({ message: "Song updated successfully!" });
  })
})


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


