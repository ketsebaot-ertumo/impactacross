"use client";

import { useEffect, useState } from "react";
import ResourceCard from "../../components/ResourceCard";
import { getLatestData } from "../lib/routes";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

export default function ResourceGrid() {

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResources = async () => {
      try{
        // setLoading(true);
        const [blog, publication, multimedia, training] = await Promise.all([
          await getLatestData("blogs"),
          getLatestData("publications"),
          getLatestData("multimedias"),
          getLatestData("trainings")
        ]);
    
        const fetched = [blog?.data, publication?.data, multimedia?.data, training?.data].filter(Boolean);
        if (fetched.length === 0) toast.error("No resources found");
    
        setResources((prev) => {
          const newOnes = fetched.filter(item => !prev.some(p => p.id === item.id));
          return [...newOnes, ...prev];
        });
      } catch(err){
          toast.error('Could Not Load Post Data.');
          // console.error("Could not load data:", + err);
          setError("Could not load data.");
      } finally {
        setLoading(false);
      }
    };
    loadResources();
  }, []);  

  if (loading)
    return (
        <div className="h-[70vh] flex justify-center">
          <p>Resource data Loading...</p>
          <Loader />
        </div>
    );

  if(error){
      return (
          <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">
              <div>
                  <h1 className="text-4xl font-bold mb-4">Error</h1>
                  <p>{error || "Error occur on fetching resource data."}</p>
              </div>
          </div>
      );
  }

  if(!resources && !resources?.length){
      return (
          <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
            <p>Currently, there are no resources available. Please check back later.</p>
          </div>
      );
  }

  return (
    <>
        <div className="relative">
            <img 
                src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097915/ImpactAcross/images/photo_5944760772829759998_y_zwrgzh.jpg"
                alt="Consultancy Services"
                className="w-full h-60 sm:h-90 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50 w-full"></div>
    
            <div className="absolute inset-0 flex items-center max-w-6xl mx-auto">
              <div className="mx-6 md:px-9 lg:px-12">
                <div className="text-white text-4xl font-bold border-b pb-4">
                  Resources
                </div>
              </div>
            </div>

        </div>

        <div>
          <section className="max-w-6xl mx-auto px-6 py-12">
              <h2 className="text-4xl font-bold text-center text-gray-800 py-16">Our Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {resources.map((item) => (
                  <div key={item.id} className="h-full">
                    <ResourceCard key={item.id} {...item} />
                  </div>
                ))}
              </div>
          </section>
        </div>
    </>
  );
}
