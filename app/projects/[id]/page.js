"use client";

import { useParams } from "next/navigation";
import ProjectsDetail from "../../../components/projectDetail";


export default function Home() {
   const { id } = useParams();
  return (
    <>
        <div>
          <ProjectsDetail id={id}/>
        </div>
    </>
    
  );
}
