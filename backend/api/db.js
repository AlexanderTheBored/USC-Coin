const { Pool } = require('pg');

// DEBUG: Log environment variables
console.log('🔍 Debugging environment variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};