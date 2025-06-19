"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ThankYou() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 px-6">
      <CheckCircleIcon className="text-green-500" fontSize="inherit" style={{ fontSize: "4rem" }} />
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Thank You!</h1>
      <p className="text-gray-600 mt-2">
        Your message has been successfully sent. We&apos;ll get back to you soon!
      </p>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => router.push("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Back to Home
        </button>
        <button
          onClick={() => router.push("/contact/#form")}
          className="border border-gray-400 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Send Another Message
        </button>
      </div>
    </div>
  );
}
