import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zfbmjhmmfxchockcwlkd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmYm1qaG1tZnhjaG9ja2N3bGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzNDA3OTUsImV4cCI6MjAzNDkxNjc5NX0.BnKl85c6B7x9aadD0h34OxG-E_sFn_sfYvM5RwlAbUA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})