"use client";

import { useEffect, useState } from "react";
import ResourceCard from "../../components/ResourceCard";
import { getLatestBlogPost, getLatestMultimedia, getLatestPublication, getLatestTraining } from "../lib/routes";
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
          getLatestBlogPost(),
          getLatestPublication(),
          getLatestMultimedia(),
          getLatestTraining()
        ]);
    
        const fetched = [blog, publication, multimedia, training].filter(Boolean);
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

  return (
    <>
        <div className="relative">
            <img 
                // src="/home.jpg"
                src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097915/ImpactAcross/images/photo_5944760772829759998_y_zwrgzh.jpg"
                alt="Consultancy Services"
                className="w-full h-60 sm:h-90 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50 w-full"></div>
            <div className="absolute inset-0 flex items-center max-w-6xl mx-auto pl-8 lg:pl-0">
                <div className="text-white text-3xl md:text-4xl font-bold border-b pb-4">
                    Resources
                </div>
            </div>
        </div>

        {loading ? (
          <div className="h-[40vh] flex justify-center items-center"><Loader/></div>
        ) : (
            (resources.length === 0 || !resources || resources === null) ? (
                <main className="container max-w-6xl mx-auto px-6 py-12 text-center text-gray-500 py-36">
                    <h1 className="text-4xl font-bold mb-6">❌ Oops!</h1>
                    <p className="text-lg">No Resources found.</p>
                </main>
            ) : (
                <div>
                  <section className="max-w-6xl mx-auto px-6 py-12">
                      <h2 className="text-4xl font-bold text-center text-gray-800 pb-12">Our Resources</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {resources.map((item) => (
                          <div key={item.id} className="h-full">
                            <ResourceCard key={item.id} {...item} />
                          </div>
                        ))}
                      </div>
                  </section>
                </div>
            ))}
    </>
  );
}
