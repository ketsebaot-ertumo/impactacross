// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState, useRef } from "react";
// import { getAllData, getLatestData } from "../app/lib/routes";

// export default function OurExpertise() {
//   const [data, setData] = useState({});
//   const [expanded, setExpanded] = useState(false);
//   const [needsExpand, setNeedsExpand] = useState(false);
//   const descriptionRef = useRef(null);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const {data} = await getLatestData("expertise");
//         console.log("data:", data);
//         if (data) {
//           // const [newData] = data;
//           setData(data);
//         }
//       } catch (err) {
//         // console.error("Failed to load data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Check if text needs expand/collapse
//   const checkOverflow = () => {
//     if (descriptionRef.current) {
//       const element = descriptionRef.current;
//       const isOverflowing = expanded 
//         ? element.scrollHeight > element.clientHeight
//         : element.scrollHeight > element.clientHeight;
      
//       setNeedsExpand(isOverflowing);
//     }
//   };

//   // Run check on mount, description changes, and expanded state changes
//   useEffect(() => {
//     checkOverflow();
//     const resizeObserver = new ResizeObserver(checkOverflow);
//     if (descriptionRef.current) {
//       resizeObserver.observe(descriptionRef.current);
//     }
//     return () => resizeObserver.disconnect();
//   }, [data?.description, expanded]);

//   return (
//     <section className="bg-green-950 text-white pt-16 pb-6 px-8 md:px-12">
//       <div className="max-w-screen-lg mx-auto text-center">
//         <motion.h2
//           className="text-4xl font-bold pb-4"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           viewport={{ once: false }}
//         >
//           <p>{data?.title || "Our Sector Expertise"}</p>
//         </motion.h2>

//         <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 rounded" />
        
//         <motion.div
//           className="text-center max-w-4xl mx-auto my-8 sm:mb-12"
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           viewport={{ once: false }}
//         >
//           <div
//             ref={descriptionRef}
//             className={`text-gray-400 italic transition-all duration-300 text-lg ${
//               expanded ? '' : 'line-clamp-4'
//             }`}
//           >
//             {data?.description || "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors"}
//           </div>

//           {needsExpand && (
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="mt-2 text-green-800 hover:text-green-600 hover:underline text-lg font-medium focus:outline-none italic"
//               aria-expanded={expanded}
//               aria-label={expanded ? 'Show less content' : 'Show more content'}
//             >
//               {expanded ? 'Show less' : 'See more'}
//             </button>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// }



"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getLatestData } from "../app/lib/routes";

export default function OurExpertise() {
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getLatestData("expertise");
        if (data) setData(data);
      } catch {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current) {
        const el = descriptionRef.current;
        setNeedsExpand(el.scrollHeight > el.clientHeight);
      }
    };
    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    return () => observer.disconnect();
  }, [data?.description, expanded]);

  return (
    <section className="bg-green-950 text-white pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto md:px-8">
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
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-screen-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Left: Text */}
          <div className="md:w-1/2 text-gray-300 text-lg">
            <div
              ref={descriptionRef}
              className={`italic transition-all duration-300 flex justify-center text-center ${
                expanded ? "" : "line-clamp-5"
              }`}
            >
              {data?.description ||
                "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors."}
            </div>

            {needsExpand && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-green-400 hover:text-green-300 hover:underline text-base font-medium focus:outline-none italic"
                aria-expanded={expanded}
              >
                {expanded ? "Show less" : "See more"}
              </button>
            )}
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
