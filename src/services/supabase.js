import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://rstfwcbxnqqqceroxneb.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdGZ3Y2J4bnFxcWNlcm94bmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NTcwOTEsImV4cCI6MjAxNDMzMzA5MX0.DDFxQZcfLAjtH_6jg4bFjmv_LN30k-yVwl3jRENId4Q'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
