"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For smooth animations
import { getAllData } from "../app/lib/routes";
import Link from "next/link";

const valuesData = [
  {
    title: "Mission",
    description:
      "ImpactAcross drives sustainable and equitable development in Africa through research, consulting, and capacity-building, partnering with stakeholders to shape impactful policies and programs.",
  },
  {
    title: "Vision",
    description:
      "To be a leading African thought partner and catalyst for sustainable development, empowering communities and institutions through transformative research, strategic advice, and inclusive innovation.",
  },
  {
    title: "Core Values",
    description:
      "We act with integrity, respect, and a drive for excellence, grounding our work in evidence, collaboration, and innovation.",
  },
];

export default function MissionVisionObjective() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [data, setData] = useState(valuesData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await getAllData("sections/values/value");
        if (data) {
          setData(data);
        }
      } catch (err) {
        // console.error("Failed to load data:", err);
      }
    };

    fetchData();
  }, []);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 768); // Small screens (below md)
      setIsMediumScreen(width >= 768 && width < 1024); // Medium screens (md to lg)
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Slideshow effect every 2 seconds (only on small screens)
  useEffect(() => {
    if (isSmallScreen) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isSmallScreen]);

  return (
      <div className="max-w-6xl mx-auto flex flex-wrap overflow-hidden justify-center items-center gap-6 text-gray-600 px-4 py-6 md:py-10">
        {isSmallScreen ? (
          <div className="relative w-full max-w-lg h-52 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ x: 100, opacity: 0 }} // Start off-screen (right)
                animate={{ x: 0, opacity: 1 }} // Slide in to center
                exit={{ x: -100, opacity: 0 }} // Slide out to left
                transition={{ duration: 0.5 }} // Smooth transition
                className="absolute border border-green-800 w-84 h-46 m-6 bg-white shadow-sm rounded-3xl m-4 p-6 text-center flex flex-col justify-center items-center"
              >
                <h2 className="text-3xl font-bold mb-4 line-clamp-1">{data[activeIndex].title}</h2>
                <Link href="/values"><p className="text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: data[activeIndex].description }}/></Link>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-6">
            {isMediumScreen
              ? data.slice(0, 2).map((item, index) => ( // Show only first two for medium screens
                  <motion.div
                    key={index}
                    className="bg-white w-82 h-52 shadow-lg rounded-3xl border border-green-800 m-6 p-6 flex flex-col justify-center items-center text-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: false }}
                  >
                    <div className="">
                      <h2 className="text-2xl font-bold mb-4 line-clamp-1">{item.title}</h2>
                      <Link href="/values"><p className="text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: data[activeIndex].description }}/></Link>
                    </div>
                  </motion.div>
                ))
              : data.map((item, index) => ( // Show all items for large screens
                  <motion.div
                    key={index}
                    className="bg-white border border-green-800 w-84 h-52 shadow-lg rounded-3xl m-6 p-6 flex flex-col justify-center items-center text-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: false }}
                  >
                    <div className="">
                      <h2 className="text-2xl font-bold mb-4 line-clamp-1">{item.title}</h2>
                      <Link href="/values"><p className="text-lg line-clamp-4" dangerouslySetInnerHTML={{ __html: data[activeIndex].description }}/></Link>
                    </div>
                  </motion.div>
                ))}
          </div>
        )}
      </div>
  );
}
