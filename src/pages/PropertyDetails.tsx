import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Property } from "@/types";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize2, Share2, Heart, ShieldCheck, Calendar, Info } from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch
    const fetchProperty = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const p = MOCK_PROPERTIES.find(item => item.id === id);
      setProperty(p || null);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#080808] pt-20 flex justify-center text-white">Loading...</div>;
  if (!property) return <div className="min-h-screen bg-[#080808] pt-20 flex justify-center text-white">Property not found.</div>;

  return (
    <div className="bg-[#080808] min-h-screen pb-20">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#5A5A5A] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/40">{property.city}</span>
          <span>/</span>
          <span className="text-white">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Image Gallery Mock */}
            <div className="grid grid-cols-4 gap-4 h-[500px]">
              <div className="col-span-3 h-full overflow-hidden border border-white/10">
                <img src={property.photos[0]} alt="Main" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 grid grid-rows-3 gap-4 h-full">
                {[1, 2, 3].map(i => (
                  <div key={i} className="overflow-hidden border border-white/10">
                    <img src={property.photos[0]} alt="Thumbnail" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Title Block */}
            <div className="border-b border-white/[0.08] pb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="font-heading text-4xl font-bold text-white mb-3">{property.title}</h1>
                  <div className="flex items-center gap-2 text-[#9A9A9A]">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm font-sans">{property.address}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="h-10 w-10 p-0 border-white/10 rounded-none hover:bg-white/5"><Share2 className="w-4 h-4" /></Button>
                  <Button variant="outline" className="h-10 w-10 p-0 border-white/10 rounded-none hover:bg-white/5"><Heart className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 items-center pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10"><Bed className="w-4 h-4 text-[#C9A84C]" /></div>
                  <div>
                    <div className="text-white font-bold text-sm leading-tight">{property.bhk_type}</div>
                    <div className="text-[9px] uppercase tracking-widest text-[#5A5A5A] font-bold">Bedroom</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10"><Bath className="w-4 h-4 text-[#C9A84C]" /></div>
                  <div>
                    <div className="text-white font-bold text-sm leading-tight">2</div>
                    <div className="text-[9px] uppercase tracking-widest text-[#5A5A5A] font-bold">Bathroom</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10"><Maximize2 className="w-4 h-4 text-[#C9A84C]" /></div>
                  <div>
                    <div className="text-white font-bold text-sm leading-tight">1250 sqft</div>
                    <div className="text-[9px] uppercase tracking-widest text-[#5A5A5A] font-bold">Area</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">The Property</h3>
              <p className="text-[#9A9A9A] leading-relaxed max-w-2xl font-sans">
                Experience luxury living in this beautifully maintained {property.bhk_type.toLowerCase()} apartment. 
                Located in the heart of {property.city}, this {property.property_type.replace('_', '-')} unit 
                offers stunning views and modern amenities. Perfect for {property.preferred_tenant === 'any' ? 'anyone' : property.preferred_tenant.replace('_', ' ')}s 
                looking for a premium lifestyle choice.
              </p>
            </div>

            {/* Features/Amenities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">Details</h3>
                <div className="space-y-4">
                  {[
                    { label: "Floor", value: `${property.floor_number} of ${property.total_floors}` },
                    { label: "Furnishing", value: property.property_type.replace('_', ' ') },
                    { label: "Parking", value: property.parking.replace('_', ' ') },
                    { label: "Pets", value: property.pet_friendly ? "Allowed" : "Not Allowed" },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between border-b border-white/[0.04] pb-2 text-sm font-sans">
                      <span className="text-[#5A5A5A]">{item.label}</span>
                      <span className="text-white font-medium uppercase tracking-widest text-[11px]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">Policies</h3>
                <div className="space-y-4">
                  {[
                    { label: "Occupancy", value: property.occupancy_type },
                    { label: "Preferred", value: property.preferred_tenant.replace('_', ' ') },
                    { label: "Available", value: new Date(property.available_from).toLocaleDateString() },
                    { label: "Lease", value: "11 Months" },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between border-b border-white/[0.04] pb-2 text-sm font-sans">
                      <span className="text-[#5A5A5A]">{item.label}</span>
                      <span className="text-white font-medium uppercase tracking-widest text-[11px]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar: Booking/Pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0D0D0D] border border-white/[0.08] p-8"
              >
                <div className="mb-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5A5A5A] mb-2">Monthly Rent</div>
                  <div className="flex items-end gap-2 text-white">
                    <span className="text-4xl font-bold">₹{property.rent.toLocaleString()}</span>
                    <span className="text-[#5A5A5A] text-xs font-bold uppercase tracking-widest mb-1.5">/ Month</span>
                  </div>
                  {property.is_negotiable && <div className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mt-2">Negotiable ✓</div>}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm py-2 border-b border-white/5">
                    <span className="text-[#9A9A9A]">Security Deposit</span>
                    <span className="text-white font-bold">₹{property.deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-white/5">
                    <span className="text-[#9A9A9A]">Maintenance</span>
                    <span className="text-white font-bold">Included</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-white/5">
                    <span className="text-[#9A9A9A]">Brokerage</span>
                    <span className="text-white font-bold">₹0</span>
                  </div>
                </div>

                <Button className="w-full bg-white text-black hover:bg-[#E5E5E5] h-14 rounded-none font-bold uppercase tracking-widest btn-shimmer overflow-hidden">
                  Contact Owner
                </Button>
                <p className="text-[9px] text-[#5A5A5A] text-center mt-4 uppercase tracking-widest font-bold">Get direct owner details instantly</p>
              </motion.div>

              {/* Safety/Trust Card */}
              <div className="bg-white/5 border border-white/10 p-6 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-[#C9A84C] flex-shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Direct Owner Verified</h4>
                  <p className="text-[10px] text-[#9A9A9A] leading-relaxed font-sans">This listing has been verified with authentic documents and direct contact verification.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
