import { useEffect, useState } from "react";
import { Property } from "@/types";
import { PropertyCard } from "@/components/property-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MOCK_PROPERTIES } from "@/lib/mock-data";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState([65000]);
  const [bhk, setBhk] = useState<string[]>([]);
  const [furnishing, setFurnishing] = useState<string[]>([]);

  useEffect(() => {
    // Simulated fetch from mock data
    const fetchProperties = async () => {
      setLoading(true);
      // Wait a bit to simulate network
      await new Promise(resolve => setTimeout(resolve, 500));
      setProperties(MOCK_PROPERTIES);
      setFiltered(MOCK_PROPERTIES);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let result = properties;

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p => p.city.toLowerCase().includes(s) || p.address.toLowerCase().includes(s));
    }

    result = result.filter(p => p.rent <= budget[0]);

    if (bhk.length > 0) {
      result = result.filter(p => bhk.includes(p.bhk_type));
    }

    if (furnishing.length > 0) {
      result = result.filter(p => furnishing.includes(p.property_type));
    }

    setFiltered(result);
  }, [search, budget, bhk, furnishing, properties]);

  const toggleFilter = (setFn: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setFn(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const FilterChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`px-4 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 ${
        active 
          ? "bg-white text-black border-white shadow-[0_0_16px_rgba(255,255,255,0.15)]" 
          : "bg-white/[0.03] text-[#9A9A9A] border-white/[0.08] hover:border-white/20 hover:text-white/70"
      } border`}
    >
      {label}
    </motion.button>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center -mt-16 pt-16 bg-[#080808] overflow-hidden">
        {/* Floating Grid Background */}
        <div className="absolute inset-0 hero-grid opacity-100" />
        
        {/* Radial gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center z-10 w-full mb-12 mt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-2"
          >
            <span className="gradient-text block">Find Your Space.</span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#D4D4D4] block mt-2"
            >
              Own Your Choice.
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#9A9A9A] text-lg md:text-xl mt-8 mb-12 max-w-2xl mx-auto"
          >
            Verified listings. Real owners. Zero spam.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full items-center max-w-3xl mx-auto border border-white/[0.08] bg-[#0A0A0A] glow-focus transition-all duration-300 hover:border-white/[0.12]"
          >
            <Input 
              type="text" 
              placeholder="Search by city, area, or landmark..." 
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="bg-transparent border-0 h-14 rounded-none text-white focus-visible:ring-0 px-6 text-base w-full placeholder:text-white/20"
            />
            <Button className="h-14 px-8 rounded-none bg-white text-black font-bold tracking-[0.1em] uppercase hover:bg-[#E5E5E5] transition-all btn-shimmer overflow-hidden">
              Search
            </Button>
          </motion.div>

          {/* Stats section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-8 mt-10 text-[#5A5A5A]"
          >
            {[
              { value: "500+", label: "Listings" },
              { value: "50+", label: "Cities" },
              { value: "10K+", label: "Users" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-white/80 font-bold text-lg">{stat.value}</div>
                <div className="text-[11px] uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-10" />
      </section>

      <div className="gradient-divider"></div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 glass border-b border-white/[0.06] py-4 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="container mx-auto px-4 lg:px-8 flex flex-wrap items-center gap-6"
        >
          <div className="flex items-center gap-4 w-full md:w-auto min-w-[200px]">
            <span className="text-[#9A9A9A] text-[11px] font-bold tracking-widest uppercase whitespace-nowrap">Max Rent (₹{budget[0].toLocaleString()})</span>
            <input 
              type="range"
              min={5000} 
              max={150000} 
              step={5000} 
              value={budget[0]} 
              onChange={(e) => setBudget([Number(e.target.value)])}
              className="w-full"
            />
          </div>

          <div className="h-6 w-px bg-white/[0.08] hidden md:block"></div>

          <div className="flex gap-2 flex-wrap">
            <FilterChip label="1BHK" active={bhk.includes("1BHK")} onClick={() => toggleFilter(setBhk, "1BHK")} />
            <FilterChip label="2BHK" active={bhk.includes("2BHK")} onClick={() => toggleFilter(setBhk, "2BHK")} />
            <FilterChip label="3BHK" active={bhk.includes("3BHK")} onClick={() => toggleFilter(setBhk, "3BHK")} />
            <FilterChip label="STUDIO" active={bhk.includes("Studio")} onClick={() => toggleFilter(setBhk, "Studio")} />
          </div>

          <div className="h-6 w-px bg-white/[0.08] hidden lg:block"></div>

          <div className="flex gap-2 flex-wrap">
            <FilterChip label="RAW" active={furnishing.includes("raw")} onClick={() => toggleFilter(setFurnishing, "raw")} />
            <FilterChip label="SEMI" active={furnishing.includes("semi_furnished")} onClick={() => toggleFilter(setFurnishing, "semi_furnished")} />
            <FilterChip label="FULLY" active={furnishing.includes("fully_furnished")} onClick={() => toggleFilter(setFurnishing, "fully_furnished")} />
          </div>
        </motion.div>
      </div>

      {/* Property Listings */}
      <section className="py-20 bg-[#080808] relative">
        {/* Subtle radial gradient behind listings */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.03)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-[1]">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <h2 className="text-white text-xl font-bold tracking-[0.2em] uppercase">All Listings</h2>
            <span className="text-[#5A5A5A] text-sm font-sans">({filtered.length})</span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-[#111111] border border-white/[0.06] h-[400px]">
                  <div className="aspect-[16/10] bg-white/[0.03] shimmer-sweep"></div>
                  <div className="p-5 space-y-4">
                    <div className="h-4 bg-white/[0.04] w-1/4 rounded"></div>
                    <div className="h-6 bg-white/[0.04] w-3/4 rounded"></div>
                    <div className="h-8 bg-white/[0.04] w-1/3 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((property) => (
                <motion.div
                  key={property.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                    }
                  }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 border border-white/[0.08] bg-white/[0.01]"
            >
              <p className="text-[#9A9A9A] text-lg mb-6">No properties found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest font-bold transition-all duration-300 btn-shimmer overflow-hidden"
                onClick={() => {
                  setSearch("");
                  setBudget([150000]);
                  setBhk([]);
                  setFurnishing([]);
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
