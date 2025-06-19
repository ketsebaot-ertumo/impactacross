
"use client";

import React from "react";
import { cn } from "../utils/utils";
import { RefreshCcw } from "lucide-react";


const Loader = ({ className }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={cn("w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin", className)}></div>
      {/* <RefreshCcw className="h-6 w-6 animate-spin text-muted-foreground text-green-800" /> */}
    </div>
  );
};

export default Loader;

// const Loader = () => {
//   return (
//     <div className="w-full min-h-[500px] flex items-center justify-center">
//       <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default Loader;

// // components/shared/Loader.tsx