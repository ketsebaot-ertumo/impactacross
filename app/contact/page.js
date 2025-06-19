/* eslint-disable react/no-unescaped-entities */
"use client";

import Head from "next/head";
import ContactForm from "../../components/ContactForm";
import { Phone } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getLatestData } from "../lib/routes";

const fallbackData = {
  logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1749714702/ImpactAcross/owner/logo1_ekrjmf.png",
  primary_color: "#007A33",
  name: "ImpactAcross",
  title: "Development Research and Consultancy PLC",
  email: "info@impactacross.com",
  links: [
    { label: "linkedin", url: "https://linkedin.com/in/" },
    { label: "twitter", url: "https://twitter.com/" },
    { label: "facebook", url: "https://linkedin.com/in/" },
    { label: "instagram", url: "https://www.instagram.com/" },
  ],
  phones: [
    { id: "1", number: "+251984811023" },
    { id: "2", number: "+251911364755" },
  ],
  locations: [
    { id: "1", address: "Addis Ababa, Ethiopia" },
    { id: "2", address: "7550, Cape Town, South Africa" },
  ],
};

export default function Contact() {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getLatestData("owners");
        if (data) setData(data);
      } catch (err) {
        // console.error("Failed to load data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-primary text-gray-600">
        <Head>
          <title>Contact Us</title>
          <meta name="description" content="Contact our team for any inquiries" />
        </Head>

        <div className="relative">
            <img
                src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1750152642/ImpactAcross/images/photo_5947012572643444117_x_x0wzkk.jpg"
                alt="Consultancy Services"
                className="w-full h-60 sm:h-90 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50 w-full"></div>
            <div className="absolute inset-0 flex items-center max-w-6xl mx-auto left-[8%] lg:left-[20%]">
              <div className="text-white text-4xl md:text-5xl font-bold  pb-4 text-center">
                  Contact Us
                  <p className="text-lg md:text-2xl pt-4">Let’s work together to create lasting impact!</p>
              </div>
            </div>
        </div>

        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* LEFT: Contact Info */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-600">Get in touch with our team</h2>
                <p className="text-lg text-gray-600 line-clamp-3">
                  We’d love to hear from you! Whether you’re interested in learning more about our services, exploring partnership opportunities, or have questions about your development projects, ImpactAcross is here to help.
                </p>

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold pt-2">Our Address</h2>
                  {fallbackData.locations.map((location, i) => (
                    <div key={location.id || i}>
                      {/* <h3 className="font-semibold text-gray-900">{location.address}</h3> */}
                      <p className="text-gray-600">{location.address}</p>
                    </div>
                  ))}

                  <div className="pt-6 space-y-2">
                    <h3 className="text-xl font-semibold">Phone Numbers</h3>
                    {fallbackData.phones.map((phone, i) => (
                      <div key={phone.id || i} className="flex items-center space-x-2">
                        <Phone className="text-green-600 w-5 h-5" />
                        <a href={`tel:${phone.number}`} className="hover:underline">
                          {phone.number}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

