/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  bhk_type: z.enum(["1BHK", "2BHK", "3BHK", "Studio"]),
  floor_number: z.coerce.number().min(0, "Invalid floor"),
  total_floors: z.coerce.number().min(1, "Total floors required"),
  available_from: z.string().min(1, "Date required"),
  
  property_type: z.enum(["raw", "semi_furnished", "fully_furnished"]),
  furnishing_items: z.array(z.string()).optional(),
  occupancy_type: z.enum(["independent", "with_owner"]),
  preferred_tenant: z.enum(["family", "bachelor", "working_professional", "students", "any"]),
  parking: z.enum(["2_wheeler", "4_wheeler", "both", "none"]),
  pet_friendly: z.boolean(),

  rent: z.coerce.number().min(1000, "Rent must be at least 1000"),
  is_negotiable: z.boolean(),
  deposit: z.coerce.number().min(0, "Invalid deposit"),
  maintenance: z.coerce.number().optional().nullable(),
  nearby_landmarks: z.array(z.object({ name: z.string(), distance: z.string() })).optional(),

  photos: z.array(z.string().url()).min(1, "At least 1 photo URL required").max(5, "Max 5 photos"),
});

type FormData = z.infer<typeof schema>;

const FURNISHING_OPTIONS = ["AC", "TV", "Bed", "Wardrobe", "Fridge", "Sofa", "Washing Machine", "Microwave", "Dining Table"];
const TENANT_OPTIONS = ["family", "bachelor", "working_professional", "students", "any"];
const PARKING_OPTIONS = ["2_wheeler", "4_wheeler", "both", "none"];

