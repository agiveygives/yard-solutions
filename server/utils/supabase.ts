// server/utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!

export const serverSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseSecretKey)
}

export const buildStorageUrl = (bucket: string, directory: string, name: string) => (
  `${process.env.SUPABASE_STORAGE_BASE_URL}/${bucket}/${directory}/${name}`
)
