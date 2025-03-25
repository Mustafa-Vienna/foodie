import { useState, useEffect } from "react";
import { fetchProfile } from "./ProfileApi";

const UseProfileData = (id) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const getProfile = async () => {
      try {
        const data = await fetchProfile(id);
        if (isMounted) {
          setProfile(data);
        }
      } catch (err) {
        if (err.response?.status === 404) {}
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    getProfile();
    
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { profile, loading, setProfile };
};

export default UseProfileData;