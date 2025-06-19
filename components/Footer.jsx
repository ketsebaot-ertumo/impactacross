"use client";

import { Email, Facebook, Instagram, LinkedIn, Mail, Phone, Twitter } from "@mui/icons-material";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getLatestData } from "../app/lib/routes";

export default function Footer() {
    const fallbackData = {
      logo_url: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1750098307/ImpactAcross/owner/WhatsApp_Image_2025-06-16_at_6.20.52_PM-removebg-preview_rrgeex.png",
      primary_color: "#007A33",
      name: "ImpactAcross",
      title: "Development Research and Consultancy PLC",
      email: "info@impactacross.com",
      links: [
          {
              label: "linkedin",
              url: "https://linkedin.com/in/",
          },
          {
              label: "twitter",
              url: "https://twitter.com/",
          },
          {
              label: "facebook",
              url: "https://linkedin.com/in/",
          },
          {
              label: "instagram",
              url: "https://www.instagram.com/",
          }
      ],
      phones: [
          {
              id: "y8d47dyjrd4338q3trg0d",
              owner_id: "fcciuxdzhlemjomgmlirl",
              number: "+251984811023",
          },
          {
              id: "38okyxvlzey8gceu31agi",
              owner_id: "fcciuxdzhlemjomgmlirl",
              number: "+251911364755",
          }
      ],
      locations: [
          {
              id: "fcwg3upe6c6u75uwiiuo8",
              owner_id: "fcciuxdzhlemjomgmlirl",
              address: "Addis Ababa, Ethiopia",
          },
          {
              id: "u9bcc6dcygjbj6d8ku3qf",
              owner_id: "fcciuxdzhlemjomgmlirl",
              address: "7550, Cape Town, South Africa",
          }
      ]
  }
  const [data, setData] = useState(fallbackData);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const {data} = await getLatestData("owners");
          if (data) {
            setData(data);
          }
        } catch (err) {
          // console.error("Failed to load data:", err);
        }
      };
  
      fetchData();
    }, []);

  return (
    <footer className="bg-green-950 text-gray-400 py-10 px-8 text-sm">
      <div className="max-w-6xl mx-auto">
        <div className="hidden lg:flex lg:justify-between">

          {/* Company Information */}
          <div className="space-y-2">
            <img 
              src={data?.logo_url || "/logo2.png"}
              alt="Company Logo" 
              className="h-12 w-12 sm:h-22 sm:w-22"
            />
            <p className="text-2xl font-semibold text-white">ImpactAcross</p>
            <p className="font-semibold w-60 lg:w-60 pt-2">Development Research and Consultancy PLC</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/resources" className="hover:text-white">Resources</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-2">
              {/* Locations */}
              {data?.locations.map((loc, index) => (
                <li key={`location-${index}`} className="flex items-center space-x-2">
                  <MapPin className="text-gray-400 w-5 h-5" />
                  <span>{loc.address}</span>
                </li>
              ))}

              {/* Email */}
              {data?.email && (
                <li className="flex items-center space-x-2">
                  <Mail className="text-blue-400 w-5 h-5" />
                  <a href={`mailto:${data?.email}`} className="hover:underline">
                    {data?.email}
                  </a>
                </li>
              )}

              {/* Phones */}
              {data?.phones.map((phone, index) => (
                <li key={`phone-${index}`} className="flex items-center space-x-2">
                  <Phone className="text-green-500 w-5 h-5" />
                  <a href={`tel:${phone.number}`} className="hover:underline">
                    {phone.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
                {data?.links?.map((link, index) => {
                  let Icon;
                  switch (link.label.toLowerCase()) {
                    case "facebook":
                      Icon = Facebook;
                      break;
                    case "twitter":
                      Icon = Twitter;
                      break;
                    case "linkedin":
                      Icon = LinkedIn;
                      break;
                    case "instagram":
                      Icon = Instagram;
                      break;
                    case "email":
                      Icon = Mail;
                      break;
                    default:
                      return null; // skip unknown platforms
                  }

                  return (
                    <a
                      key={`social-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                      title={link.label}
                    >
                      <Icon className="text-xl" />
                    </a>
                  );
                })}
              </div>
            </div>

        </div>

        {/* Footer Bottom */}
        <div className="lg:mt-8 text-center lg:border-t border-gray-700 lg:pt-6">
          <p>© {new Date().getFullYear()} ImpactAcross. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
