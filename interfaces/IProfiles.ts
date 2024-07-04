import { QueryData } from '@supabase/supabase-js';
import { getProfileQuery, getProfilesQuery } from '@/queries/profiles';

type Profile = QueryData<typeof getProfileQuery>;
type Profiles = QueryData<typeof getProfilesQuery>;

export {
    Profile,
    Profiles
}