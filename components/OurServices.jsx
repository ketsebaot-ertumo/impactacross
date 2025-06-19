"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllData } from "../app/lib/routes";
import Loader from "./Loader";

const image_url = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097496/ImpactAcross/images/photo_5944760772829759997_x_f4pshd.jpg"
const defaultValues = [
  {
    title: "Research & Policy Analysis",
    content: "We deliver rigorous, high-quality studies that generate actionable insights to inform policy and support evidence-based decision-making. Our expertise spans impact evaluations, baseline and endline surveys, political economy and policy analysis, as well as thematic research on climate change, livelihoods, and governance.",
    slug: "research-policy-analysis",
    image_url,
  },
  {
    title: "Program Design & Strategy Development",
    content: "We support the design of impactful and scalable programs rooted in local realities and aligned with global frameworks. Our services include conducting feasibility studies and investment cases, developing Theories of Change and results frameworks, and crafting compelling proposals and technical reports.",
    slug: "programme-design-strategy-development",
    image_url,
  },
  {
    title: "Monitoring, Evaluation & Learning (MEL)",
    content: "We build robust Monitoring, Evaluation, and Learning (MEL) systems that enhance accountability, foster continuous learning, and support adaptive project management. Our work includes designing MEL frameworks and tools, conducting performance monitoring and data analysis, and managing learning processes and reporting to inform decision-making.",
    slug: "monitoring-evaluation-learning",
    image_url,
  },
  {
    title: "Capacity Building & Technical Assistance",
    content: "We empower organizations and communities through tailored training, mentorship, and advisory support. Our services include capacity building in climate finance, monitoring and evaluation (M&E), and project management; strengthening organizational systems and structures; and facilitating effective stakeholder engagement for inclusive and sustainable impact.",
    slug: "capacity-building-technical-assistance",
    image_url,
  },
]

