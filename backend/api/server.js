require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'USC FoodChain API is running!',
    timestamp: new Date().toISOString()
  });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ 
      success: true, 
      message: 'Database connected!',
      time: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message,
      details: err.toString()
    });
  }
});

// Get all vendors
app.get('/api/vendors', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM vendors ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get menu items for a specific vendor
app.get('/api/vendors/:id/menu', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT * FROM menu_items WHERE vendor_id = $1 AND stock_status != $2',
      [id, 'sold_out']
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all available menu items across all vendors
app.get('/api/menu', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT m.*, v.name as vendor_name, v.location 
      FROM menu_items m 
      JOIN vendors v ON m.vendor_id = v.id 
      WHERE m.stock_status = 'available'
      ORDER BY v.name, m.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 USC FoodChain API running on http://localhost:${PORT}`);
});