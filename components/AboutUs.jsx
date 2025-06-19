// "use client";

// import { useEffect, useState } from "react";
// import { getLatestData } from "../app/lib/routes";

// export default function WhoWeAre() {
//   const [data, setData] = useState({});
    
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const {data} = await getLatestData("about_us");
//           if (data) {
//             setData(data);
//           }
//         } catch (err) {
//           // console.error("Failed to load data:", err);
//         }
//       };
  
//       fetchData();
//     }, []);

//   return (
//     <section id="about" className="scroll-mt-24 max-w-6xl mx-auto px-6 pt-6 sm:pt-12">
//       <div className="sm:flex justify-between gap-6 sm:gap-12 items-center space-y-2">
//         <div className="space-y-6 max-w-xl w-full">
//           <h2 className="text-4xl font-semibold text-gray-600 leading-tight animate-fade-in">
//             About Us
//           </h2>

//           <div className="w-26 h-1 bg-gradient-to-r from-primary to-green-800 my-4 rounded" />
          
//           {/* <p className="text-gray-700 leading-relaxed text-lg animate-fade-in delay-200">
//             {data?.description1 || `ImpactAcross is an Ethiopia-based research and advisory firm with a liaison office in Cape Town, South Africa. We are dedicated to supporting governments, donors, and development partners to drive sustainable, inclusive progress across Africa. Founded in June 2018 under the business name <em>ABBABOR Development Consult</em>, the firm was rebranded in 2024 as ImpactAcross to reflect its expanded vision, broader geographical reach, and integrated service offerings. The company was established by Dr. Kassahun Kelifa Suleman, a respected and experienced consultant in the international development arena, widely recognized for his contributions to climate change, food security, rural livelihoods, and natural resource governance.`}
//           </p>

//           <p className="text-gray-700 leading-relaxed text-lg animate-fade-in delay-200">
//             {data?.description2 || `ImpactAcross was created to address persistent and emerging gaps in Africa’s development landscape. These include the limited use of data and research to inform evidence-based policy and program design, fragmented development efforts that overlook cross-sectoral linkages, and capacity constraints among local actors and institutions that hinder the delivery of sustainable, scalable solutions. The firm also responds to the need for context-sensitive strategies that are both locally grounded and globally informed, as well as the weak alignment between research, policy, and implementation that often undermines long-term development impact. The name <em>ImpactAcross</em> captures the company’s mission to generate meaningful, evidence-driven change across sectors, geographies, and stakeholder groups.`}
//           </p>

//           <p className="text-gray-700 leading-relaxed text-lg animate-fade-in delay-200">
//             {data?.description3 || `At ImpactAcross, we don’t just analyze data—we translate it into actionable, context-relevant solutions that improve lives, inform policy, and contribute to a resilient, sustainable future for Africa. Through our collaborative approach and evidence-based methods, we strive to be a trusted partner in shaping transformative development outcomes across the continent.`}
//           </p> */}

//           {[data?.description1, data?.description2].map(
//             (desc, idx) =>
//               desc && (
//                 <p
//                   key={idx}
//                   className="text-gray-700 text-lg leading-relaxed tracking-wide"
//                   dangerouslySetInnerHTML={{ __html: desc }}
//                 ></p>
//               )
//           )}
//         </div>

//         {/* Image Section */}
//         <div className="relative group">
//           <div className="overflow-hidden rounded-3xl">
//             <img
//               src={data?.image_url || "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750087594/ImpactAcross/images/photo_5944760772829759238_x_s1jd7a.jpg"}
//               alt="About Us"
//               className="max-h-[60vh]"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { getLatestData } from "../app/lib/routes";
import { motion } from "framer-motion";

export default function WhoWeAre() {
  const [data, setData] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getLatestData("about_us");
        if (data) setData(data);
      } catch (err) {
        // console.error("Failed to load data:", err);
      }
    };
    fetchData();
  }, []);

  // const descriptions = [data?.description1, data?.description2, data?.description3].filter(Boolean);
  const descriptions = [data?.description1 || "ImpactAcross is an Ethiopia-based research and advisory firm with a liaison office in Cape Town, South Africa. We are dedicated to supporting governments, donors, and development partners to drive sustainable, inclusive progress across Africa. Founded in June 2018 under the business name <em>ABBABOR Development Consult</em>, the firm was rebranded in 2024 as ImpactAcross to reflect its expanded vision, broader geographical reach, and integrated service offerings. The company was established by Dr. Kassahun Kelifa Suleman, a respected and experienced consultant in the international development arena, widely recognized for his contributions to climate change, food security, rural livelihoods, and natural resource governance."].filter(Boolean);

  const toggleExpand = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="about" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Text */}
        <div className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold text-gray-800"
          >
            About <span className="text-green-700">ImpactAcross</span>
          </motion.h2>
          <div className="w-34 h-1 bg-gradient-to-r from-primary to-green-800 my-4 rounded pr-2 mb-6" />
          {/* <div className="w-24 h-1 bg-gradient-to-r from-[#e27a00] to-green-800 rounded" /> */}

          {descriptions.map((desc, idx) => {
            const isExpanded = expandedSections[idx];
            const limit = 400;

            const plainText = desc?.replace(/<[^>]+>/g, "");
            const shouldTruncate = plainText?.length > limit;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative group"
              >
                <div
                  className="text-gray-700 text-lg leading-relaxed transition-all duration-300"
                  dangerouslySetInnerHTML={{
                    __html: shouldTruncate && !isExpanded
                      ? plainText.slice(0, limit) + "..."
                      : desc,
                  }}
                />
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="mt-2 text-green-700 font-medium text-lg hover:underline italic"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <img
              src={
                data?.image_url ||
                "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750154755/ImpactAcross/images/iwpna55jrk2jbixfridf.jpg"
              }
              alt="About ImpactAcross"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>

      {[data?.description2 || "ImpactAcross was created to address persistent and emerging gaps in Africa’s development landscape. These include the limited use of data and research to inform evidence-based policy and program design, fragmented development efforts that overlook cross-sectoral linkages, and capacity constraints among local actors and institutions that hinder the delivery of sustainable, scalable solutions. The firm also responds to the need for context-sensitive strategies that are both locally grounded and globally informed, as well as the weak alignment between research, policy, and implementation that often undermines long-term development impact. The name <em>ImpactAcross</em> captures the company’s mission to generate meaningful, evidence-driven change across sectors, geographies, and stakeholder groups."].map((desc, idx) => {
            const isExpanded = expandedSections[idx];
            const limit = 400;

            const plainText = desc?.replace(/<[^>]+>/g, "");
            const shouldTruncate = plainText?.length > limit;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative group pt-8"
              >
                <div
                  className="text-gray-700 text-[17px] leading-relaxed transition-all duration-300"
                  dangerouslySetInnerHTML={{
                    __html: shouldTruncate && !isExpanded
                      ? plainText.slice(0, limit) + "..."
                      : desc,
                  }}
                />
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="mt-2 text-green-700 font-medium text-lg hover:underline italic"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </motion.div>
            );
          })}
    </section>
  );
}

