import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { User, MapPin, Calendar, CheckCircle2, Building, Eye, MessageSquare, Heart } from "lucide-react";

export default function Profile() {
  const { profile, user } = useAuth();

  if (!user || !profile) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-heading text-4xl font-bold mb-4">Access Denied</h2>
        <p className="text-[#9A9A9A] mb-8 max-w-md">Please login to view your profile and manage your account.</p>
        <Button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
          className="bg-white text-black hover:bg-[#E5E5E5] rounded-none px-8 py-6 font-bold uppercase tracking-widest"
        >
          Login Now
        </Button>
      </div>
    );
  }

  const isOwner = profile.role === "owner";

  return (
    <div className="bg-[#080808] min-h-screen pb-20">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/10 to-[#080808]" />
        <div className="absolute inset-0 hero-grid opacity-30" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Info Card */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0D0D0D] border border-white/[0.08] p-8"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full border-2 border-white/10 p-1">
                    <img 
                      src={profile.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"} 
                      alt="Avatar" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {profile.is_verified && (
                    <div className="absolute bottom-1 right-1 bg-white text-black rounded-full p-1 border-2 border-[#0D0D0D]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <h2 className="font-heading text-2xl font-bold text-white mb-1">{profile.full_name}</h2>
                <div className="flex items-center gap-2 text-[#5A5A5A] text-[10px] uppercase tracking-widest font-bold mb-6">
                  <span className="px-2 py-0.5 border border-[#5A5A5A] leading-relaxed">{profile.role}</span>
                  {profile.is_verified && <span className="text-[#C9A84C]">Verified ✓</span>}
                </div>

                <div className="w-full space-y-4 text-left border-t border-white/[0.06] pt-6 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#9A9A9A]">
                    <User className="w-4 h-4 text-[#5A5A5A]" />
                    <span>Member since 2023</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#9A9A9A]">
                    <MapPin className="w-4 h-4 text-[#5A5A5A]" />
                    <span>Mumbai, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#9A9A9A]">
                    <Calendar className="w-4 h-4 text-[#5A5A5A]" />
                    <span>Last active 2 hours ago</span>
                  </div>
                </div>

                <Button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-none uppercase text-[11px] font-bold tracking-widest h-12">
                  Edit Profile
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: isOwner ? "Properties" : "Saved", value: isOwner ? "3" : "12", icon: Building },
                { label: "Views", value: "1.2K", icon: Eye },
                { label: "Inquiries", value: "24", icon: MessageSquare },
                { label: "Favorites", value: "48", icon: Heart },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0D0D0D] border border-white/[0.08] p-6 flex flex-col items-center justify-center text-center">
                  <stat.icon className="w-5 h-5 text-[#5A5A5A] mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold text-[#5A5A5A]">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0D0D0D] border border-white/[0.08] p-8"
            >
              <h3 className="font-heading text-xl font-bold text-white mb-6 uppercase tracking-wider">About Me</h3>
              <p className="text-[#9A9A9A] leading-relaxed">
                {isOwner 
                  ? "Real estate enthusiast and premium property owner in Mumbai and Hyderabad. I focus on providing quality living spaces for long-term tenants. My properties are curated for comfort and modern lifestyle."
                  : "Young professional looking for a quiet studio or 1BHK in Indiranagar. I value cleanliness, natural light, and proximity to the metro station."}
              </p>
            </motion.div>

            {/* Recent Activity / Listings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0D0D0D] border border-white/[0.08] p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
                  {isOwner ? "Active Listings" : "Recently Viewed"}
                </h3>
                <Button variant="link" className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] p-0">View All</Button>
              </div>

              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 p-4 border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.1] transition-colors group">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-${i === 1 ? '1502672260266-1c1ef2d93688' : '1522708323590-d24dbb6b0267'}?q=80&w=400&auto=format&fit=crop`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt="Property" 
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="text-white font-bold text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">
                        {i === 1 ? "Luxury 3BHK with Sea View" : "Modern Studio near Metro"}
                      </h4>
                      <p className="text-[#5A5A5A] text-xs mb-3 font-sans">{i === 1 ? "Bandra West, Mumbai" : "Indiranagar, Bengaluru"}</p>
                      <div className="text-white font-bold text-sm">₹{i === 1 ? "85,000" : "25,000"}<span className="text-[#5A5A5A] text-[10px] uppercase font-normal ml-1">/ month</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
