"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const data = [
    {
      image: "/service1.png",
      title: "Natural Resources Governance",
      description: "Ethiopia&apos;s natural resources, namely oil, gas and minerals, fisheries, and forests, have a potential to bring wealth and stability to the country. The governance of these resources has emerged as one of the defining challenges for 21st century policy development. At abbabor, we recognize that norms, institutions, processes determine how power and responsibilities over natural resources are exercised and how citizens participate in and benefit from the management of natural resources. It is the understanding of these factors and our use of political economy/political ecology approaches that enable us to effectively analyze the underlying challenges of natural resources management and provide tailored solutions to problems.",
      id: "natural-resources-governance"
    },
    {
      image: "/service2.png",
      title: "Climate Change",
      description: "We address the far-reaching impacts of climate change by promoting adaptation and mitigation strategies that prioritize vulnerable populations. Our work includes integrating climate resilience into health, agriculture, and development programs, while advocating for innovative policies and financing to accelerate climate action.",
      id: "climate-change"
    },
    {
      image: "/service3.png",
      title: "Environment and Natural Resources",
      description: "We champion the conservation of biodiversity, sustainable resource management, and ecosystem restoration to safeguard natural capital. By prioritizing climate resilience and adaptive strategies, we aim to mitigate environmental degradation while fostering sustainable livelihoods.",
      id: "environment-natural-resources"
    },
    {
      image: "/service4.png",
      title: "Health Systems Strengthening",
      description: "Resilient health systems are essential to withstand environmental and climate-related shocks. We work to enhance health infrastructure, promote access to quality care, and integrate climate considerations into health planning and services.",
      id: "health-systems-strengthening"
    },
    {
      image: "/service5.png",
      title: "Food Security & Nutrition",
      description: "Addressing hunger and malnutrition through sustainable agricultural practices and diversified food systems, we adopt multi-sectoral approaches that link agriculture, health, and environmental sustainability. Our goal is to ensure equitable access to nutritious food, especially in vulnerable communities.",
      id: "food-security-nutrition"
    },
    {
      image: "/service6.png",
      title: "Water, Sanitation & Hygiene (WASH)",
      description: "By advancing sustainable WASH solutions, we address critical health and environmental challenges. Our efforts focus on ensuring safe water access, improving sanitation, and promoting hygiene practices while integrating these interventions with broader development priorities.",
      id: "water-sanitation-hygiene"
    },
    {
      image: "/service7.png",
      title: "Education",
      description: "We promote climate and environmental education as a critical tool for empowering future generations. By linking education to broader development goals, we ensure young people are equipped with the knowledge and skills to address global challenges and become leaders in sustainable development.",
      id: "education",
    },
];


export default function OurSectorialFocus() {
    const [expanded, setExpanded] = useState({});
  
    const toggleExpand = (id) => {
      setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };
  
    return (
      <section className=" bg-gray-50 text-gray-600 py-12 px-2 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center">Our Sectorial Focus</h2>
          <div className="relative flex items-center justify-center pt-4">
            <div className="w-32 border-t-2 border-gray-300"></div>
          </div>
          <p className="md:leading-relaxed max-w-4xl mx-auto text-center my-6 pb-8 text-lg">
            <i>Our sectoral focus is informed by our professional orientation and experience both in Ethiopia and abroad. We have specialized in the following key development sectors.</i>
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {data.map((item, index) => (
              <motion.div
                key={index}
                id={item.id}
                className={`border border-gray-300 shadow-lg rounded-4xl overflow-hidden p-6 mx-6 md:mx-0 hover:shadow-2xl transition-all duration-300
                  ${index === data.length - 1 && index % 2 === 0 ? "max-w-sm md:col-span-2 lg:col-span-3 md:justify-self-center" : ""}
                `}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: false }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex justify-center">
                  <img src={item.image} alt={item.title} className="rounded-lg"/>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mt-4">{item.title}</h3>
                <p className="mt-2 text-sm">
                  {expanded[item.id]
                    ? item.description
                    : `${item.description.substring(0, 100)}... `}
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expanded[item.id] ? "See Less" : "See More"}
                  </button>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
}  
