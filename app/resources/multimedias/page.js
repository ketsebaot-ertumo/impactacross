"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { getAllMultimedias } from "../../lib/routes";
import toast from "react-hot-toast";

export default function Publications() {

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(3);

    useEffect(() => {
      const loadMultimedias = async () => {
        try {
            const response = await getAllMultimedias(currentPage, pageSize);
          
            if (response.data?.length) {
                setResources(response.data);
                setTotalPages(response.pagination.totalPages);
                setTotal(response.pagination.total);
                setCurrentPage(response.pagination.page);
            }
        } catch (err) {
            toast.error('Could Not Load Multimedia Post Data.');
            // console.error("Could not load multimedia data:", + err);
            setError("Could not load multimedia data.");
        } finally {
          setLoading(false);
        }
      };
      loadMultimedias();
    }, [currentPage, pageSize]);

    const handlePagination = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
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
                Multimedias not found.
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                resources.length === 0 ? (
                    <main className="container max-w-6xl mx-auto px-6 py-12 text-center text-gray-500 py-36">
                        <h1 className="text-4xl font-bold mb-6">🎥 Multimedia Posts</h1>
                        <p className="text-lg">No Multimedia Post Found.</p>
                    </main>
                ) : (
                    <div>
                        <main className="max-w-6xl mx-auto container py-12 text-gray-800  px-8 lg:px-0">
                            <h1 className="text-4xl font-bold text-center">🎥 Multimedia Posts</h1>
                        </main>
                        
                        <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 lg:px-0">
                            {resources.map((item) => (
                                <Link key={item.id} href={`/resources/${item.name}/${item.id}`} passHref>
                                    <div className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer">
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <Image
                                                src={item.mediaURL}
                                                alt={item.title}
                                                fill
                                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2 text-white text-sm">
                                                {new Date(item.publishedAt).toLocaleDateString("en-US", {
                                                    year: "numeric", month: "long", day: "numeric",
                                                })}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 space-y-3">
                                            <h3 className="line-clamp-1 text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">{item.content}</p>
                                            <div className="inline-block italic text-green-600 text-sm font-medium mt-3 transition-all duration-300 hover:underline hover:text-green-800 hover:pl-1">
                                                Read more &gt;&gt;
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 border-t p-8 lg:px-0">
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
                    </div>
                )
            )}
        </>
    );
};