export default function OurSectorialFocus() {
  const [data, setData] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState(defaultValues?.[0]?.section?.description);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(4)
  const [expandedIndex, setExpandedIndex] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData('services', currentPage, pageSize);
        if (data?.data) {
          setData(data?.data);
          setDescription(data?.data?.[0]?.section?.description);
          setCurrentPage(data?.pagination?.page);
          setTotalPages(data.pagination.totalPages);
          setTotal(data.pagination.total);
          setPageSize(data?.pagination?.pageSize);
        }
      } catch {
        setData(fallback[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, pageSize]);

  const handleSeeMore = (limit) => {
    setPageSize(limit);
  };

  return (
    <section id="services" className="scroll-mt-24 bg-gray-100 py-16 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center line-clamp-4">Our Services</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 rounded" />
        <p className="text-center max-w-4xl mx-auto text-lg text-lg italic">
          {description || "At ImpactAcross, we provide end-to-end research, strategy, and advisory services tailored to accelerate sustainable development across Africa."}
        </p>

        {/* Horizontal scroll on mobile/tablet */}
        <div className="mt-10 block lg:hidden overflow-x-auto scrollbar-hide px-1">
          <div className="flex gap-4">
            {data?.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="flex-shrink-0 w-[85vw] sm:w-[60vw] bg-white rounded-2xl shadow-lg p-5 border border-gray-200"
              >
                <img
                  src={item.image_url || image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-lg mt-2 line-clamp-4">{item.content}</p>
                <Link
                  href={`/services/${item?.id}`}
                  className="mt-3 inline-block text-lg text-primary hover:underline italic"
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {!data && (
          loading ? (
            <div className="h-16 flex justify-center">
            <Loader className="" />
            </div>
          ) : (
            <p className="h-16 text-emerald-500 mx-auto">No data Found!</p>
          )
        )}

        {/* Grid + accordion on large screens */}
        <div className="hidden lg:grid grid-cols-2 gap-6 mt-10">
          {data?.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white border border-gray-200 rounded-xl p-6 shadow-md cursor-pointer transition-all duration-300 ${
                expandedIndex === i ? "col-span-2" : ""
              }`}
              onClick={() =>
                setExpandedIndex((prev) => (prev === i ? null : i))
              }
            >
              <div className="flex items-center gap-4 hover:opacity-60">
                <img
                  src={item.image_url || item.image || fallbackImage}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover transition rounded-xl hover:scale-108 duration-300"
                />
                <div className="">
                  <h3 className="text-xl font-semibold object-contain transition rounded-xl hover:scale-108 duration-300 line-clamp-1">{item.title}</h3>
                  {/* <p className="text-sm mt-2 line-clamp-2">{item.content}</p> */}
                </div>
              </div>

              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4 text-sm text-gray-600"
                  >
                    <p className="mb-2">{item.content}</p>
                    <Link
                      href={`/services/${item?.id || item?.slug}`}
                      className="text-primary hover:underline"
                    >
                      Learn More →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className='sm:flex sm:justify-center max-w-2xl mx-auto'>
          {(total > pageSize) && (
            <button 
              onClick={() => handleSeeMore(pageSize + 5)} 
              className='cursor-pointer text-gray-800 flex justify-center text-md shadow-lg border border-green-800 p-4 mt-8 rounded-lg max-w-2xl mx-auto'>
                Do you want to see more?
            </button>
          )}

          {pageSize > 5 && (
            <button 
              onClick={() => handleSeeMore(pageSize - 5)} 
              className='cursor-pointer text-gray-800 flex justify-center text-md shadow-lg border border-green-800 p-4 mt-8 rounded-lg max-w-2xl mx-auto'>
                See Less to go Back?
            </button>
          )}
        </div>
      </div>
    </section>
  );
}






// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { getAllData } from "../lib/routes";

// const fallbackImage =
//   "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749803292/ImpactAcross/owner/test_g250va.jpg";

// const fallbackData = [
//   {
//     title: "Our Services",
//     description:
//       "Our services are informed by our professional orientation and experience both in Ethiopia and abroad. We have specialized in the following key development sectors.",
//     services: [
//       {
//         image: fallbackImage,
//         title: "Surveys & Statistical Analysis",
//         content:
//           "We conduct relevant statistical tests and analysis to ensure useful insights are captured and presented in engaging formats.",
//         slug: "survey-statistical-analysis",
//       },
//       {
//         image: fallbackImage,
//         title: "Programme Monitoring & Evaluation",
//         content:
//           "We support evidence-based decisions in Africa through Monitoring and Evaluation frameworks for civil society organizations.",
//         slug: "programme-monitoring-evaluation",
//       },
//       {
//         image: fallbackImage,
//         title: "Strategy & Programme Planning",
//         content:
//           "We craft impactful strategies aligned with developmental goals and measurable outcomes.",
//         slug: "strategy-programme-planning",
//       },
//       {
//         image: fallbackImage,
//         title: "Training & Capacity Building",
//         content:
//           "We deliver impactful training interventions that empower professionals and organizations to thrive.",
//         slug: "training-capacity-building",
//       },
//     ],
//   },
// ];

// export default function OurSectorialFocus() {
//   const [data, setData] = useState(fallbackData[0]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: res } = await getAllData("sections/values/service");
//         if (res?.length) {
//           setData(res[0]);
//         }
//       } catch (err) {
//         // console.error("Failed to load data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <section
//       id="services"
//       className="relative scroll-mt-24 bg-gray-100 py-16 text-gray-700"
//     >
//       <div className="max-w-6xl mx-auto px-4 md:px-8">
//         <h2 className="text-4xl md:text-5xl font-bold text-center">
//           {data?.title || "Our Services"}
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-400 mx-auto my-4 rounded" />
//         <p className="text-center max-w-3xl mx-auto text-lg italic text-gray-600">
//           {data?.description}
//         </p>

//         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {data?.services?.map((item, index) => (
//             <motion.div
//               key={index}
//               className="bg-white bg-opacity-90 border border-gray-200 shadow-xl rounded-3xl overflow-hidden p-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ scale: 1.03 }}
//             >
//               <div className="flex justify-center">
//                 <img
//                   src={item?.image_url || item.image || fallbackImage}
//                   alt={item?.title}
//                   className="w-full h-40 object-cover rounded-xl"
//                 />
//               </div>
//               <h3 className="text-xl font-bold mt-4 text-primary">
//                 {item?.title}
//               </h3>
//               <p className="text-gray-600 text-sm mt-2 line-clamp-5">
//                 {item?.content}
//               </p>
//               <Link
//                 href={`/services/${item?.id || item.slug}`}
//                 className="mt-4 text-sm text-primary font-semibold hover:underline inline-flex items-center"
//               >
//                 Learn More →
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }





// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { getAllData } from "../lib/routes";

// const image = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749803292/ImpactAcross/owner/test_g250va.jpg";
// const serviceData = [
//   {
//     title: "",
//     description:"",
//     services: [
//       {
//         image,
//         title: "Surveys & statistical analysis",
//         content: "Members of our statistical teams are also members of the relevant internationally recognised statistical and actuarial associations. We conduct relevant statistical tests and analysis to ensure the most useful and appropriate insights are captured. We present our findings in ways that engage a broad variety of readers including those who are more and less comfortable with statistics.",
//         slug: "survey-statistical-analysis",
//       },
//       {
//         image,
//         title: "Programme Monitoring & Evaluation",
//         content: "The growing demands for Monitoring and Evaluation in Africa are driven by civil society organisations and decision-makers in the region increasingly wanting to use evidence.",
//         slug: "programme-monitoring-evaluation",
//       },
//       {
//         image,
//         title: "Strategy & Programme Planning ",
//         content: "The emphasis on achieving development outcomes means that development strategies need to be clearly articulated.",
//         slug: "strategy-programme-planning",
//       },
//       {
//         image,
//         title: "Training & Capacity Building",
//         content: "ADC offers training solutions and interventions that are designed to achieve positive impact and result.",
//         slug: "training-capacity-building",
//       },
//       {
//         image,
//         title: "Strategy & Programme Planning ",
//         content: "The emphasis on achieving development outcomes means that development strategies need to be clearly articulated.",
//         slug: "strategy-programme-planning",
//       },
//     ]

//   },
// ];

// export default function OurSectorialFocus() {

//     const [data, setData] = useState(serviceData);
    
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const {data: res} = await getAllData("sections/values/service");
//           const [data] = res;
//           if (data) {
//             setData(data);
//           }
//         } catch (err) {
//           // console.error("Failed to load data:", err);
//         }
//       };
  
//       fetchData();
//     }, []);

//     return (
//       <section id="services" className="scroll-mt-24 bg-gray-50 text-gray-600 md:pt-6 pt-4">
//         <div className="max-w-6xl mx-auto py-12 px-2 md:px-8">
//           <h2 className="text-4xl font-bold text-center">{data?.title || "Our Services"}</h2>
//           <div className="relative flex items-center justify-center pt-4">
//             <div className="w-32 border-t-2 border-gray-300"></div>
//           </div>
//           <p className="md:leading-relaxed max-w-4xl mx-auto text-center my-6 pb-8 text-lg">
//             <i>{data?.description || "Our services are informed by our professional orientation and experience both in Ethiopia and abroad. We have specialized in the following key development sectors."}</i>
//           </p>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
//             {data?.services?.map((item, index) => (
//             <motion.div
//                 key={index}
//                 id={item.id}
//                 // ${index === data.length - 1 && index % 2 === 0 ? "md:col-span-2 lg:col-span-3 md:justify-self-center" : ""}
//                 className={`max-w-sm w-[90%] border border-gray-300 shadow-lg rounded-4xl overflow-hidden p-6 mx-6 md:mx-0 hover:shadow-2xl transition-all duration-300`}
//                 initial={{ opacity: 0, y: 100 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 viewport={{ once: false }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link href={`/services/${item?.id || item.slug}`} className="text-green-600">
//                   <div className="flex justify-center">
//                     <img src={item?.image_url || item.image} alt={item?.title} className="rounded-lg"/>
//                   </div>
//                   <h3 className="text-lg md:text-xl font-semibold mt-4">{item?.title}</h3>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
// }  
