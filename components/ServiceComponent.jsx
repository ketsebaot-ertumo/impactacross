"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, ClipboardCheck, Users } from "lucide-react";
import { BarChart, Search } from "@mui/icons-material";

const services = [
  {
    title: 'Surveys & Statistical Analysis',
    icon: BarChart,
    points: [
      'Design and management of large-scale surveys',
      'Collection of household, economic, and biomedical data',
      'Ethical surveying of vulnerable and hard-to-reach populations',
      'Advanced statistical testing and insightful reporting'
    ]
  },
  {
    title: 'Programme Monitoring & Evaluation',
    icon: ClipboardCheck,
    points: [
      'M&E to drive evidence-based decisions in development',
      'Analysis of programme contexts, mechanisms, and outcomes',
      'Support for public sector service transformation'
    ]
  },
  {
    title: 'Strategy & Programme Planning',
    icon: BookOpen,
    points: [
      'Development of outcome-driven strategies',
      'Design of cross-sectoral solutions to complex problems',
      'Support for effective intervention planning'
    ]
  },
  {
    title: 'Training & Capacity Building',
    icon: Users,
    points: [
      'Innovative and impactful training programs',
      'Tailored solutions for government and NGOs in Ethiopia',
      'Focus on practical learning objectives and results'
    ]
  },
  {
    title: 'Ethnographic & Qualitative Research',
    icon: Search,
    points: [
      'In-depth qualitative and ethnographic studies',
      'Exploration of motivations, meanings, and needs',
      'Complement survey data for comprehensive insights'
    ]
  }
];

export default function ServicesComponent() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection((prev) => (prev === index ? null : index));
  };

  return (
    <div className="pt-12 text-gray-700 bg-gray-50">
      <div className="max-w-6xl mx-auto py-6 px-8 lg:px-0">
        <h2 className="text-4xl font-semibold mb-8">Services</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div>
            <p className="mb-6">
              <i>ADC provides a full spectrum of consulting, research and advisory services for civil societies, the private sector, donor agencies and government departments. Our expertise and knowledge are wide reaching and we strive to develop innovative and strategic solutions to achieve the maximum value for our clients.</i>
            </p>
            {services?.map((service, index) => (
              <div key={index} className="mb-4 border-b pb-2">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex justify-between items-center text-lg font-semibold focus:outline-none"
                >
                  {service.title}
                  {openSection === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openSection === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-gray-600"
                  >
                    <ul className="list-disc pl-10 text-left">
                      {service?.points?.map((text, idx) => (
                        <li key={idx} className="mt-1">{text}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          <div>
            <img 
              src="https://img.freepik.com/premium-photo/male-hands-typing-computer-keyboard-service-concept_220873-10436.jpg?semt=ais_hybrid"
              alt="Services"
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
