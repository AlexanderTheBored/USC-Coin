const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = {
  query: async (text, params) => {
    // Convert PostgreSQL query to Supabase format
    const { data, error } = await supabase.rpc('exec_sql', { 
      query: text, 
      params: params || [] 
    });
    
    if (error) throw error;
    return { rows: data };
  }
};