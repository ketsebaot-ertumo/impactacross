// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { getAllData } from '../app/lib/routes';

// const images = [
//   '/gallery/1.jpg',
//   '/gallery/2.jpg',
//   '/gallery/3.jpg',
//   '/gallery/4.jpg',
//   '/gallery/5.jpg',
//   '/gallery/6.jpg',
//   '/gallery/7.jpg',
//   '/gallery/8.jpg',
// ];

// export default function Gallery() {
//   const [selected, setSelected] = useState(null);
//    const [data, setData] = useState();
//     const [loading, setLoading] = useState(true);
//     const [description, setDescription] = useState();
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [pageSize, setPageSize] = useState(5);
//     const [total, setTotal] = useState(5);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const data = await getAllData('gallery', currentPage, pageSize);
//           console.log(data?.data)
//           if (data?.data) {
//             setData(data?.data);
//             setDescription(data?.data?.[0]?.section?.description);
//             setCurrentPage(data?.pagination?.page);
//             setTotalPages(data.pagination.totalPages);
//             setTotal(data.pagination.total);
//             setPageSize(data?.pagination?.pageSize);
//           }
//         } catch {
//           setData(fallback[0]);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchData();
//     }, [currentPage, pageSize, total]);
  
//      const handleSeeMore = (limit) => {
//           setPageSize(limit);
//      };
  

//   return (
//     <section className="min-h-screen px-4 py-16 bg-gradient-to-br from-white to-gray-100">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Our Gallery</h2>
//         <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
//           A collection of moments and memories from our journey.
//         </p>

//         <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
//           {data && data.map((src, index) => (
//             <motion.div
//               key={index}
//               className="relative overflow-hidden rounded-2xl cursor-pointer hover:shadow-xl transition-all"
//               whileHover={{ scale: 1.02 }}
//               onClick={() => setSelected(src)}
//             >
//               <Image
//                 src={src?.image_url}
//                 alt={`Gallery image ${index + 1}`}
//                 width={600}
//                 height={400}
//                 className="w-full h-auto object-cover rounded-2xl"
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <AnimatePresence>
//         {selected && (
//           <motion.div
//             className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelected(null)}
//           >
//             <motion.img
//               src={selected}
//               alt="Selected"
//               className="max-w-4xl w-full rounded-xl shadow-lg"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }






// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { getAllData } from '../app/lib/routes';
// import dayjs from 'dayjs';

// export default function Gallery() {
//   const [selected, setSelected] = useState(null);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [description, setDescription] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(100); // load a lot to group properly
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAllData('gallery', currentPage, pageSize);
//         if (res?.data) {
//           setData(res.data);
//           setDescription(res.data?.[0]?.section?.description || '');
//           setTotal(res.pagination?.total || 0);
//         }
//       } catch {
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [currentPage, pageSize, total]);

//   // 🔁 Group images by month
//   const grouped = data?.reduce((acc, item) => {
//     const month = dayjs(item.created_at).format('MMMM YYYY');
//     acc[month] = acc[month] || [];
//     acc[month].push(item);
//     return acc;
//   }, {});

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-20">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Gallery</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             {description || 'A beautifully organized archive of captured moments by month.'}
//           </p>
//         </div>

//         {Object.entries(grouped || {}).map(([month, items], index) => (
//           <div key={month} className="mb-14">
//             <h3 className="text-2xl font-semibold text-gray-700 mb-4">{month}</h3>
//             <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
//               {items.map((img, i) => (
//                 <motion.div
//                   key={i}
//                   className="min-w-[260px] h-[180px] relative rounded-xl overflow-hidden shadow-md cursor-pointer snap-start"
//                   whileHover={{ scale: 1.03 }}
//                   onClick={() => setSelected(img)}
//                 >
//                   <Image
//                     src={img.image_url}
//                     alt={img.title || `Image ${i}`}
//                     fill
//                     className="object-cover"
//                   />
//                   <div className="absolute bottom-0 w-full text-sm bg-gradient-to-t from-black/70 to-transparent text-white px-3 py-2">
//                     {img.title || 'Untitled'}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <AnimatePresence>
//         {selected && (
//           <motion.div
//             className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelected(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="relative max-w-4xl w-full"
//             >
//               <Image
//                 src={selected?.image_url}
//                 alt={selected?.title || 'Selected'}
//                 width={1200}
//                 height={800}
//                 className="rounded-xl object-contain w-full shadow-xl"
//               />
//               <button
//                 onClick={() => setSelected(null)}
//                 className="absolute top-4 right-4 bg-white/80 hover:bg-white/90 text-black px-3 py-1 rounded-full text-sm font-semibold shadow"
//               >
//                 Close ✕
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllData } from '../app/lib/routes';
import dayjs from 'dayjs';

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllData('gallery', currentPage, pageSize);
        if (res?.data) {
          setData(res.data);
          setDescription(res.data?.[0]?.section?.description || '');
          setTotal(res.pagination?.total || 0);
        }
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, pageSize, total]);

  const grouped = data?.reduce((acc, item) => {
    const month = dayjs(item.createdAt).format('MMMM YYYY');
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
  }, {});

  console.log("\n group data:", grouped)

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
            {description || 'A beautifully organized archive of captured moments by month.'}
          </p>
        </div>

        <div className='flex flex-wrap gap-8 py-6'>
            {Object.entries(grouped || {}).map(([month, items], index) => (
            <div key={month} className="mb-24">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">{month}</h3>

                <div className="relative rounded-xl flex flex-wrap sm:flex-nowrap gap-x-[-80px] hover:gap-x-4 transition-all duration-500 overflow-x-auto scrollbar-hide pb-4">
                {items.map((img, i) => (
                    <motion.div
                    key={i}
                    className="relative w-[260px] h-[180px] rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105 hover:z-10"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    onClick={() => setSelected(img)}
                    style={{
                        marginLeft: i === 0 ? 0 : -200,
                        marginTop: (i % 5) * 12,
                    }}
                    >
                    <Image
                        src={img.image_url}
                        alt={img.title || `Image ${i}`}
                        fill
                        className="object-cover rounded-xl"
                    />
                    <div className="absolute bottom-0 w-full text-sm bg-gradient-to-t from-black/60 to-transparent text-white px-3 py-2">
                        {img.title || 'Untitled'}
                    </div>
                    </motion.div>
                ))}
                </div>
            </div>
            ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
            >
              <Image
                src={selected?.image_url}
                alt={selected?.title || 'Selected'}
                width={1200}
                height={800}
                className="rounded-xl object-contain w-full shadow-xl"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white/90 text-black px-3 py-1 rounded-full text-sm font-semibold shadow"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
