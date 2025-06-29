"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getLatestData } from "../app/lib/routes";

export default function OurExpertise() {
  const [data, setData] = useState({});
  const [isClimped, setIsClimped] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getLatestData("expertise");
        if (data) setData(data);
      } catch {}
    };
    fetchData();
  }, []);

  const handleClimp = () => {
    setIsClimped(!isClimped);
  };

  return (
    <section className="bg-green-950 text-white pt-16 pb-12 px-6 sm:px-12 lg:px-6">
      <div className="max-w-6xl mx-auto sm:px-4 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold pb-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {data?.title || "Our Sector Expertise"}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 rounded" />
        </div>

        {/* Content Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Left: Text */}
          <div className="md:w-1/2 text-gray-300 text-lg">
            <p
              onClick={handleClimp}
              className={`italic transition-all duration-300 text-ce ${isClimped ? 'line-clamp-8': ''}`}
            >
              {data?.description ||
                "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors."}
            </p>

          </div>

          {/* Middle: Vertical Separator */}
          <div className="hidden md:block h-48 w-[2px] bg-gradient-to-b from-green-700 via-green-500 to-green-700 rounded" />

          {/* Right: Image */}
          <div className="md:w-1/2 w-full max-w-md mx-auto rounded-xl overflow-hidden bg-white h-[260px] flex items-center justify-center">
            <img
              src={
                data.image_url ||
                "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750087594/ImpactAcross/images/photo_5944760772829759238_x_s1jd7a.jpg"
              }
              alt="Expertise visual"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
