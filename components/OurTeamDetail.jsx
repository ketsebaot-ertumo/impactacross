'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Email } from '@mui/icons-material';
import { getDataById } from '../app/lib/routes';
import { LoaderCircle } from 'lucide-react';

const image_url = 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1749649749/ImpactAcross/owner/ourTeam_bkkp8t.png';
const teams= [
  {
    id: "1",
    name: "Kassahun K. Suleman(PhD)",
    position: "Founder & CTO",
    email: "kassahunks@impactacross.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    description: "Kassahun has a PhD in Development Studies from University of the Western Cape in South Africa.  With 13+ years of experience working in different countries around the world, he has deep domain expertise in a broad cross section of disciplines ranging from agricultural development and food systems, rural development, natural resources governance, climate change adaptation and rural economy. Having managed and executed large and complex rural development projects in Ethiopia and conducted scientific research in various African countries, he is now proud to consolidate his 13+ years of research and project/program management expertise with that of clients who have the same values and beliefs in evidence-based and high quality solutions.",
    image_url,
  },
  {
    id: "2",
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
    id: "3",
    name: "Zerihun Berhane(PhD)",
    position: "Research Associate",
    email: "team@gmail.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    description: "Zerihun Berhane has a PhD in Local Development and Global Dynamics from the University of Trento, Italy. He has two MA degrees&ndash;one in Globalization and Development from the University of Antwerp, Belgium and another in Development Studies with specialization in Rural livelihoods and Development from Addis Ababa University, Ethiopia. Zerihun has worked in various positions with organizations providing research, training, and capacity building services and undertaking qualitative and quantitative analyses and impact evaluation of programs. He has worked as a consultant in capacity assessment projects, conducted baseline surveys, mid-term and end-term evaluations, and served as a trainer for various organizations. His research areas include climate change adaptation, social protection, and livelihoods systems. So far, he has published six referred journal articles, a working paper, two blogs, several book reviews and technical reports and presented papers in many national and international conferences. Currently, Zerihun is working as an Assistant Professor in the Center for African and Oriental Studies at Addis Ababa University.",
    image_url,
  },
  {
    id: "4",
    name: "Ross Harvey",
    position: "Research Associate",
    image_url,
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    email: "test@impactacross.com",
    description: "Ross graduated from the University of Cape Town (UCT) in 2005 with a Bachelor of Commerce in Philosophy, Politics and Economics, followed by an Honours and MPhil in Public Policy. He is currently pursuing a PhD in Economics at UCT. His research uses game theoretic analysis to explain why Angola and Nigeria diverge institutionally and display different political economy manifestations of the resource curse. From 2010-2011, he lectured in Political Economy at UCT&apos;s Political Studies Department. During 2012, Ross worked as a researcher in Parliament. Since June 2013, he has been a senior researcher with SAIIA&apos;s Governance of Africa&apos;s Resources Programme (GARP) in Cape Town. Ross hopes that his research will shape the institutional elements &ndash; norms, beliefs and rules &ndash; that motivate policymaker behaviour in a direction that benefits ordinary Africans.",
  },
  {
    id: "5",
    name: "Mr. Cyriaque Hakizimana",
    position: "Research Associate",
    image_url,
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    email: "test@impactacross.com",
    description: "Mr. Cyriaque Hakizimana is a researcher and PhD candidate in the Institute for Poverty, Land, and Agrarian Studies (PLAAS) at the University of Western Cape in South Africa. He is currently leading the Southern Africa Regional Hub of the Agricultural Policy Research in Africa (APRA) programme which aims to produce new information and insights into different pathways to agricultural commercialisation in order to assess their impacts and outcomes on rural poverty, women&apos;s and girl&apos;s empowerment and food and nutrition security in Sub-Saharan Africa. He has proven experience in conducting baseline studies, monitoring and evaluation assignments as well as policy and strategy analysis for national and international donors, government agencies and universities across Africa.",
  },
  {
    id: "6",
    name: "Elise van der Mark",
    position: "Research Associate",
    image_url,
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com",
    email: "test@impactacross.com",
    description: "Elise van der Mark is a Dutch anthropologist with a specialisation in Social Development in Sub-Saharan Africa. Elise obtained her Master degree Cum Laude in International Development Studies after her two bachelors in Cultural Anthropology and Visual Marketing. Before being awarded an EU scholarship for her PhD, she was self-employed conducting research, managing projects, and providing copy-writing services in Zimbabwe, South Africa and the Netherlands. She is currently pursuing her PhD at the University of the Western Cape (SA) in conjunction with the VU University Amsterdam (NL). Her focus lies on women empowerment and agency, gender relations, unpaid care work, and disability in poverty contexts. Particularly participatory action research has been at the forefront of all her research as she believes research should always be a vehicle for positive change.",
  },
]


