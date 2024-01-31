import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://imtnsyggmsxxpdkjarce.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdG5zeWdnbXN4eHBka2phcmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2NzQ0NTEsImV4cCI6MjAxMDI1MDQ1MX0.z5OkbOhjxiEZ1rCbIPxm-PCdNMZ_yzx02OPYN6-zUnA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
