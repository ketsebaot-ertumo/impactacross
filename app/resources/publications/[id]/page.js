// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import Loader from "../../../../components/Loader";
// import { Download } from "lucide-react";
// import { getDataById } from "../../../lib/routes";


// export default function PublicationDetail() {
//   const [post, setPost] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const loadPost = async () => {
//       try {
//         const {data} = await getDataById("publications", id);
//         if (data) {
//           setPost( data );
//         }
//       } catch (err) {
//         setError("Could not load publication data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPost();
//   }, [id]);

//   if (loading)
//       return (
//           <div className="h-screen flex justify-center">
//             <Loader />
//           </div>
//       );
  
//     if(error){
//         return (
//             <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">
//                 Unable to fetch data.
//             </div>
//         );
//     }
  
//     if(!post){
//         return (
//             <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
//               <h1 className="text-4xl font-bold text-red-500 mb-4">❌ Oops!</h1>
//               <p className="text-gray-600 text-lg">"No Publication Post Found.</p>
//             </div>
//         );
//     }

//   return (
//     <>
//             <div>
//                 <section className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full flex items-center justify-center overflow-hidden">
//                     <Image
//                       src={post.imageURL}
//                       alt={post.title}
//                       fill
//                       className="object-cover brightness-[0.5]"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
//                     <div className="z-20 text-center px-6">
//                       <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg max-w-4xl mx-auto">
//                           {post.title}
//                       </h1>
//                       <p className="mt-4 text-gray-300 text-sm">
//                           {post.author && `By ${post.author}`} &bull;{" "}
//                           {post?.published_at &&
//                             new Date(post.published_at).toLocaleDateString("en-US", {
//                               year: "numeric", month: "long", day: "numeric",}
//                           )}
//                       </p>
//                     </div>
//                 </section>

//                 {/* Content Card with Glass Effect */}
//                 <section className="max-w-5xl mx-auto -mt-20 px-4 sm:px-6 lg:px-8 relative z-20">
//                     <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-6 sm:p-10 lg:p-14 transition-all duration-300">
//                     <div className="relative w-full h-60 md:h-80 lg:h-[28rem] mb-10 rounded-xl overflow-hidden shadow-lg">
//                         <Image
//                           src={post.imageURL}
//                           alt={post.title}
//                           fill
//                           className="object-cover"
//                         />
//                     </div>
//                     <article className="prose prose-lg md:prose-xl prose-gray max-w-none text-gray-800">
//                         <p>{post.content}</p>
//                     </article>
                
//                     {/* Floating File Download */}
//                     {post?.fileURL && (
//                       <div className="mt-12 text-center">
//                         <a
//                           href={post?.fileURL}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-green-300 to-green-500 hover:from-green-600 hover:to-green-300 text-white px-6 py-3 rounded-full text-base font-medium shadow-lg transition-all duration-200 hover:scale-105"
//                         >
//                           <Download className="w-5 h-5" />
//                             Download PDF
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 </section>
//             </div>
//     </>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import Loader from "../../../../components/Loader";
// import { getDataById } from "../../../lib/routes";


// export default function PublicationDetail() {
//   const [post, setPost] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const loadPost = async () => {
//       try {
//         const {data} = await getDataById("publications", id);
//         if (data) {
//           setPost( data );
//         }
//       } catch (err) {
//         setError("Could not load publication data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPost();
//   }, [id]);

//   if (loading)
//       return (
//           <div className="h-screen flex justify-center">
//             <Loader />
//           </div>
//       );
  
//     if(error){
//         return (
//             <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">
//                 Unable to fetch data.
//             </div>
//         );
//     }
  
//     if(!post){
//         return (
//             <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
//               <h1 className="text-4xl font-bold text-red-500 mb-4">❌ Oops!</h1>
//               <p className="text-gray-600 text-lg">"No Publication Post Found.</p>
//             </div>
//         );
//     }

//   return (
//     <>
//             <div>
                
//             </div>
//     </>
//   );
// }





// 'use client';

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Loader from "../../../../components/Loader";
// import { getDataById } from "../../../lib/routes";
// import { ArrowLeft, ExternalLink } from "lucide-react";
// import Link from "next/link";

// export default function PublicationDetail() {
//   const [post, setPost] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const loadPost = async () => {
//       try {
//         const { data } = await getDataById("publications", id);
//         if (data) setPost(data);
//       } catch (err) {
//         setError("Could not load publication data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPost();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <Loader />
//       </div>
//     );

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">
//         {error}
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-red-500 mb-4">❌ Oops!</h1>
//           <p className="text-gray-600 text-lg">No Publication Found.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-slate-100 to-slate-200 py-12 px-6 md:px-20">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">
//         <div className="absolute top-4 left-4">
//           <Link href="/publications" className="text-blue-600 hover:underline flex items-center gap-1">
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Link>
//         </div>

