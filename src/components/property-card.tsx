import { Link } from "react-router-dom";
import { Property } from "@/types";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useEffect, useState } from "react";

export function PropertyCard({ property }: { property: Property }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);

  useEffect(() => {
    // Check local storage for saved state
    const saved = JSON.parse(localStorage.getItem("renthub_saved") || "[]");
    if (saved.includes(property.id)) {
      setIsSaved(true);
    }
  }, [property.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      window.dispatchEvent(new CustomEvent('open-login-modal'));
      return;
    }
    
    // Trigger heart animation
    setHeartAnimating(true);
    setTimeout(() => setHeartAnimating(false), 400);
    
    const saved = JSON.parse(localStorage.getItem("renthub_saved") || "[]");
    if (isSaved) {
      const newSaved = saved.filter((id: string) => id !== property.id);
      localStorage.setItem("renthub_saved", JSON.stringify(newSaved));
      setIsSaved(false);
    } else {
      saved.push(property.id);
      localStorage.setItem("renthub_saved", JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  const daysAgo = Math.floor((new Date().getTime() - new Date(property.created_at).getTime()) / (1000 * 3600 * 24));
  const timeText = daysAgo === 0 ? "Listed today" : `Listed ${daysAgo} days ago`;

  return (
    <div 
      className={`group relative bg-[#111111]/80 backdrop-blur-md border border-[#2A2A2A] flex flex-col card-tilt ${
        property.is_boosted 
          ? "border-[#C9A84C]/40 hover:border-[#C9A84C]/80 shadow-[0_0_15px_rgba(201,168,76,0.1)] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]" 
          : "hover:border-[#6366f1]/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]"
      }`}
      data-cursor-hover
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{
          background: property.is_boosted 
            ? "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)"
        }} 
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1A1A]">
        {property.photos && property.photos.length > 0 && (
          <img 
            src={property.photos[0]} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {property.is_boosted && (
          <div className="absolute top-3 left-3 bg-white text-[#080808] text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase badge-shimmer">
            ★ Featured
          </div>
        )}
        <button 
          onClick={toggleSave}
          className="absolute top-3 right-3 p-2.5 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-200 pointer-events-auto group/heart rounded-full"
        >
          <Heart className={`w-5 h-5 transition-all duration-200 ${
            isSaved 
              ? "fill-white text-white" 
              : "text-white/80 group-hover/heart:text-white"
          } ${heartAnimating ? "heart-pulse" : ""}`} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow relative z-[1]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/90 bg-white/[0.06] border border-white/[0.06] px-2.5 py-1">
            {property.bhk_type}
          </span>
          <span className="text-[#9A9A9A] text-sm">{property.city}</span>
        </div>
        
        <h3 className="font-semibold text-white text-base line-clamp-1 mb-3 group-hover:text-white/95 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex gap-2 mb-4">
          <span className={`text-xs px-2.5 py-1 font-medium transition-colors duration-200 ${
            property.property_type === "fully_furnished" 
              ? "bg-white text-black" 
              : property.property_type === "semi_furnished" 
                ? "bg-white/10 text-white border border-white/10" 
                : "bg-white/[0.04] text-[#9A9A9A] border border-white/[0.06]"
          }`}>
            {property.property_type.replace("_", " ").toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-end gap-3 mb-4 mt-auto">
          <div className="bg-white px-3 py-1.5 inline-block group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow duration-300">
            <span className="text-black font-bold text-lg">₹{property.rent.toLocaleString()} <span className="text-sm font-normal">/ mo</span></span>
          </div>
          {property.is_negotiable && (
            <span className="text-[#C9A84C] text-[10px] font-bold tracking-widest uppercase mb-1 animate-pulse-glow">Negotiable</span>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-white/[0.06] mt-2">
          <span className="text-[#5A5A5A] text-xs">{timeText}</span>
          <span className="text-[#9A9A9A] text-xs">{property.occupancy_type.replace("_", " ")}</span>
        </div>
        
        <Link to={`/properties/${property.id}`} className="absolute inset-0 z-0">
          <span className="sr-only">View Details</span>
        </Link>
      </div>
      
      <div className="px-5 pb-5 pt-0 relative z-[1]">
        <Link 
          to={`/properties/${property.id}`} 
          className="slide-arrow text-white text-[11px] font-bold tracking-widest uppercase group-hover:tracking-[0.25em] transition-all duration-300 pointer-events-auto relative z-10"
        >
          View Details <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
