'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaFacebook, FaXTwitter, FaGlobe } from 'react-icons/fa6';
import { getAllData } from '../app/lib/routes';
import Loader from './Loader';
import { CropLandscapeOutlined, Email, More } from '@mui/icons-material';

const image_url = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749649749/ImpactAcross/owner/ourTeam_bkkp8t.png";
const founder_image_url= "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750181190/ImpactAcross/images/WhatsApp_Image_2025-06-17_at_8.12.33_PM_jgj4wi.jpg";
const defaultData = [
  {
    id: '1',
    name: "Kassahun K. Suleman(PhD)",
    position: "Founder & CEO",
    email: "Kassahun.kelifa@impactacross.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    image_url: founder_image_url,
    section: {
      description: "ImpactAcross is powered by a passionate, diverse team dedicated to driving data-driven change across key development sectors. We combine local knowledge with global expertise to deliver innovative, impactful solutions grounded in integrity and partnership."
    }
  },
  {
    id: '2',
    name: "Mr. Abraham Getachew",
    position: "Operation Manager",
    email: "abrahamg@impactacross.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    description: 
    "Mr. Abraham has more than 12 years of experience as organizational development expert, leadership and management advisor, country director for international organizations and project manager & coordinator for local organizations. Abraham is a great trainer, inspirational speaker, and strategist for both community and faith-based organizations in Ethiopia. With his leadership expertise, he has trained and inspired thousands across the country, initiated regional networks, and started indigenous business and ministry organizations. He&apos;s proven expertise in assessing the institutional and technical capacity of organizations, identifying gaps, and elevating the capacity of organizations in Ethiopia. Moreover, Mr. Abraham is known for both his expertise and passion of generously empowering people and organizations so that they may serve with excellence in their spheres of influence.",
    image_url,
  },
  {
    id: '3',
    name: "Zerihun Berhane(PhD)",
    position: "Research Associate",
    email: "team@gmail.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    description: "Zerihun Berhane has a PhD in Local Development and Global Dynamics from the University of Trento, Italy. He has two MA degrees&ndash;one in Globalization and Development from the University of Antwerp, Belgium and another in Development Studies with specialization in Rural livelihoods and Development from Addis Ababa University, Ethiopia. Zerihun has worked in various positions with organizations providing research, training, and capacity building services and undertaking qualitative and quantitative analyses and impact evaluation of programs. He has worked as a consultant in capacity assessment projects, conducted baseline surveys, mid-term and end-term evaluations, and served as a trainer for various organizations. His research areas include climate change adaptation, social protection, and livelihoods systems. So far, he has published six referred journal articles, a working paper, two blogs, several book reviews and technical reports and presented papers in many national and international conferences. Currently, Zerihun is working as an Assistant Professor in the Center for African and Oriental Studies at Addis Ababa University.",
    image_url,
  },
  {
    id: '4',
    name: "Ross Harvey",
    position: "Research Associate",
    image_url,
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    email: "test@impactacross.com",
    description: "Ross graduated from the University of Cape Town (UCT) in 2005 with a Bachelor of Commerce in Philosophy, Politics and Economics, followed by an Honours and MPhil in Public Policy. He is currently pursuing a PhD in Economics at UCT. His research uses game theoretic analysis to explain why Angola and Nigeria diverge institutionally and display different political economy manifestations of the resource curse. From 2010-2011, he lectured in Political Economy at UCT&apos;s Political Studies Department. During 2012, Ross worked as a researcher in Parliament. Since June 2013, he has been a senior researcher with SAIIA&apos;s Governance of Africa&apos;s Resources Programme (GARP) in Cape Town. Ross hopes that his research will shape the institutional elements &ndash; norms, beliefs and rules &ndash; that motivate policymaker behaviour in a direction that benefits ordinary Africans.",
  },
  {
    id: '5',
    name: "Mr. Cyriaque Hakizimana",
    position: "Research Associate",
    image_url,
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    email: "test@impactacross.com",
    description: "Mr. Cyriaque Hakizimana is a researcher and PhD candidate in the Institute for Poverty, Land, and Agrarian Studies (PLAAS) at the University of Western Cape in South Africa. He is currently leading the Southern Africa Regional Hub of the Agricultural Policy Research in Africa (APRA) programme which aims to produce new information and insights into different pathways to agricultural commercialisation in order to assess their impacts and outcomes on rural poverty, women&apos;s and girl&apos;s empowerment and food and nutrition security in Sub-Saharan Africa. He has proven experience in conducting baseline studies, monitoring and evaluation assignments as well as policy and strategy analysis for national and international donors, government agencies and universities across Africa.",
  },
  // {
  //   id: '6',
  //   name: "Elise van der Mark",
  //   position: "Research Associate",
  //   image_url,
  //   linkedin: "https://linkedin.com/in/",
  //   facebook: "https://facebook.com",
  //   email: "test@impactacross.com",
  //   description: "Elise van der Mark is a Dutch anthropologist with a specialisation in Social Development in Sub-Saharan Africa. Elise obtained her Master degree Cum Laude in International Development Studies after her two bachelors in Cultural Anthropology and Visual Marketing. Before being awarded an EU scholarship for her PhD, she was self-employed conducting research, managing projects, and providing copy-writing services in Zimbabwe, South Africa and the Netherlands. She is currently pursuing her PhD at the University of the Western Cape (SA) in conjunction with the VU University Amsterdam (NL). Her focus lies on women empowerment and agency, gender relations, unpaid care work, and disability in poverty contexts. Particularly participatory action research has been at the forefront of all her research as she believes research should always be a vehicle for positive change.",
  // },
];

