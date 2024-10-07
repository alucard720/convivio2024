const express = require("express");
const mysql = require("mysql2/promise");  // Use promise-based API for mysql2
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Database configuration using connection pool
const dbConfig = mysql.createPool({
    host: '127.0.0.1',  // Use 'host' instead of 'server'
    user: 'root',
    password: 'maxelltod',
    port: 3306,
    database: 'db_convivio'
});

// Test database connection
dbConfig.getConnection((err) => {
    if (err) throw err;
    console.log('Connected to MariaDB database');
});

//Para buscar en Padron por Cedula
app.get('/api/padron', async (req, res) => {
    const { cedula } = req.query;

    if (!cedula) {
        return res.status(400).send('Cedula is required');
    }

    try {
        const [rows] = await dbConfig.query('SELECT * FROM padron WHERE cedula = ?', [cedula]);

        if (rows.length > 0) {
          res.json(rows);
        } else {
          res.status(404).json({ message: 'Record not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database query failed', details: error.message });
      }

});

//para salvar la data el formulario de registro convivio

app.post('/api/saveData', async (req, res) => {
    const { cedula, searchResult, inputField } = req.body;

    const connection = await dbConfig.getConnection();

    try {
      // Start transaction
      await connection.beginTransaction();

      // Insert into the main table
      const mainInsertQuery = `
        INSERT INTO main_data_table (cedula, search_result, input_field)
        VALUES (?, ?, ?)
      `;
      await connection.execute(mainInsertQuery, [
        cedula,
        JSON.stringify(searchResult),
        JSON.stringify(inputField)
      ]);

      // Insert into the backup table
      const backupInsertQuery = `
        INSERT INTO backup_data_table (cedula, search_result, input_field)
        VALUES (?, ?, ?)
      `;
      await connection.execute(backupInsertQuery, [
        cedula,
        JSON.stringify(searchResult),
        JSON.stringify(inputField)
      ]);

      // Commit transaction
      await connection.commit();

      res.status(200).json({ message: 'Data saved and backed up successfully!' });

    } catch (error) {
      // Rollback transaction in case of error
      await connection.rollback();
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Failed to save data.' });

    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
