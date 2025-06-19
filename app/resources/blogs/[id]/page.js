"use client";

import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import Loader from "../../../../components/Loader";
import { getSingleBlogPost } from "../../../lib/routes";
import toast from "react-hot-toast";

export default function BlogDetails() {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const loadBlog = async () => {
        try {
            const blog = await getSingleBlogPost(id);
            if (blog) {
                setBlog(blog);
            } else {
                return notFound();
            }
        } catch (err) {
            toast.error("This blog post couldn't be loaded.");
            // console.error("Blog error:", err);            
            setError("Could not load blog data.");
        } finally {
            setLoading(false);
        }
        };

        loadBlog();
    }, [id]);

    if(loading) return <div className="h-screen flex justify-center"><Loader /></div>;

    return (
        <>
            <Header />

            {(!blog || !blog?.id) ? (
                <main className="container max-w-6xl mx-auto px-6 py-20 text-center min-h-[70vh] flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">❌ Oops!</h1>
                    <p className="text-gray-600 text-lg">"No Blog Post Found.</p>
                </main>
            ) :(
                <div>
                    <section className="relative h-[40vh] lg:h-[60vh] w-full flex items-center justify-center bg-green-950 overflow-hidden">
                        <Image
                            src={blog.imageURL}
                            alt={blog.title}
                            fill
                            className="object-cover opacity-30 blur-sm"
                        />
                        <div className="z-10 text-center px-6">
                            <h1 className="text-4xl md:text-5xl font-semibold text-white drop-shadow-lg max-w-4xl mx-auto">{blog.title}</h1>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto -mt-20 px-4 sm:px-6 lg:px-8 relative z-20 p-8 px-0">
                        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 md:p-12 md:mb-5">
                            <div className="relative w-full h-60 md:h-80 lg:h-[28rem] rounded-xl overflow-hidden mb-8">
                                <Image
                                    src={blog.imageURL}
                                    alt={blog.title}
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>

                            <article className="prose lg:prose-xl prose-gray max-w-none text-gray-800">
                                <p>{blog.content}</p>
                            </article>
                            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 mt-4 rounded-full text-sm">
                                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric",
                                })}
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            )}
        </>
    );
}
