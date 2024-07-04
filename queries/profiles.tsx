import { supabase } from '@/lib/supabase';

export const getProfilesQuery = supabase
    .from("profiles")
    .select('*');

export const getProfileQuery = (uid: string | any) => supabase
    .from("profiles")
    .select('*')
    .eq('authId', uid)

export const setAsAdminQuery = (uid: string | any, isAdmin: boolean) => supabase
    .from('profiles')
    .update({ isAdmin: !isAdmin })
    .eq('id', uid)
    .select()
