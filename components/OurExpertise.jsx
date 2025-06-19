"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { getAllData } from "../app/lib/routes";

export default function OurExpertise() {
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const descriptionRef = useRef(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await getAllData("sections/values/expertise");
        if (data) {
          const [newData] = data;
          setData(newData);
        }
      } catch (err) {
        // console.error("Failed to load data:", err);
      }
    };

    fetchData();
  }, []);

  // Check if text needs expand/collapse
  const checkOverflow = () => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      const isOverflowing = expanded 
        ? element.scrollHeight > element.clientHeight
        : element.scrollHeight > element.clientHeight;
      
      setNeedsExpand(isOverflowing);
    }
  };

  // Run check on mount, description changes, and expanded state changes
  useEffect(() => {
    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (descriptionRef.current) {
      resizeObserver.observe(descriptionRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [data?.description, expanded]);

  return (
    <section className="bg-green-950 text-white pt-16 pb-6 px-8 md:px-12">
      <div className="max-w-screen-lg mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold pb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: false }}
        >
          <p>Our Purpose</p>
        </motion.h2>

        <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 rounded" />
        
        <motion.div
          className="text-center max-w-4xl mx-auto my-8 sm:mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div
            ref={descriptionRef}
            className={`text-gray-400 italic transition-all duration-300 text-lg ${
              expanded ? '' : 'line-clamp-4'
            }`}
          >
            {data?.description || "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors."}
          </div>

          {needsExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-green-800 hover:text-green-600 hover:underline text-lg font-medium focus:outline-none italic"
              aria-expanded={expanded}
              aria-label={expanded ? 'Show less content' : 'Show more content'}
            >
              {expanded ? 'Show less' : 'See more'}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}


// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState, useRef } from "react";
// import { getAllData } from "../lib/routes";

// export default function OurExpertise() {
//   const [data, setData] = useState({});
//   const [expanded, setExpanded] = useState(false);
//   const [needsExpand, setNeedsExpand] = useState(false);
//   const descriptionRef = useRef(null);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const {data} = await getAllData("sections/values/expertise");
//         if (data) {
//           const [newData] = data;
//           setData(newData);
//         }
//       } catch (err) {
//         // console.error("Failed to load data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Check if text overflows and needs expand/collapse
//   useEffect(() => {
//     if (descriptionRef.current) {
//       const isOverflowing = descriptionRef.current.scrollHeight > 
//                            descriptionRef.current.clientHeight;
//       setNeedsExpand(isOverflowing);
//     }
//   }, [data?.description]);

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
//           {data?.title || "Our Expertise"}
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
//             className={`text-gray-400 italic transition-all duration-300 ${
//               expanded ? '' : 'line-clamp-2 sm:line-clamp-none'
//             }`}
//           >
//             {data?.description || "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors."}
//           </div>

//           {needsExpand && (
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="mt-2 text-green-400 hover:text-green-300 hover:underline text-sm font-medium focus:outline-none"
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




// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { getAllData } from "../lib/routes";

// export default function OurExpertise() {
//   const [data, setData] = useState({});
//   const [expanded, setExpanded] = useState(false);
      
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const {data} = await getAllData("sections/values/expertise");
//         if (data) {
//           const [newData] = data;
//           setData(newData);
//         }
//       } catch (err) {
//         // console.error("Failed to load data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <section className="bg-green-950 text-white pt-16 pb-6 px-8 md:px-12">
//       <div className="max-w-screen-lg mx-auto text-center">
//         <motion.h2
//           className="text-4xl font-bold pb-4"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           viewport={{ once: false}}
//         >
//           {data?.title || "Our Expertise"}
//         </motion.h2>
        
//         <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 rounded" />

//         <motion.p
//           className="text-center text-lg mt-4 md:leading-relaxed max-w-6xl mx-auto"
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           viewport={{ once: false}}
//         >
//           {/* {data?.description || "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors."} */}
//           <div className="text-center max-w-4xl mx-auto my-8 sm:mb-12">
//           <p
//             className={`text-gray-400 italic transition-all duration-300 ${
//               expanded ? '' : 'line-clamp-4'
//             }`}
//           >
//             {data?.description || "At ImpactAcross, we bring deep, multidisciplinary expertise to address complex development challenges across a range of critical sectors."}
//           </p>

//           {data?.description && data?.description?.length > 120 && (
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="mt-2 text-green-800 hover:underline text-sm font-medium"
//             >
//               {expanded ? 'Show less' : 'See more'}
//             </button>
//           )}
//         </div>
//         </motion.p>
//       </div>
//     </section>
//   );
// }
