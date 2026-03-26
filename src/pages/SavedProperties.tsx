import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import { PropertyCard } from "@/components/property-card";

export default function SavedProperties() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-heading text-4xl font-bold mb-4">Your Saved Spaces</h2>
        <p className="text-[#9A9A9A] mb-8 max-w-md">Login to view the properties you&apos;ve saved for later. Keep track of your favorites in one place.</p>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
          className="bg-white text-black hover:bg-[#E5E5E5] rounded-none px-8 py-4 font-bold uppercase tracking-widest"
        >
          Login to View
        </button>
      </div>
    );
  }

  // Mocking saved properties (just picking a couple from the mock data)
  const savedProperties = [MOCK_PROPERTIES[0], MOCK_PROPERTIES[1]];

  return (
    <div className="bg-[#080808] min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 border-l-2 border-[#C9A84C] pl-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Saved Collection</h1>
          <p className="text-[#9A9A9A] max-w-xl">A curated list of spaces that caught your eye. Ready to take the next step?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        {savedProperties.length === 0 && (
          <div className="py-20 text-center border border-white/10 bg-white/5">
            <p className="text-[#5A5A5A] uppercase tracking-[0.2em] font-bold">No saved properties yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
