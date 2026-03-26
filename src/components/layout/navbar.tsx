import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { user, profile, isLoading, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const NavLink = ({ href, label, id }: { href: string; label: string; id: string }) => (
    <Link
      to={href}
      className="relative text-[13px] font-bold tracking-[0.1em] text-white/80 hover:text-white uppercase transition-colors py-1"
      onMouseEnter={() => setHoveredLink(id)}
      onMouseLeave={() => setHoveredLink(null)}
    >
      {label}
      {hoveredLink === id && (
        <motion.div
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass border-b border-white/[0.06] z-50 flex items-center">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-full">
        <Link to="/" className="group" data-cursor-hover>
          <img 
            src="/rent_hub_img.jpg" 
            alt="The RentHub Company Logo" 
            className="h-10 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_10px_rgba(201,168,76,0.2)]"
          />
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <NavLink href="/" label="Browse" id="browse" />
          </div>
          {!isLoading && (
            <>
              {!user ? (
                <Button 
                  variant="ghost" 
                  className="text-[13px] font-bold tracking-[0.1em] text-white/80 hover:text-white hover:bg-transparent uppercase p-0 transition-all" 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
                >
                  Login 
                  <motion.span 
                    className="inline-block ml-1"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </Button>
              ) : (
                <div className="flex items-center gap-6 relative">
                  {(profile?.role === "tenant" || profile?.role === "both" || !profile?.role) && (
                    <div className="hidden sm:block">
                      <NavLink href="/saved" label="Saved" id="saved" />
                    </div>
                  )}
                  {(profile?.role === "owner" || profile?.role === "both" || !profile?.role) && (
                    <>
                      <div className="hidden md:block">
                        <NavLink href="/dashboard" label="Dashboard" id="dashboard" />
                      </div>
                      <Link to="/list-property">
                        <Button className="relative bg-white text-black hover:bg-[#E5E5E5] hover:scale-105 transition-all text-[13px] font-bold tracking-[0.1em] uppercase rounded-none md:flex h-9 hidden px-6 btn-shimmer overflow-hidden">
                          + List Property
                        </Button>
                      </Link>
                    </>
                  )}
                  
                  {/* Custom Dropdown */}
                  <div className="relative">
                    <motion.button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-9 w-9 border border-white/10 bg-white/5 overflow-hidden rounded-full flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/50 transition-colors hover:border-white/20"
                    >
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-9 h-9 object-cover" />
                      ) : (
                        <UserCircle className="w-6 h-6 text-white/80" />
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setIsDropdownOpen(false)}
                          ></div>
                          <motion.div 
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-0 mt-2 glass border border-white/[0.08] text-white w-48 font-sans z-50 shadow-2xl flex flex-col overflow-hidden"
                          >
                            <Link 
                              to="/profile" 
                              className="px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              Profile
                            </Link>
                            <div className="h-px bg-white/[0.06] mx-3" />
                            <button 
                              onClick={() => {
                                signOut();
                                setIsDropdownOpen(false);
                              }}
                              className="px-4 py-3 text-left text-[#EF4444] hover:bg-white/5 transition-colors text-sm"
                            >
                              Sign Out
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
