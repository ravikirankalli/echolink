import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bthbznyiqqputxufdvoq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0aGJ6bnlpcXFwdXR4dWZkdm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MDUwMjEsImV4cCI6MjA4MTE4MTAyMX0.qKCm3Z6JsPr_SDe0czvWIca7vdwlnDSHmW2013aXipA";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
