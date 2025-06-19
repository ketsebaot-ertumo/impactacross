"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loader from "../../../../components/Loader";
import { getSingleMultimediaPost } from "../../../lib/routes";

export default function PublicationDetail() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const latestPost = await getSingleMultimediaPost(id);
        if (latestPost) {
          setPost( latestPost );
        }
      } catch (err) {
        toast.error('Could Not Load Multimedia PostData.');
        // console.error("Could not load multimedia post data",err);
        setError("Could not load multimedia post data.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

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

  if(!post){
      return (
          <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
              Multimedias not found.
          </div>
      );
  }

  return (
    <>
        {(!post || !post?.id) ? (
            <main className="container max-w-6xl mx-auto px-6 py-20 text-center min-h-[70vh] flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">❌ Oops!</h1>
                <p className="text-gray-600 text-lg">"No Multimedia Post Found.</p>
            </main>
        ) :(
            <div>
                <section className="relative h-[45vh] lg:h-[60vh] w-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={post.mediaURL}
                      alt={post.title}
                      fill
                      className="object-cover brightness-[0.5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    <div className="z-20 text-center px-6">
                      <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-5xl font-bold drop-shadow-lg max-w-4xl mx-auto">
                          {post.title}
                      </h1>
                      <p className="mt-4 text-gray-300 text-sm">
                          {post?.publishedAt &&
                            new Date(post.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric", month: "long", day: "numeric",}
                          )}
                      </p>
                    </div>
                </section>

                {/* Content Card with Glass Effect */}
                <section className="max-w-5xl mx-auto -mt-40 lg:-mt-20 p-8 relative z-20">
                  <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-6 sm:p-10 lg:p-14 transition-all duration-300">
                    <div className="relative w-full h-60 md:h-80 lg:h-[28rem] mb-10 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={post.mediaURL}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                    </div>
                    <article className="prose prose-lg md:prose-xl prose-gray max-w-none text-gray-800">
                        <p>{post.content}</p>
                    </article>
                  </div>
                </section>
            </div>
        )}
    </>
  );
}