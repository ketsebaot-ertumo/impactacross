"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getDataById } from "../../lib/routes";
import { Loader } from "lucide-react";


export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await getDataById("services", id);
        setService(data);
      } catch (error) {
        // console.error("Error fetching service by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading service... <Loader className="ml-2 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        Service not found.
      </div>
    );
  }

  return (
    <>
      <section className="min-h-[60mvh] bg-white text-gray-800 px-4 py-12 md:py-20 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <Link
            href="/#services"
            className="text-green-600 text-sm hover:underline mb-8 inline-block"
          >
            ← Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left"
          >
            <div className="max-w-md w-full">
              <Image
                src={service.image_url || service.image || "/default-service.jpg"}
                alt={service.title}
                width={600}
                height={400}
                className="rounded-xl shadow-md object-cover w-full"
              />
            </div>

            <div className="max-w-xl w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {service.content}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