export default function OurTeamDetail({ id }) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await getDataById('teams', id);
        const newData = teams.find((team) => team?.id === id);
        setMember(response || newData);
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-600">
        <LoaderCircle className="animate-spin h-8 w-8 mb-3 text-green-600" />
        <p className="text-base font-medium">Loading team details...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 font-semibold text-2xl">
        <p>Team not found!</p>
      </div>
    );
  }

  return (
    <section className='min-h-screen'>
      <div className="max-w-6xl mx-auto w-full pt-10 px-6">
        <Link
          href="/#teams"
          className="text-green-600 hover:text-green-800 transition text-md font-medium mb-6 inline-block"
        >
          ← Back to Teams
        </Link>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto py-12 px-6 text-gray-700"
      >
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <Image
              src={member?.image_url || image_url}
              alt={member?.name || 'Team Member'}
              width={350}
              height={350}
              className="rounded-3xl shadow-lg object-cover border border-gray-300"
            />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{member.name}</h1>
            <p className="text-lg font-medium text-green-700 mb-4">{member.position}</p>

            <div className="flex gap-4 items-center mb-6">
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <FaLinkedin size={24} />
                </Link>
              )}
              {member.twitter && (
                <Link
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 hover:text-sky-600 transition"
                >
                  <FaTwitter size={24} />
                </Link>
              )}
              {member.email && (
                <Link
                  href={`mailto:${member.email}`}
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <Email />
                </Link>
              )}
            </div>

            <p className="text-base leading-relaxed whitespace-pre-line text-justify italic md:h-[20vh] lg:h-full overflow-y-auto">
              {member?.description}
            </p>
          </div>
        </div>
      </motion.section>
    </section>
  );
}





// "use client";

// import { useParams } from "next/navigation";
// import { notFound } from "next/navigation";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { FaLinkedin, FaTwitter } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { Email } from "@mui/icons-material";
// import { getDataById } from "../lib/routes";


// export default function OurTeamDetail({id}) {
//   const [member, setMember] = useState({});
//   const image_url = "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749649749/ImpactAcross/owner/ourTeam_bkkp8t.png"; 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: response } = await getDataById("teams", id);
//         setMember(response)
//       } catch(error) {
//         // console.error("error occur on getting data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   if (!member) 
//   return(
//     <>
//       <div className="h-[60vh] text-center font-semibold">No Data Found!</div>
//     </>  
//   );
  
//   return (
//     <>
//       <div className="max-w-6xl mx-auto w-full pt-12 px-6">
//         <Link
//           href="/#teams"
//           className="text-green-600 hover:text-green-800 transition text-md font-medium mb-6 inline-block"
//         >
//           ← Back to Teams
//         </Link>
//       </div>

//       {member && (
//         <motion.section
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-6xl mx-auto py-12 pt-4 text-gray-600 px-6"
//         >
//           <div className="grid lg:grid-cols-2 gap-10 items-center">
//             <div className="flex justify-center">
//             <Image
//               src={member?.image_url || image_url}
//               alt={member?.name || "ImapctAcross Team"}
//               width={400}
//               height={400}
//               className="rounded-3xl shadow-xl object-cover"
//             />

            
//               <h1 className="text-4xl font-semibold mb-2">{member.name}</h1>
//               <p className="text-lg font-semibold mb-6 block">
//                 {member.position}
//               </p>

//               <div className="flex items-center gap-4 text-gray-600 mb-6">
//                 {member.linkedin && (
//                   <Link
//                     href={member.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-800 transition"
//                   >
//                     <FaLinkedin size={24} />
//                   </Link>
//                 )}
//                 {member.twitter && (
//                   <Link
//                     href={member.twitter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sky-500 hover:text-sky-600 transition"
//                   >
//                     <FaTwitter size={24} />
//                   </Link>
//                 )}
//                 {member.email && (
//                   <Link
//                     href={`mailto:${member.email}`}
//                     rel="noopener noreferrer"
//                     className="text-slate-500 hover:text-slate-700 transition"
//                   >
//                     <Email size={24}/>
//                   </Link>
//                 )}
//               </div>

//               </div>

//               <p className="leading-relaxed whitespace-pre-line text-justify">
//                 <i>{member?.description}</i>
//               </p>
//             {/* </div> */}
//           </div>
//         </motion.section>
//       )}
//     </>
//   );
// }
