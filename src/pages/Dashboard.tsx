import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const { profile, user } = useAuth();
  
  if (!user || profile?.role !== "owner") {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-heading text-4xl font-bold mb-4">Owner Access Only</h2>
        <p className="text-[#9A9A9A] mb-8 max-w-md">This dashboard is reserved for house owners. Please login as an owner to manage your listings.</p>
        <Button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
          className="bg-white text-black hover:bg-[#E5E5E5] rounded-none px-8 py-6 font-bold uppercase tracking-widest"
        >
          Login as Owner
        </Button>
      </div>
    );
  }

  // Filter properties owned by this user (mock-1 is the default owner)
  const myProperties = MOCK_PROPERTIES.filter(p => p.owner_id === user.id);

  return (
    <div className="bg-[#080808] min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Owner Dashboard</h1>
            <p className="text-[#9A9A9A] max-w-xl">Manage your property listings, track views, and handle inquiries from potential tenants.</p>
          </div>
          <Link to="/list-property">
            <Button className="bg-white text-black hover:bg-[#E5E5E5] rounded-none h-14 px-8 font-bold uppercase tracking-widest flex items-center gap-2">
              <Plus className="w-5 h-5" />
              List New Property
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <PropertyCard property={property} />
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 rounded-none uppercase text-[10px] font-bold tracking-widest py-4">
                  Edit
                </Button>
                <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 rounded-none uppercase text-[10px] font-bold tracking-widest py-4">
                  Boost
                </Button>
              </div>
            </motion.div>
          ))}

          {myProperties.length === 0 && (
            <div className="col-span-full py-32 border border-dashed border-white/10 rounded-none text-center">
              <p className="text-[#5A5A5A] uppercase tracking-[0.2em] font-bold mb-6">No properties listed yet</p>
              <Link to="/list-property">
                <Button variant="link" className="text-[#C9A84C] font-bold uppercase tracking-widest">Create your first listing</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
