'use client';

import { ChevronDown, ChevronUp, Calendar, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllData } from '../lib/routes';
import Loader from '../../components/Loader';

export default function ProjectsAndPartners() {
  const [openIndex, setOpenIndex] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle ] = useState("Projects Overview");
  const [description, setDescription ] = useState( "With our deep industry expertise, multi-disciplinary capabilities and rigorous analysis, we deliver high-quality technical studies, evaluations, and project design services.");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData('projects', currentPage, pageSize);
        if (data) {
          setProjectsData(data?.data);
          setTitle(data?.data?.[0]?.section?.title);
          setDescription(data?.data?.[0]?.section?.description);
          setCurrentPage(data?.pagination?.page);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        // console.error('Failed to load project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  if (loading)
    return (
        <div className="h-screen flex justify-center">
        <Loader className="" />
        </div>
    );

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
  };

  return (
    <section id='projects' className="scroll-mt-24 bg-green-50 text-black">
      <div className="max-w-6xl mx-auto pt-16 px-6 lg:px-0">
        <h2 className="text-4xl font-semibold text-center mb-4 sm:mb-8">{title}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 mb-8 rounded" />
        <div className="mb-6 hidden md:flex pt-2 max-w-4xl mx-auto text-center py-4 text-lg">
          <i>
            {description || `With our deep industry expertise, multi-disciplinary capabilities and rigorous analysis,
            we deliver high-quality technical studies, evaluations, and project design services.`}
          </i>
        </div>
        
        {!projectsData && (<Loader className="h-12 text-green" />)}

        {/* Timeline-style Projects */}
        <div className="space-y-8">
          {projectsData?.map((project, i) => (
            <div
              key={i}
              className="relative border-l-4 border-green-800 pl-6 pb-6 group hover:border-green-800 transition-all"
            >
              <div
                className="absolute left-[-10px] top-1 w-4 h-4 bg-green-800 rounded-full border-2 border-white z-10"
              />
              <button
                onClick={() => toggle(i)}
                className="w-full text-left focus:outline-none"
              >
                <div className="flex justify-between items-center space-x-1">
                  <h3 className="text:xl sm:text-2xl font-semibold line-clamp-2">{project.title}</h3>
                  {openIndex === i ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-green-800"
                  >
                    <div className="flex items-center text-sm mb-1 gap-3">
                      {project?.client && (
                        <span className="flex items-center gap-1 text-xl">
                          <User size={14} /><span className='line-clamp-1'>{project.client}</span>
                        </span>
                      )}

                      {project?.date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {new Date(project.date).toLocaleDateString()}
                        </span>
                      )}
                      
                      {project?.status && (
                        <span
                          className={`inline-block text-xs font-semibold rounded-full px-2 py-1 ${
                            project.status.toLowerCase() === 'completed'
                              ? 'bg-green-700 text-white'
                              : project.status.toLowerCase() === 'ongoing'
                              ? 'bg-yellow-600 text-white'
                              : project.status.toLowerCase() === 'upcoming'
                              ? 'bg-blue-700 text-white'
                              : 'bg-gray-600 text-white'
                          }`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className='text-green-950'>{project.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-14 flex flex-col items-center gap-4 p-8 pt-0 text-lg">
        <div className="flex items-center justify-center gap-3 text-green-800">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-all duration-200 ${
              currentPage === 1
                ? 'border-green-300 cursor-not-allowed'
                : 'border-green-700 hover:bg-green-700 hover:text-white'
            }`}
          >
            Previous
          </button>

          <div className="font-medium">
            Page <span className="font-bold">{currentPage}</span> of {totalPages}
          </div>

          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-all duration-200 ${
              currentPage === totalPages
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-green-700 hover:bg-green-700 hover:text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>


      {/* Marquee scroll animation */}
      <style jsx>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-slow {
          display: flex;
          width: max-content;
          animation: scroll-slow 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
