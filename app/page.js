import HomeComponent from "../components/HomeComponent";
import HomeSectorialAreas from "../components/OurServices";
import OurExpertise from "../components/OurExpertise";
import OurTeam from "../components/OurTeam";
import ProjectsAndPartners from "../components/Projects";
import WhatWeDo from "../components/WhatWeDo";
import WhoWeAre from "../components/AboutUs";
import WhyChooseUs from "../components/WhyChooseUs";
import Partners from "../components/Partner";


export default function Home() {
  return (
    <>
        <HomeComponent />
        <WhoWeAre/>
        {/* <WhatWeDo/> */}
        <OurExpertise/>
        <HomeSectorialAreas/>
        <WhyChooseUs/>
        <OurTeam/>
        <ProjectsAndPartners/>
        <Partners/>
    </>
  );
}
