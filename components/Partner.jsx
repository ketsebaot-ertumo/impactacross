'use client';

import { useEffect, useRef, useState } from 'react';
import { getAllData } from '../app/lib/routes';
import Loader from './Loader';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Partners() {
  const defaultPartner = {
    title: 'Partners',
    description:
      'At ImpactAcross, we believe sustainable impact comes from strong, collaborative partnerships that unite diverse expertise and perspectives. By working with global and local organizations, we co-create data-driven solutions that empower communities and drive lasting, inclusive development.',
    partners: [
      {
        name: "EOC-DICAC",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820477/ImpactAcross/partners/download_ol0tvw.jpg",
        link: "https://impactacross.com"
      },
      {
        name: "EECMY DASSC",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820525/ImpactAcross/partners/download_cafjt9.jpg",
        link: "https://impactacross.com"
      },
      {
        name: "NABU ",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820579/ImpactAcross/partners/download_ef7ugc.jpg",
        link: "https://impactacross.com"
      },
      {
        name: "CARE",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820606/ImpactAcross/partners/download_w7dhej.png",
        link: "https://impactacross.com"
      },
      {
        name: "PAPDA",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820713/ImpactAcross/partners/download_ujhzcj.jpg",
        link: "https://impactacross.com"
      },
      {
        name: "Wako Gutu Foundation",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820716/ImpactAcross/partners/download_gzj5oj.png",
        link: "https://impactacross.com"
      },
      {
        name: "Bread for the World/PADD",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820736/ImpactAcross/partners/download_vpcqjb.png",
        link: "https://impactacross.com"
      },
      {
        name: "David and Lucile Packard Foundation",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820833/ImpactAcross/partners/download_ofqstg.png",
        link: "https://impactacross.com"
      },
      {
        name: "BBC Media Action",
        logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749820837/ImpactAcross/partners/download_zesbir.png",
        link: "https://impactacross.com"
      },
    ],
  };
  const [partners, setPartners] = useState(defaultPartner);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // State to control arrow visibility
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update arrow visibility based on scroll position
  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    // subtract 1 to handle fractional pixel issues
  };

  // Add scroll listener to update arrow visibility on user scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [partners.partners]);

  // Auto-rotate partners for small screens
  useEffect(() => {
    if (partners.partners?.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % partners.partners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [partners.partners]);

  // Fetch partners from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await getAllData('sections/values/partner');
        const [partnerData] = response;
        if (partnerData) setPartners(partnerData);
      } catch (err) {
        // console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="bg-gray-100 text-gray-600 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center">{partners.title}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 rounded" />
        <p className="text-lg text-center max-w-4xl mx-auto my-6 italic hidden sm:block">
          <i>{partners.description}</i>
        </p>

        {loading && !partners?.partners?.length && <Loader className="h-12 text-green" />}

        {partners?.partners?.length === 0 && !loading && (
          <div className="py-20 text-center flex items-center justify-center text-white text-2xl text-gray-800">
            No Data Found!
          </div>
        )}

        {/* Mobile view - Animated carousel */}
        <div className="sm:hidden relative w-full max-w-base h-52 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full bg-white shadow-sm rounded-3xl p-6 text-center flex flex-col justify-center items-center"
            >
              <a
                href={partners.partners[activeIndex]?.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center no-underline hover:underline"
              >
                {partners.partners[activeIndex]?.logo_url && (
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src={partners.partners[activeIndex].logo_url}
                      alt={partners.partners[activeIndex].name || 'Partner logo'}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
                  {partners.partners[activeIndex]?.name}
                </h2>
              </a>
              <p className="text-gray-600 line-clamp-3">
                {partners.partners[activeIndex]?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop view - Horizontal scroll with arrows */}
        <div className="hidden sm:block relative">
          {canScrollLeft && (
            <button
              onClick={() => {
                scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-green-800 hover:bg-green-700 text-white p-2 rounded-full shadow-md"
              aria-label="Scroll Left"
            >
              ←
            </button>
          )}

          <div
            ref={scrollRef}
            className="overflow-x-auto flex py-8 gap-6 scrollbar-hide scroll-smooth px-10"
          >
            {partners.partners?.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center"
              >
                <a
                  href={partner.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex flex-col items-center no-underline hover:underline"
                >
                  {partner?.logo_url && (
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={partner.logo_url}
                        alt={partner.name || 'Partner logo'}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 text-center line-clamp-1">
                    {partner.name}
                  </h3>
                </a>
                <p className="text-gray-600 text-center text-sm line-clamp-3 mt-2">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => {
                scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-green-800 hover:bg-green-700 text-white p-2 rounded-full shadow-md"
              aria-label="Scroll Right"
            >
              →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
