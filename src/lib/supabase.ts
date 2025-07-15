import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yeexhhiohytynvjfymkx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZXhoaGlvaHl0eW52amZ5bWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjQ3NDEsImV4cCI6MjA2ODEwMDc0MX0.yghswdIpcC41lr-_EFrGZkFdEORTYkPdIcwTymLTuGM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 