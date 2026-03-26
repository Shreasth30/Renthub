import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-[#080808] relative">
      {/* Gradient divider */}
      <div className="gradient-divider" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-14"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/rent_hub_img.jpg" 
                alt="The RentHub Company Logo" 
                className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
            <div className="text-[#5A5A5A] text-sm text-center md:text-left">
              © 2026 The RentHub Company. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-[13px] font-bold tracking-[0.1em] text-[#5A5A5A] uppercase">
              {[
                { to: "/", label: "Browse" },
                { to: "/list-property", label: "List Property" },
                { to: "#", label: "Contact" },
              ].map((link) => (
                <Link 
                  key={link.label}
                  to={link.to} 
                  className="hover:text-white hover:tracking-[0.15em] transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
