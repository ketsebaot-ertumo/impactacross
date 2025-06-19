"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { getDataById } from "../app/lib/routes";
import { formatDate } from "../utils/utils";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await getDataById("projects", id);
        setProject(data);
      } catch (error) {
        // console.error("Error fetching project by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-600">
        <LoaderCircle className="animate-spin h-8 w-8 mb-3 text-green-600" />
        <p className="text-base font-medium">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-semibold text-xl">
        Project not found.
      </div>
    );
  }

  return (
    <>
      <section className="min-h-[60vh] bg-white px-4 py-16 text-gray-800">
        <div className="max-w-4xl mx-auto w-full">
          <Link
            href="/#projects"
            className="text-green-600 hover:text-green-800 transition text-sm font-medium mb-6 inline-block"
          >
            ← Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-xl shadow-md p-6 md:p-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              {project.title}
            </h1>

            <p className="text-xl text-green-700 font-semibold text-center mb-2">
              {project.client}
            </p>

            <p className="text-md text-gray-700 leading-relaxed whitespace-pre-line text-center mb-6">
              {project.description}
            </p>

            <p className="text-sm text-gray-500 text-center">
              {formatDate(project?.date)}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
