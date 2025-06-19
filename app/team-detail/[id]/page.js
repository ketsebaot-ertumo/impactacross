"use client";

import OurTeamDetail from "../../../components/OurTeamDetail";
import { useParams } from "next/navigation";


export default function Home() {
   const { id } = useParams();
  return (
    <>
      <OurTeamDetail id={id}/>
    </>
    
  );
}
