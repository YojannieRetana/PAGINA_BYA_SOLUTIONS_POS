import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl =
'https://pgukayzswatybgydxrhx.supabase.co'

const supabaseKey =
'sb_publishable_wUyRtg5KFuBQKLS67XjcEA_RfgXobPN'

export const supabase =
createClient(
  supabaseUrl,
  supabaseKey
)