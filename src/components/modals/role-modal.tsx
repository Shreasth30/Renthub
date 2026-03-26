import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { Home, User as UserIcon } from "lucide-react";

export function RoleModal() {
  const { user, profile, isLoading, refreshProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // If user is logged in but has no role yet, show the modal
    if (!isLoading && user && profile && !profile.role) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [user, profile, isLoading]);

  const selectRole = async (role: "owner" | "tenant" | "both") => {
    if (!user) return;
    setIsUpdating(true);
    try {
      // Mock update: save to local storage
      const profiles = JSON.parse(localStorage.getItem("renthub_profiles") || "{}");
      profiles[user.id] = { ...profile, role };
      localStorage.setItem("renthub_profiles", JSON.stringify(profiles));
      
      await refreshProfile();
      setIsOpen(false);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md bg-black/60">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-[#0D0D0D] border border-white w-full max-w-2xl p-8 md:p-12 flex flex-col items-center max-h-[90vh] overflow-y-auto"
        >
          <img 
            src="/rent_hub_img.jpg" 
            alt="The RentHub Company" 
            className="h-[52px] w-auto object-contain mb-8"
          />

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-10">
            How are you using RentHub?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
            <button
              disabled={isUpdating}
              onClick={() => selectRole("owner")}
              className="bg-white group overflow-hidden relative border border-white hover:border-[#E5E5E5] text-[#080808] flex flex-col items-center justify-center p-8 transition-all hover:scale-[1.02]"
            >
              <Home className="w-12 h-12 mb-4" />
              <span className="font-bold tracking-[0.1em] text-lg uppercase">I&apos;m An Owner</span>
              <p className="mt-2 text-sm text-[#5A5A5A] text-center px-4">List your premium properties and find verified tenants.</p>
            </button>

            <button
              disabled={isUpdating}
              onClick={() => selectRole("tenant")}
              className="bg-[#080808] group overflow-hidden relative border border-white text-white flex flex-col items-center justify-center p-8 transition-all hover:scale-[1.02] hover:bg-[#111111]"
            >
              <UserIcon className="w-12 h-12 mb-4" />
              <span className="font-bold tracking-[0.1em] text-lg uppercase">I&apos;m A Tenant</span>
              <p className="mt-2 text-sm text-[#9A9A9A] text-center px-4">Browse and request visits to exclusive verified homes.</p>
            </button>
          </div>

          <button 
            disabled={isUpdating}
            onClick={() => selectRole("both")}
            className="text-[#9A9A9A] text-sm hover:text-white transition-colors underline underline-offset-4"
          >
            I&apos;m both an owner and a tenant
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