export default function ListProperty() {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      bhk_type: "1BHK",
      property_type: "raw",
      occupancy_type: "independent",
      preferred_tenant: "any",
      parking: "none",
      pet_friendly: false,
      is_negotiable: false,
      furnishing_items: [],
      nearby_landmarks: [],
      photos: ["https://images.unsplash.com/photo-1554995207-c18c203602cb"], // Temporary default
    }
  });

  const propertyType = watch("property_type");
  const furnishingItems = watch("furnishing_items") || [];
  const landmarks = watch("nearby_landmarks") || [];
  const photos = watch("photos") || [];

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast({ title: "Authentication required", description: "Please log in to list a property.", variant: "destructive" });
        navigate("/");
        window.dispatchEvent(new CustomEvent('open-login-modal'));
      } else if (profile && profile.role === "tenant") {
        toast({ title: "Access Denied", description: "You must be an owner to list properties.", variant: "destructive" });
        navigate("/profile");
      }
    }
  }, [user, profile, isLoading, navigate, toast]);

  if (isLoading || !user || profile?.role === "tenant") return <div className="min-h-screen bg-[#080808]"></div>;

  const handleNext = async () => {
    if (step < 4) setStep(step + 1);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call and save to local storage
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newProperty = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        owner_id: user.id,
        is_active: true,
        is_boosted: false,
        views_count: 0,
        created_at: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem("renthub_properties") || "[]");
      localStorage.setItem("renthub_properties", JSON.stringify([...existing, newProperty]));
      
      toast({ title: "Success", description: "Your property has been listed (Mocked)." });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to list property.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="bg-[#080808] min-h-screen pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= 1 ? "text-white" : "text-[#5A5A5A]"}`}>Basic Info</span>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= 2 ? "text-white" : "text-[#5A5A5A]"}`}>Type & Furnishing</span>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= 3 ? "text-white" : "text-[#5A5A5A]"}`}>Pricing</span>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= 4 ? "text-white" : "text-[#5A5A5A]"}`}>Photos & Review</span>
          </div>
          <div className="h-0.5 w-full bg-[#1A1A1A] relative">
            <div className="absolute top-0 left-0 h-full bg-white transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* STEP 1: BASIC INFO */}
          <div className={step === 1 ? "block" : "hidden"}>
            <h2 className="font-heading text-3xl font-bold text-white mb-8">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Property Title</label>
                <Input {...register("title")} className="bg-[#111111] border-[#2A2A2A] rounded-none h-12 text-white focus-visible:border-white focus-visible:ring-0" placeholder="e.g. Luxury 3BHK in Bandra West" />
                {errors.title && <span className="text-[#EF4444] text-xs">{errors.title.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">City</label>
                <select {...register("city")} className="w-full bg-[#111111] border border-[#2A2A2A] rounded-none h-12 text-white px-3 focus:outline-none focus:border-white appearance-none">
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
                {errors.city && <span className="text-[#EF4444] text-xs">{errors.city.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">BHK Type</label>
                <div className="flex gap-2">
                  {["1BHK", "2BHK", "3BHK", "Studio"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setValue("bhk_type", type as any)}
                      className={`flex-1 h-12 border ${watch("bhk_type") === type ? "bg-white text-black border-white" : "bg-[#111111] text-[#9A9A9A] border-[#2A2A2A]"} text-sm font-bold tracking-widest uppercase transition-colors`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Full Address</label>
                <Input {...register("address")} className="bg-[#111111] border-[#2A2A2A] rounded-none h-12 text-white focus-visible:border-white focus-visible:ring-0" />
                {errors.address && <span className="text-[#EF4444] text-xs">{errors.address.message}</span>}
              </div>

              <div className="flex gap-4 col-span-1">
                <div className="space-y-2 flex-1">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Floor</label>
                  <Input type="number" {...register("floor_number")} className="bg-[#111111] border-[#2A2A2A] rounded-none h-12 text-white focus-visible:border-white focus-visible:ring-0" />
                  {errors.floor_number && <span className="text-[#EF4444] text-xs">{errors.floor_number.message}</span>}
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Total Floors</label>
                  <Input type="number" {...register("total_floors")} className="bg-[#111111] border-[#2A2A2A] rounded-none h-12 text-white focus-visible:border-white focus-visible:ring-0" />
                  {errors.total_floors && <span className="text-[#EF4444] text-xs">{errors.total_floors.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Available From</label>
                <Input type="date" {...register("available_from")} className="bg-[#111111] border-[#2A2A2A] rounded-none h-12 text-white focus-visible:border-white focus-visible:ring-0 [color-scheme:dark]" />
                {errors.available_from && <span className="text-[#EF4444] text-xs">{errors.available_from.message}</span>}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button type="button" onClick={handleNext} className="bg-white text-black hover:bg-[#E5E5E5] rounded-none font-bold uppercase tracking-widest px-8">Next Step</Button>
            </div>
          </div>

          {/* STEP 2: TYPE & FURNISHING */}
          <div className={step === 2 ? "block" : "hidden"}>
            <h2 className="font-heading text-3xl font-bold text-white mb-8">Type & Furnishing</h2>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Property Condition</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "raw", label: "RAW HOUSE" },
                    { id: "semi_furnished", label: "SEMI-FURNISHED" },
                    { id: "fully_furnished", label: "FULLY FURNISHED" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setValue("property_type", type.id as any)}
                      className={`h-24 border flex items-center justify-center font-bold tracking-[0.1em] uppercase transition-colors ${propertyType === type.id ? "bg-white text-black border-white" : "bg-[#111111] text-[#9A9A9A] border-[#2A2A2A] hover:border-[#5A5A5A]"}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {propertyType !== "raw" && (
                <div className="space-y-4 p-6 border border-[#2A2A2A] bg-[#1A1A1A]">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Select Furnishings</label>
                  <div className="flex flex-wrap gap-3">
                    {FURNISHING_OPTIONS.map((item) => {
                      const isActive = furnishingItems.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            if (isActive) setValue("furnishing_items", furnishingItems.filter(i => i !== item));
                            else setValue("furnishing_items", [...furnishingItems, item]);
                          }}
                          className={`px-4 py-2 border text-[11px] font-bold uppercase tracking-widest transition-colors ${isActive ? "bg-white text-black border-white" : "border-[#404040] text-white hover:border-[#9A9A9A]"}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#2A2A2A]">
                <div className="space-y-4">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Occupancy Setup</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "independent", label: "INDEPENDENT" },
                      { id: "with_owner", label: "WITH OWNER" }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setValue("occupancy_type", opt.id as any)}
                        className={`h-16 border flex items-center justify-center text-[10px] font-bold tracking-[0.1em] uppercase ${watch("occupancy_type") === opt.id ? "bg-white text-black border-white" : "bg-[#111111] text-[#9A9A9A] border-[#2A2A2A] hover:border-[#5A5A5A]"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Preferred Tenant</label>
                  <div className="flex flex-wrap gap-2">
                    {TENANT_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setValue("preferred_tenant", opt as any)}
                        className={`px-3 py-2 border text-[10px] font-bold uppercase tracking-widest ${watch("preferred_tenant") === opt ? "bg-white text-black border-white" : "border-[#2A2A2A] text-[#9A9A9A] hover:border-[#5A5A5A] bg-[#111111]"}`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Parking</label>
                  <div className="flex flex-wrap gap-2">
                    {PARKING_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setValue("parking", opt as any)}
                        className={`px-3 py-2 border text-[10px] font-bold uppercase tracking-widest ${watch("parking") === opt ? "bg-white text-black border-white" : "border-[#2A2A2A] text-[#9A9A9A] hover:border-[#5A5A5A] bg-[#111111]"}`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 flex flex-col justify-center">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Pet Friendly</label>
                  <button
                    type="button"
                    onClick={() => setValue("pet_friendly", !watch("pet_friendly"))}
                    className={`h-12 w-32 border flex items-center justify-center text-[10px] font-bold uppercase tracking-widest ${watch("pet_friendly") ? "bg-[#C9A84C] text-black border-[#C9A84C]" : "bg-[#111111] border-[#2A2A2A] text-[#9A9A9A]"}`}
                  >
                    {watch("pet_friendly") ? "Allowed ✓" : "Not Allowed"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button type="button" onClick={() => setStep(1)} variant="outline" className="border-[#2A2A2A] bg-transparent text-white rounded-none font-bold uppercase tracking-widest">Back</Button>
              <Button type="button" onClick={handleNext} className="bg-white text-black hover:bg-[#E5E5E5] rounded-none font-bold uppercase tracking-widest px-8">Next Step</Button>
            </div>
          </div>

          {/* STEP 3: PRICING */}
          <div className={step === 3 ? "block" : "hidden"}>
            <h2 className="font-heading text-3xl font-bold text-white mb-8">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Monthly Rent (₹)</label>
                <Input type="number" {...register("rent")} className="bg-[#111111] border-[#2A2A2A] rounded-none h-14 text-2xl font-bold text-white focus-visible:border-white focus-visible:ring-0" placeholder="e.g. 45000" />
                {errors.rent && <span className="text-[#EF4444] text-xs">{errors.rent.message}</span>}
                <div className="pt-2 flex items-center gap-3">
                  <input type="checkbox" id="nego" className="accent-white w-4 h-4" checked={watch("is_negotiable")} onChange={(e) => setValue("is_negotiable", e.target.checked)} />
                  <label htmlFor="nego" className="text-[#9A9A9A] text-sm font-medium">Rent is negotiable</label>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Security Deposit (₹)</label>
                  <Input type="number" {...register("deposit")} className="bg-[#111111] border-[#2A2A2A] rounded-none h-12 text-white focus-visible:border-white focus-visible:ring-0" placeholder="e.g. 150000" />
                  {errors.deposit && <span className="text-[#EF4444] text-xs">{errors.deposit.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Maintenance (₹) / Optional</label>
                  <Input type="number" {...register("maintenance")} className="bg-[#111111] border-[#2A2A2A] rounded-none h-12 text-white focus-visible:border-white focus-visible:ring-0" placeholder="Leave blank if included" />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-4 pt-8 border-t border-[#2A2A2A]">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Nearby Landmarks</label>
                
                {landmarks.map((lm, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] p-3 text-white">{lm.name} ({lm.distance})</div>
                    <Button type="button" onClick={() => setValue("nearby_landmarks", landmarks.filter((_, i) => i !== idx))} variant="outline" className="rounded-none border-[#2A2A2A] text-white">X</Button>
                  </div>
                ))}

                <div className="flex gap-4 border border-[#2A2A2A] p-4 bg-[#111111]">
                  <Input id="lm_name" placeholder="Name (e.g. Metro Station)" className="bg-transparent border-[#404040] rounded-none text-white h-10" />
                  <Input id="lm_dist" placeholder="Distance (e.g. 500m)" className="bg-transparent border-[#404040] rounded-none text-white h-10 w-32" />
                  <Button type="button" 
                    onClick={() => {
                      const name = (document.getElementById('lm_name') as HTMLInputElement).value;
                      const dist = (document.getElementById('lm_dist') as HTMLInputElement).value;
                      if(name && dist) {
                        setValue("nearby_landmarks", [...landmarks, {name, distance: dist}]);
                        (document.getElementById('lm_name') as HTMLInputElement).value = '';
                        (document.getElementById('lm_dist') as HTMLInputElement).value = '';
                      }
                    }}
                    className="rounded-none bg-white text-black font-bold uppercase tracking-widest"
                  >Add</Button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button type="button" onClick={() => setStep(2)} variant="outline" className="border-[#2A2A2A] bg-transparent text-white rounded-none font-bold uppercase tracking-widest">Back</Button>
              <Button type="button" onClick={handleNext} className="bg-white text-black hover:bg-[#E5E5E5] rounded-none font-bold uppercase tracking-widest px-8">Next Step</Button>
            </div>
          </div>


          {/* STEP 4: PHOTOS & REVIEW */}
          <div className={step === 4 ? "block" : "hidden"}>
            <h2 className="font-heading text-3xl font-bold text-white mb-8">Photos & Review</h2>
            
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">Photo URLs (Max 5)</label>
                
                {photos.map((p, idx) => (
                  <div key={idx} className="flex gap-4">
                    <Input disabled value={p} className="bg-[#1A1A1A] border border-[#2A2A2A] text-[#9A9A9A] rounded-none h-12 flex-1" />
                    <Button type="button" onClick={() => setValue("photos", photos.filter((_, i) => i !== idx))} variant="outline" className="rounded-none border-[#2A2A2A] text-white h-12">X</Button>
                  </div>
                ))}

                {photos.length < 5 && (
                  <div className="flex gap-4">
                    <Input id="photo_url" placeholder="Paste image URL (e.g. from Unsplash)" className="bg-[#111111] border-[#2A2A2A] rounded-none h-12 text-white" />
                    <Button type="button" 
                      onClick={() => {
                        const url = (document.getElementById('photo_url') as HTMLInputElement).value;
                        if(url) {
                          setValue("photos", [...photos, url]);
                          (document.getElementById('photo_url') as HTMLInputElement).value = '';
                        }
                      }}
                      className="rounded-none h-12 bg-[#2A2A2A] text-white hover:bg-[#404040] font-bold uppercase tracking-widest px-6"
                    >Add URL</Button>
                  </div>
                )}
                {errors.photos && <span className="text-[#EF4444] text-xs pb-2 block">{errors.photos.message}</span>}
              </div>

              <div className="h-px w-full bg-[#2A2A2A] my-8"></div>

              <div className="bg-[#111111] border border-white p-6 md:p-8">
                <h3 className="font-heading text-xl text-white mb-6">Review Listing</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="text-[#5A5A5A] uppercase tracking-widest font-bold text-[10px]">Title</div>
                  <div className="text-white font-medium">{watch("title") || "—"}</div>
                  
                  <div className="text-[#5A5A5A] uppercase tracking-widest font-bold text-[10px]">City / Area</div>
                  <div className="text-white font-medium">{watch("city") || "—"} / {watch("address") || "—"}</div>
                  
                  <div className="text-[#5A5A5A] uppercase tracking-widest font-bold text-[10px]">BHK & Type</div>
                  <div className="text-white font-medium">{watch("bhk_type")} • {watch("property_type").replace("_", " ")}</div>
                  
                  <div className="text-[#5A5A5A] uppercase tracking-widest font-bold text-[10px]">Monthly Rent</div>
                  <div className="text-white font-medium text-lg font-bold">₹{watch("rent") || 0}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button type="button" onClick={() => setStep(3)} variant="outline" className="border-[#2A2A2A] bg-transparent text-white rounded-none font-bold uppercase tracking-widest">Back</Button>
              <Button disabled={isSubmitting} type="submit" className="bg-white text-black hover:bg-[#E5E5E5] rounded-none font-bold uppercase tracking-widest px-10 h-12">
                {isSubmitting ? "Publishing..." : "Publish Listing"}
              </Button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
