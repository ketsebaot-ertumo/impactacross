'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllData } from '../app/lib/routes';
import Link from 'next/link';

const valuesData = [
    {
        title: "Mission",
        description:
        "Our core mission is to provide high quality <b>consultancy</b>, <b>training</b> and <b>research services</b> to our clients so as to help them make distinct and significant improvements in their programmes and projects.",
    },
    {
        title: "Vision",
        description:
        "Our vision is to become a <b>leading</b>, <b>preferred</b> and <b>trusted</b> development consulting firm in East and Horn of Africa. We use the most up-to-date research and evaluation designs and methods to inform development strategy in the region.",
    },
    {
        title: "Core Values",
        description:
        "Our core values of <b>Integrity</b>, <b>Respect</b>, <b>Excellence</b>, <b>Innovation</b>, and <b>Independence</b> guide us in delivering ethical, high-quality, and impactful solutions with creativity and impartiality.",
    },
];

export default function ValuesSection() {
  const [values, setValues] = useState(valuesData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllData('sections/values/value');
        // const [data] = response;
        if (data?.valuesData) setValues(data);
      } catch (error) {
        // console.error('Failed to load values:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8" id="values">
        <div className="max-w-6xl mx-auto w-full px-6">
            <Link
                href="/"
                className="text-green-600 hover:text-green-800 transition text-md font-medium mb-6 inline-block"
            >
                ← Back to Home
            </Link>
        </div>

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Our Values
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          We’re guided by principles that shape our identity and work.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {values.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 hover:bg-gray-100 p-6 rounded-2xl shadow-md transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              {item.title}
            </h3>
            <p
              className="text-gray-700 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
