import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ezovpyfhvngpkclismdm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6b3ZweWZodm5ncGtjbGlzbWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NjEwMzcsImV4cCI6MjA2NzAzNzAzN30.U2tSIhPzalTl1GD1zYbWtuNiR8G8OFd-IgZhHwRGeFw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 