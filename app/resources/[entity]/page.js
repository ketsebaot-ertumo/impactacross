"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loader from "../../../components/Loader";
import { getAllData } from "../../lib/routes";
import { useParams } from "next/navigation";

export default function Blogs() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const params = useParams();
    const {entity} = params;

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await getAllData(entity, currentPage, pageSize);
                if (response.data?.length) {
                    setResources(response.data);
                    setTotalPages(response.pagination.totalPages);
                } 
            } catch (err) {
                setError("Could not load blog data.");
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, [currentPage, pageSize, totalPages]);

    const handlePagination = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading)
        return (
            <div className="h-[70vh] flex justify-center">
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
                Blogs not found.
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
                        <h1 className="text-4xl font-bold mb-6">❌ Oops!</h1>
                        <p className="text-lg">No Blog Post Found.</p>
                    </main>
                ) : (
                        <div>
                            <div className="max-w-6xl mx-auto w-full pt-10 px-6">
                                <Link
                                    href="/resources"
                                    className="text-green-600 hover:text-green-800 transition text-md font-medium mb-6 inline-block"
                                >
                                    ← Back to Resources
                                </Link>
                            </div>

                            <main className="max-w-6xl mx-auto container px-8 pt-4 pb-20 text-gray-800">
                                <h1 className="text-4xl font-bold text-center">📝 Blog Timeline</h1>
                            </main>
                            <div className="space-y-24 max-w-6xl mx-auto px-8 lg:px-0">
                                {resources.map((blog, index) => (
                                <Link
                                    key={blog.id}
                                    href={`/resources/${blog.name}/${blog.id}`}
                                    className={`relative flex flex-col md:flex-row items-center ${
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } group hover:scale-[1.01] transition-transform`}
                                >
                                    <div className="md:w-1/2 w-full overflow-hidden rounded-3xl shadow-xl relative h-[100px] sm:h-[300px]">
                                    <Image
                                        src={blog.imageURL}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-all duration-300"
                                    />
                                    </div>

                                    <div className="md:w-1/2 w-full mt-8 md:mt-0 md:px-12 text-center md:text-left">
                                        <h2 className="line-clamp-2 text-4xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                                            {blog.title}
                                        </h2>
                                        <p className="text-gray-800 text-lg line-clamp-3">{blog.content}</p>
                                        <div className="inline-block italic text-green-600 text-sm font-medium mt-3 transition-all duration-300 hover:underline hover:text-green-800 hover:pl-1">
                                            Read more &gt;&gt;
                                        </div>
                                        <div className="mt-6">
                                            <span className="inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm">
                                                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                                    year: "numeric", month: "long", day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                ))}
                            </div>

                            {/* Pagination & Controls */}
                            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 border-t border-gray-400 py-8">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handlePagination(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-md font-medium transition ${
                                        currentPage === 1
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-green-600 text-white hover:bg-green-700"
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    <span className="text-gray-700 font-medium">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        onClick={() => handlePagination(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-md font-medium transition ${
                                        currentPage === totalPages
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-green-600 text-white hover:bg-green-700"
                                        }`}
                                    >
                                        Next
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
                                            className="border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        {[5, 10, 25, 50, 100].map((size) => (
                                        <option key={size} value={size}>
                                                {size} posts
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
}