export default function OurTeam() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState(defaultData?.[0]?.section?.description);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData('teams', currentPage, pageSize);
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
  }, [currentPage, pageSize, total]);

   const handleSeeMore = (limit) => {
        setPageSize(limit);
   };

  const founder = data?.find((member) => member?.position?.toLowerCase()?.includes('founder')) || defaultData.find((member) => member?.position?.toLowerCase()?.includes('founder'));
  const others = data?.filter((member) => !member?.position?.toLowerCase()?.includes('founder')) || defaultData.filter((member) => !member?.position?.toLowerCase()?.includes('founder'));

  return (
    <section id="teams" className="scroll-mt-24 py-16 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 pr-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Meet Our Team
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-800 mx-auto my-4 rounded" />

          <p className="text-center max-w-4xl mx-auto text-lg text-lg italic px-6">
            {description || ""}
          </p>
        </motion.div>

        {!data && (
          loading ? (
            <div className="h-16 flex justify-center">
            <Loader className="" />
            </div>
          ) : (
            <p className="h-16 text-emerald-500 mx-auto">No data Found!</p>
          )
        )}

        {/* Founder at center */}
        {founder && (
          <div className="flex justify-center mb-6 shadow-lg sm:shadow-none rounded-4xl">
              {/* <Link 
                href={`/team-detail/${founder?.id}`}
              > */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className=" rounded-4xl p-6 w-76 sm:w-82 text-center"
                >
                  <Link 
                    href={`/team-detail/${founder?.id}`}
                  >
                    <Image
                      src={founder.image_url || founder_image_url}
                      alt={founder.name || "Founder Profile"}
                      width={120}
                      height={120}
                      className="w-60 h-80 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{founder.name}</h3>
                    <p className="text-sm text-emerald-600">{founder.position}</p>
                  </Link>
                  <div className="flex justify-center gap-3 mt-3" onClick={(e) => e.stopPropagation()}>
                    <Link href={founder.linkedin} className='cursor-pointer'>
                      <FaLinkedin className="text-blue-600 text-xl hover:text-blue-800" />
                    </Link>
                    <Link href={founder.facebook}>
                      <FaFacebook className="text-blue-500 text-xl hover:text-blue-700" />
                    </Link>
                    {founder?.email && (
                        <a
                          href={`mailto:${founder?.email}`}
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 transition mt-[-2px]"
                        >
                          <Email />
                        </a>
                    )}
                  </div>
                </motion.div>
              {/* </Link>  */}
          </div>
        )}

        {/* Grid of other team members */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {others.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="w-76 xl:w-64 mx-auto rounded-2xl p-6 text-center transition-shadow duration-300  shadow-lg rounded-4xl"
                >
                  <Link 
                    key={idx}
                    href={`/team-detail/${member?.id}`} 
                  >
                    <Image
                      src={member.image_url || image_url}
                      alt={member.name || "Team Profile"}
                      width={100}
                      height={100}
                      className="w-60 h-60 sm:h-50 rounded-full mx-auto"
                    />
                    <h4 className="text-lg font-medium text-gray-700">{member.name}</h4>
                    <p className="text-sm text-emerald-600">{member.position}</p>
                  </Link>

                  <div className="flex justify-center gap-3 mt-3" onClick={(e) => e.stopPropagation()}>
                    <Link href={member.linkedin}>
                      <FaLinkedin className="text-blue-600 text-xl hover:text-blue-800" />
                    </Link>
                    <Link href={member.facebook}>
                      <FaFacebook className="text-blue-500 text-xl hover:text-blue-700" />
                    </Link>
                    {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 transition mt-[-2px]"
                        >
                          <Email />
                        </a>
                    )}
                  </div>
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

          {/* {pageSize > 5 && (
            <button 
              onClick={() => handleSeeMore(pageSize - 5)} 
              className='cursor-pointer text-gray-800 flex justify-center text-md shadow-lg border border-green-800 p-4 mt-8 rounded-lg max-w-2xl mx-auto'>
                See Less to go Back?
            </button>
          )} */}
        </div>
      </div>
    </section>
  );
}
