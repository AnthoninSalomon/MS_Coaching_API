/*import dotenv from "dotenv";

dotenv.config(); 
*/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());

// Route pour créer un utilisateur
app.post("/create-user", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO \"User\" (\"FirstName\", \"LastName\", \"Email\", \"Password\") VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de l’utilisateur"+err });
  }
});

//Test
app.get("/", function (req, res) {
  res.send("API MS Coaching");
});

app.listen(port, function () {
  console.log(`Express app listening on port ${port}!`);
});
