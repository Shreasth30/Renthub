/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Profile } from "@/types";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";

interface AuthContextProps {
  user: any;
  profile: Profile | null;
  session: any;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  signInAsOwner: () => void;
  signInAsTenant: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  refreshProfile: async () => {},
  signOut: async () => {},
  signInAsOwner: () => {},
  signInAsTenant: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    // In mock mode, we just keep the current profile
  }, []);

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("renthub_user");
  };

  const signInAsOwner = () => {
    const mockUser = { id: MOCK_USER_PROFILE.id, email: MOCK_USER_PROFILE.email };
    setUser(mockUser);
    setProfile(MOCK_USER_PROFILE as Profile);
    localStorage.setItem("renthub_user", JSON.stringify({ user: mockUser, profile: MOCK_USER_PROFILE }));
  };

  const signInAsTenant = () => {
    const tenantProfile = {
      id: "tenant-1",
      full_name: "John Doe",
      email: "john@example.com",
      role: "tenant",
      avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop",
    };
    const mockUser = { id: tenantProfile.id, email: tenantProfile.email };
    setUser(mockUser);
    setProfile(tenantProfile as Profile);
    localStorage.setItem("renthub_user", JSON.stringify({ user: mockUser, profile: tenantProfile }));
  };

  useEffect(() => {
    const saved = localStorage.getItem("renthub_user");
    if (saved) {
      const { user, profile } = JSON.parse(saved);
      setUser(user);
      setProfile(profile);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session: user ? { user } : null,
        isLoading,
        refreshProfile,
        signOut,
        signInAsOwner,
        signInAsTenant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
