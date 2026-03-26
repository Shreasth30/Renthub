import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, signInAsOwner, signInAsTenant } = useAuth();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-login-modal", handleOpen);

    if (!isLoading && !user) {
      const hasSeen = sessionStorage.getItem("hasSeenLoginModal");
      if (!hasSeen) {
        const delay = Math.floor(Math.random() * (20000 - 15000 + 1) + 15000);
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, delay);
        return () => clearTimeout(timer);
      }
    }

    if (user && isOpen) {
      setIsOpen(false);
      sessionStorage.setItem("hasSeenLoginModal", "true");
    }

    return () => window.removeEventListener("open-login-modal", handleOpen);
  }, [user, isLoading, isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenLoginModal", "true");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center sm:items-end sm:pb-12 px-4 backdrop-blur-xl bg-black/50"
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative bg-[#0D0D0D] border border-white/10 w-full max-w-md p-8 flex flex-col items-center max-h-[90vh] overflow-y-auto"
        >
          <div className="absolute -inset-px bg-gradient-to-b from-[#C9A84C]/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center w-full">
            <img 
              src="/rent_hub_img.jpg" 
              alt="The RentHub Company" 
              className="h-[52px] w-auto object-contain mb-8 drop-shadow-[0_0_20px_rgba(201,168,76,0.15)]"
            />

            <h2 className="font-heading text-3xl font-bold text-white text-center mb-2">
              Welcome to RentHub
            </h2>
            <p className="text-[#9A9A9A] text-center mb-8">
              Choose your role to continue with a sample profile.
            </p>

            <div className="grid grid-cols-1 gap-4 w-full mb-6">
              <Button 
                onClick={signInAsOwner}
                className="w-full bg-white text-[#080808] hover:bg-[#E5E5E5] font-bold tracking-[0.05em] h-12 rounded-none btn-shimmer overflow-hidden"
              >
                LOGIN AS HOUSE OWNER
              </Button>
              <Button 
                onClick={signInAsTenant}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5 font-bold tracking-[0.05em] h-12 rounded-none"
              >
                LOGIN AS TENANT
              </Button>
            </div>

            <button 
              onClick={handleDismiss} 
              className="text-[#5A5A5A] text-sm hover:text-white transition-colors duration-300"
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
