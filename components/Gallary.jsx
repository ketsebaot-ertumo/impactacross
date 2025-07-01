
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllData } from '../app/lib/routes';
import dayjs from 'dayjs';
import Loader from './Loader';

const defautData = [
  {
    title: 'Project Planning Workshop',
    description: 'Images from our workshop on effective project planning.',
    media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750154332/ImpactAcross/images/xn7sv2oliyhvwlzdtnfd.jpg',
    media_type: 'image',
    category: 'Workshops',
    createdAt: new Date('2025-06-15T10:00:00Z'),
    updatedAt: new Date('2025-06-15T10:00:00Z')
  },
  {
      title: 'Community Engagement Event',
      description: 'Snapshots from our community engagement event.',
      media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750155484/ImpactAcross/images/wpcammpxjonbhjdd2cay.jpg',
      media_type: 'image',
      category: 'Events',
      createdAt: new Date('2025-06-15T10:00:00Z'),
      updatedAt: new Date('2025-06-15T10:00:00Z')
  },
  {
      title: 'Consultancy Meeting',
      description: 'Photos from a consultancy meeting with stakeholders.',
      media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750155484/ImpactAcross/images/wpcammpxjonbhjdd2cay.jpg',
      media_type: 'image',
      category: 'Meetings',
      createdAt: new Date('2025-06-15T10:00:00Z'),
      updatedAt: new Date('2025-06-15T10:00:00Z')
  },
  {
      title: 'Annual Review Conference',
      description: 'Highlights from our annual review conference.',
      media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg',
      media_type: 'image',
      category: 'Conferences',
      createdAt: new Date('2025-05-05T11:00:00Z'),
      updatedAt: new Date('2025-05-05T10:00:00Z'),
  },
  {
      title: 'Training Session on Leadership',
      description: 'Photos from our leadership training session.',
      media_url: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg',
      media_type: 'image',
      category: 'Training',
      createdAt: new Date('2025-05-12T13:45:00Z'),
      updatedAt: new Date('2025-05-12T10:00:00Z'),
  },
  {
      title: 'Volunteer Appreciation Day',
      description: 'Moments from our volunteer appreciation day.',
      media_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750097294/ImpactAcross/images/photo_5944760772829759996_x_omvwji.jpg",
      media_type: 'image',
      category: 'Celebrations',
      createdAt: new Date('2025-04-18T16:20:00Z'),
      updatedAt: new Date('2025-04-18T10:00:00Z'),
  },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(defautData);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(18);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllData('gallery', currentPage, pageSize);
        if (res?.data) {
          setData(res.data);
          setDescription(res.data?.[0]?.section?.description || '');
          setTotal(res.pagination?.total);
          setTotalPages(res.pagination?.totalPages);
        }
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, pageSize, total]);

  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
  };

  if(loading) 
    return (
        <div className="h-[80vh] flex justify-center">
            <Loader className="" />
        </div>
    )

  if(!data) return <p className="h-16 text-emerald-500 mx-auto">No data Found!</p>

  const grouped = data?.reduce((acc, item) => {
    const month = dayjs(item.updatedAt).format('MMMM YYYY');
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
  }, {});

  function getYouTubeEmbedUrl(url) {
    let videoId = '';
  
    try {
      if (url.includes('youtube.com')) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v');
      } else if (url.includes('youtu.be')) {
        videoId = url.split('/').pop();
      }
  
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}`;
      }
    } catch (e) {
      console.error('Invalid YouTube URL:', url);
    }
  
    return '';
  }
  

  return (
    <section className="bg-gradient-to-br from-white to-gray-100 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-4">
            <div className="text-center mb-6 sm:mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Gallery</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
                    {description || 'A beautifully organized archive of captured moments by month.'}
                </p>
            </div>

            {/* <div className='flex flex-wrap sm:gap-8 pt-6'> */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 pt-6'>
                {Object.entries(grouped || {}).reverse().map(([month, items], index) => (
                <div key={month} className="mb-2 sm:mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">{month}</h3>

                    <div className="relative rounded-xl flex gap-x-[-60px] sm:gap-x-[-80px] hover:gap-x-4 transition-all duration-500 overflow-x-auto scrollbar-hide pb-4">
                    {items.reverse().map((img, i) => (
                        <motion.div
                          key={i}
                          className="relative w-[240px] sm:w-[260px] h-[180px] rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105 hover:z-10"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setSelected(img)}
                          style={{
                              marginLeft: i === 0 ? 0 : -200,
                              marginTop: (i % 5) * 12,
                          }}
                        >
                          {img.media_type === 'video' ? (
                             img.media_url.includes('youtube.com') || img.media_url.includes('youtu.be') ? (
                              <iframe
                                src={getYouTubeEmbedUrl(img.media_url)}
                                className="w-full h-full rounded-xl pointer-events-none"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                src={img.media_url}
                                controls
                                className="w-full h-full object-cover rounded-xl pointer-events-none"
                              />
                            )
                          ) : (
                            <Image
                              src={img.media_url}
                              alt={img.title || `Image ${i}`}
                              fill
                              sizes="(max-width: 640px) 100vw, 260px"
                              className="object-cover rounded-xl"
                            />
                          )}

                          <div className="absolute bottom-0 w-full text-sm bg-gradient-to-t from-black/60 to-transparent text-white px-3 py-2">
                              {img.title || 'Untitled'}
                          </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
                ))}
            </div>

            {/* Pagination & Controls */}
            {data && data?.length && (
                <div className="flex items-center justify-center space-x-2 mx-auto">
                    <button
                        onClick={() => handlePagination(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md font-medium transition ${
                        currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePagination(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md font-medium transition ${
                        currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}

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
              {/* <Image
                src={selected?.image_url}
                alt={selected?.title || 'Selected'}
                width={1200}
                height={800}
                className="rounded-xl object-contain w-full shadow-xl"
              /> */}
              <div className="relative w-full h-full max-h-[90vh] max-w-4xl mx-auto">
                {selected?.media_type === 'image' ? (
                  <Image
                    src={selected.media_url}
                    alt={selected.title || 'Selected'}
                    width={1200}
                    height={800}
                    className="rounded-xl object-contain w-full h-auto shadow-xl"
                  />
                ) : selected?.media_type === 'video' ? (
                  selected.media_url.includes('youtube.com') || selected.media_url.includes('youtu.be') ? (
                    <iframe
                      src={getYouTubeEmbedUrl(selected.media_url)}
                      className="w-full rounded-xl"
                      style={{ aspectRatio: '16/9' }}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={selected.media_url}
                      controls
                      autoPlay
                      className="rounded-xl w-full h-auto max-h-[90vh] shadow-xl"
                    />
                  )
                ) : null}
              </div>

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
