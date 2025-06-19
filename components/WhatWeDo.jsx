"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getAllData } from "../app/lib/routes";
import Loader from "./Loader";

const ITEMS_PER_PAGE = 3;

export default function WhatWeDo() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [data, setData] = useState([]);
  const [section, setSection] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllData("what-we-do-images");
        if (data) {
          setSection(data[0]?.section || {});
          setData(data);
        }
      } catch (err) {
        // console.error("Failed to load data:", err);
      }
    };

    fetchData();
  }, []);

  // if(!data) return <Loader className="h-[60vh] text-center" />

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    activePage * ITEMS_PER_PAGE,
    (activePage + 1) * ITEMS_PER_PAGE
  );

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: index * containerWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const containerWidth = container.offsetWidth;
      const currentIndex = Math.round(container.scrollLeft / containerWidth);
      setActivePage(currentIndex);
    }
  };

  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    currentScrollRef?.addEventListener("scroll", handleScroll);
    return () => currentScrollRef?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-gray-50 text-gray-700 border-t border-gray-200 py-16">
      <div className="max-w-6xl mx-auto text-center px-6 md:px-8">
        <h2 className="text-4xl font-bold">{section?.title || "What We Do"}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 rounded" />
        <p className="max-w-2xl mx-auto text-lg italic pt-4">
          {section?.description || "Our approach integrates research, strategy, and action to create meaningful and lasting impact."}
        </p>
      </div>

      {!paginatedData && (<Loader className="h-12 text-green" />)}

      {/* Desktop: Grid with Pagination */}
      <div className="hidden lg:block max-w-6xl mx-auto mt-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedData.map((item, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-md group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={item?.image_url || item.image}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:brightness-50 transition-all duration-500"
              />
              <div
                className={`absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 sm:mt-4 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActivePage(index)}
              className={`w-4 h-4 rounded-full ${
                activePage === index ? "bg-gray-200" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: Horizontal Scroll with Snap */}
      <div className="lg:hidden mt-12">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              className={`min-w-[280px] w-[90%] max-w-sm flex-shrink-0 border border-gray-200 bg-white shadow-md rounded-2xl overflow-hidden p-4 snap-center`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={item?.image_url || item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-2xl font-semibold mt-4">{item.title}</h3>
              <p className="text-base mt-4">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full ${
                activePage === index ? "bg-gray-200" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
