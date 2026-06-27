import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gvtuelvrespnftqgptit.supabase.co";
const supabaseKey = "sb_publishable_eWIiG5EgQ3gqiE7LSo6epw_m4IQCMAc";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);