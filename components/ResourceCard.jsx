'use client';

import Image from "next/image";
import Link from "next/link";

const ResourceCard = ({ id, name, imageURL, mediaURL, title, content }) => {
  const Name = name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase();

  return (
    <Link
      href={`/resources/${name}`}
      className="min-h-40 group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 h-full"
    >
      {/* Image */}
      <div className="relative w-full md:w-1/3 h-full rounded-2xl overflow-hidden">
        <Image
          src={imageURL || mediaURL}
          alt={title}
          fill
          // width={100}
          // height={100}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-between w-full md:w-2/3 p-6">
        <h3 className="text-2xl font-bold text-green-600 transition-colors mb-4 line-clamp-1">
          {Name}
        </h3>
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-4 line-clamp-1">
          {title}
        </h3>
        <p className="text-base text-gray-600 line-clamp-2">
          {content}
        </p>
      </div>
    </Link>
  );
};

export default ResourceCard;