//         <div className="text-center mt-4">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
//             {post.title}
//           </h1>
//           <p className="text-sm text-gray-500 mb-2 italic">
//             Published by {post.publisher || "Unknown Publisher"} • {post.year}
//           </p>
//           {post.author && (
//             <p className="text-base text-gray-700 font-medium">
//               By <span className="text-gray-900">{post.author}</span>
//             </p>
//           )}
//         </div>

//         <hr className="my-8 border-gray-300" />

//         {post.citation && (
//           <div className="bg-slate-100 p-4 rounded-md text-gray-700 text-sm mb-6">
//             <strong>Citation:</strong><br />
//             {post.citation}
//           </div>
//         )}

//         <div className="flex justify-center">
//           {post.url && (
//             <a
//               href={post.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md transition-all"
//             >
//               View Full Publication
//               <ExternalLink className="w-5 h-5" />
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Loader from "../../../../components/Loader";
// import { getDataById } from "../../../lib/routes";

// export default function PublicationDetail() {
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const loadPost = async () => {
//       try {
//         const { data } = await getDataById("publications", id);
//         setPost(data);
//       } catch (err) {
//         setError("Could not load publication data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPost();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <Loader />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
//         {error}
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-red-500 mb-4">❌ Oops!</h1>
//           <p className="text-gray-600">No publication found for this ID.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="max-w-5xl mx-auto px-4 py-12">
//       <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
//           {post.title}
//         </h1>

//         <div className="mb-6">
//           <p className="text-gray-600 dark:text-gray-300">
//             <span className="font-semibold">Authors:</span> {post.authors}
//           </p>
//           {post.editors && (
//             <p className="text-gray-600 dark:text-gray-300">
//               <span className="font-semibold">Editors:</span> {post.editors}
//             </p>
//           )}
//           <p className="text-gray-600 dark:text-gray-300">
//             <span className="font-semibold">Year:</span> {post.year}
//           </p>
//           <p className="text-gray-600 dark:text-gray-300">
//             <span className="font-semibold">Type:</span> {post.publication_type}
//           </p>
//           {post.source && (
//             <p className="text-gray-600 dark:text-gray-300">
//               <span className="font-semibold">Source:</span> {post.source}
//             </p>
//           )}
//           {post.location && (
//             <p className="text-gray-600 dark:text-gray-300">
//               <span className="font-semibold">Location:</span> {post.location}
//             </p>
//           )}
//         </div>

//         {post.url && (
//           <div className="mt-6">
//             <a
//               href={post.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block text-white bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-semibold text-sm shadow-md"
//             >
//               📄 View Full Publication
//             </a>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../components/Loader";
import { getDataById } from "../../../lib/routes";
import Link from "next/link";

export default function PublicationDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data } = await getDataById("publications", id);
        setPost(data);
      } catch (err) {
        setError("Could not load publication data.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">❌ Not Found</h1>
          <p className="text-gray-600">This publication could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">

      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/resources"
          className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline"
        >
          ← Back to Resources
        </Link>
      </div>

      {/* Publication Details */}
      <article className="max-w-3xl mx-auto mx-6 bg-white text-gray-600 p-8 rounded-3xl shadow-xl border border-green-200">
        <h1 className="text-4xl font-extrabold mb-4 leading-snug tracking-tight text-green-700">
          {post.title}
        </h1>

        <div className="space-y-2 text-sm leading-relaxed mb-6">
          <p><span className="font-semibold">Authors:</span> {post.authors}</p>
          {post.editors && (
            <p><span className="font-semibold">Editors:</span> {post.editors}</p>
          )}
          <p><span className="font-semibold">Year:</span> {post.year}</p>
          <p><span className="font-semibold">Type:</span> {post.publication_type}</p>
          {post.source && (
            <p><span className="font-semibold">Source:</span> {post.source}</p>
          )}
          {post.location && (
            <p><span className="font-semibold">Location:</span> {post.location}</p>
          )}
        </div>

        {/* Call to Action */}
        {post.url && (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline mt-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-3.536 3.536a4 4 0 105.656 5.656l1.415-1.415m4.243-4.242a4 4 0 00-5.656-5.657l-1.415 1.414"
              />
            </svg>
            View Full Publication
          </a>
        )}
      </article>
    </main>
  );
}
