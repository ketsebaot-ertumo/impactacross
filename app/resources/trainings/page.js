"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";
import { getAllTrainings } from "../../lib/routes";

export default function Trainings() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const response = await getAllTrainings(currentPage, pageSize);
        if (response.data?.length) {
          setResources(response.data);
          setTotalPages(response.pagination.totalPages);
          setCurrentPage(response.pagination.page);
        }
      } catch (err) {
        toast.error("Could not load training posts.");
        setError("Error loading data.");
      } finally {
        setLoading(false);
      }
    };
    loadTrainings();
  }, [currentPage, pageSize]);

  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading)
    return (
        <div className="h-screen flex justify-center">
        <Loader />
        </div>
    );

  if(error){
    return (
        <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">
            Unable to fetch data.
        </div>
    );
  }

  if(!resources){
      return (
          <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
            Trainings not found.
          </div>
      );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="max-w-6xl mx-auto py-16">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">🎓 Training Programs</h1>
            <p className="text-gray-600 text-base">Explore our latest and upcoming training opportunities.</p>
          </section>

          {resources.length === 0 ? (
            <div className="text-center text-gray-500 py-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-red-500 mb-4">❌ Oops!</h2>
                <h2 className="text-lg font-semibold">No training posts available.</h2>
            </div>
          ) : (
            <>
                <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {resources.map((item) => (
                    <Link key={item.id} href={`/resources/${item.name}/${item.id}`} passHref>
                        <div className="group bg-white border rounded-xl shadow hover:shadow-md transition-all cursor-pointer overflow-hidden">
                        <div className="relative h-52 w-full">
                            <Image
                            src={item.imageURL || "/placeholder.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                            {item.trainingType}
                            </span>
                        </div>

                        <div className="p-5">
                            <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600">
                            {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3">{item.content}</p>

                            <div className="mt-4 text-xs text-gray-500 flex items-center justify-between">
                            <span>
                                📅{" "}
                                {new Date(item.startDate).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric",
                                })} -{" "}
                                {new Date(item.endDate).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric",
                                })}
                            </span>
                            <span>{item.durationHours || "?"} hrs</span>
                            </div>

                            <div className="inline-block italic text-green-600 text-sm font-medium mt-3 transition-all duration-300 hover:underline hover:text-green-800 hover:pl-1">
                                Read more &gt;&gt;
                            </div>
                        </div>
                        </div>
                    </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 border-t pt-8">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handlePagination(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                        >
                            ← Previous
                        </button>

                        <span className="text-sm text-gray-700 font-medium">
                            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                        </span>

                        <button
                            onClick={() => handlePagination(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-green-800 text-white hover:bg-green-500"
                            }`}
                        >
                            Next →
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="pageSize" className="text-sm text-gray-700 font-medium">
                            Posts per page:
                        </label>
                        <select
                            id="pageSize"
                            value={pageSize}
                            onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                            }}
                            className="border rounded px-2 py-1 text-sm text-gray-400"
                        >
                            {[2, 5, 10, 25].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                            ))}
                        </select>
                    </div>
                </div>
                
            </>
          )}
        </main>
      )}
    </>
  );
}
