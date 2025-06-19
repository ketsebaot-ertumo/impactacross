
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { usePathname } from "next/navigation"; 
// import { getAllData, getLatestData } from "../lib/routes";

// export default function Header() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const pathname = usePathname();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const {data} = await getLatestData("owners");
//         if (data) {
//           setData(data);
//         }
//       } catch (err) {
//         // console.error("Failed to load data:", err);
//       }
//     };

//     fetchData();
//   }, []);

  
//   useEffect(() => {
//     if (!data?.font_family) return;
  
//     const fontFamily = data.font_family;
//     const fontUrl = data.font_url; // optional
  
//     // Clean up old dynamic fonts
//     const existingLink = document.getElementById("dynamic-font-link");
//     if (existingLink) existingLink.remove();
  
//     // Helper: set CSS variable
//     const setFont = () => {
//       document.documentElement.style.setProperty('--dynamic-font-family', `'${fontFamily}', sans-serif`);
//     };
  
//     // Case 1: Use Google Fonts if no custom URL
//     if (!fontUrl) {
//       const googleFontName = fontFamily.replace(/ /g, '+');
//       const link = document.createElement("link");
//       link.id = "dynamic-font-link";
//       link.rel = "stylesheet";
//       link.href = `https://fonts.googleapis.com/css2?family=${googleFontName}:wght@400;500;600;700;800;900&display=swap`;
//       link.onload = setFont;
//       link.onerror = () => {
//         console.warn(`Google Font ${fontFamily} not found. Falling back to system font.`);
//         setFont();
//       };
//       document.head.appendChild(link);
//     }
  
//     // Case 2: Use custom URL for @font-face
//     else {
//       const font = new FontFace(fontFamily, `url(${fontUrl})`, {
//         weight: '700',
//         style: 'normal'
//       });
//       font.load()
//         .then((loadedFont) => {
//           document.fonts.add(loadedFont);
//           setFont();
//         })
//         .catch((err) => {
//           console.warn(`Custom font "${fontFamily}" failed to load:`, err);
//           setFont(); // fallback to system-installed font
//         });
//     }
//   }, [data]);
  

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const navLinks = [
//     { title: "Home", path: "/" },
//     { title: "About", path: "/#about" },
//     { title: "Services", path: "/#services" },
//     { title: "Teams", path: "/#teams" },
//     { title: "Resources", path: "/resources" },
//     { title: "Contact", path: "/contact" },
//   ];

//   const isActiveLink = (linkPath) => {
//     if (pathname.startsWith('#about')) return linkPath === '/#about';
//     if (pathname.includes('#services')) return linkPath === '/#services';
//     if (pathname.includes('#teams')) return linkPath === '/#teams';
//     if (pathname.includes('/resources')) return linkPath === '/resources';
//     if (pathname.startsWith('/contact')) return linkPath === '/contact';
//     return pathname === linkPath;
//   };

//   return (
//     <div className="bg-white text-gray-600 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto lg:px-5 pr-4">
//         <div position="static">
//           <Toolbar className="flex justify-between items-center py-2">
//             <div className="flex justify-between items-center space-x-4 py-3">
//               <Link href="/" prefetch={true}>
//                 <img 
//                   // src="/logo.png"
//                   src={data?.logo_url || "/logo2.png"}
//                   alt="Company Logo" 
//                   className="h-12 w-12 sm:h-22 sm:w-22"
//                 />
//               </Link>
//               <div>
//                 <h1 className="text-3xl font-semibold">{data?.name || "ImpactAcross"}</h1>
//                 <p className="text-[10px] font-semibold hidden md:block">{data?.title || "Development Research and Consultancy PLC"}</p>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex space-x-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.title}
//                   href={link.path}
//                   className={`px-3 py-2 rounded-md transition-colors duration-200 hover:border text-lg ${
//                     isActiveLink(link.path)
//                       ? 'border font-bold'
//                       : 'text-gray-900'
//                   }`}
//                 >
//                   {link.title}
//                 </Link>
//               ))}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden">
//               <IconButton edge="end" onClick={handleDrawerToggle}>
//                 <MenuIcon />
//               </IconButton>
//             </div>
//           </Toolbar>
//         </div>

//         {/* Mobile Drawer */}
//         <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
//           <List>
//             {navLinks.map((link) => (
//               <ListItem
//                 button
//                 key={link.title}
//                 component={Link}
//                 href={link.path}
//                 className={`transition-colors duration-200 hover:text-green-600 ${
//                   isActiveLink(link.path)
//                     ? 'text-green-600 font-bold'
//                     : 'text-gray-900'
//                 }`}
//               >
//                 <ListItemText primary={link.title} />
//               </ListItem>
//             ))}
//           </List>

//         </Drawer>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import { getLatestData } from "../app/lib/routes";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getLatestData("owners");
        if (data) {
          setData(data);
        }
      } catch (err) {
        // console.error("Failed to load data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data?.font_family) return;

    const fontFamily = data.font_family;
    const fontUrl = data.font_url;

    const existingLink = document.getElementById("dynamic-font-link");
    if (existingLink) existingLink.remove();

    const setFont = () => {
      document.documentElement.style.setProperty(
        "--dynamic-font-family",
        `'${fontFamily}', sans-serif`
      );
    };

    if (!fontUrl) {
      const googleFontName = fontFamily.replace(/ /g, "+");
      const link = document.createElement("link");
      link.id = "dynamic-font-link";
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${googleFontName}:wght@400;500;600;700;800;900&display=swap`;
      link.onload = setFont;
      link.onerror = () => {
        // console.warn(`Google Font ${fontFamily} not found. Falling back.`);
        setFont();
      };
      document.head.appendChild(link);
    } else {
      const font = new FontFace(fontFamily, `url(${fontUrl})`, {
        weight: "700",
        style: "normal",
      });
      font
        .load()
        .then((loadedFont) => {
          document.fonts.add(loadedFont);
          setFont();
        })
        .catch((err) => {
          // console.warn(`Custom font "${fontFamily}" failed to load:`, err);
          setFont();
        });
    }
  }, [data]);

  // 👇 Add this effect to track hash from URL
  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };
    updateHash(); // on first load
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/#about" },
    { title: "Services", path: "/#services" },
    { title: "Gallary", path: "/gallary" },
    { title: "Resources", path: "/resources" },
    { title: "Contact Us", path: "/contact" },
  ];

  const isActiveLink = (linkPath) => {
    if (linkPath === "/#about") {
      return pathname === "/" && (hash === "#about");
    }
  
    if (linkPath === "/#services") {
      return (
        (pathname === "/" && hash === "#services") ||
        pathname.startsWith("/services")
      );
    }
  
    if (linkPath === "/gallary") {
      return (
        pathname.startsWith("/gallary")
      );
    }
  
    if (linkPath === "/resources") {
      return pathname === "/resources" || pathname.startsWith("/resources/");
    }
  
    if (linkPath === "/contact") {
      return pathname === "/contact";
    }

    if (linkPath === "/") {
      return (
        (pathname === "/") ||
        pathname.startsWith("/values") ||
        pathname.startsWith("/projects") ||
        (pathname === "/" && hash === "#teams") ||
        pathname.startsWith("/team-detail")
      );
    }
    
    return pathname === linkPath;
  };
  

  return (
    <div className="bg-white text-gray-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto lg:px-5 pr-4">
        <div position="static">
          <Toolbar className="flex justify-between items-center py-2">
            <div className="flex justify-between items-center space-x-4 py-3">
              <Link href="/" prefetch={true}>
                <img
                  src={data?.logo_url || "/logo2.png"}
                  alt="Company Logo"
                  className="h-12 w-12 sm:h-22 sm:w-22"
                />
              </Link>
              <div>
                <h1 className="text-3xl font-semibold">
                  {data?.name || "ImpactAcross"}
                </h1>
                <p className="text-[10px] font-semibold hidden md:block">
                  {data?.title ||
                    "Development Research and Consultancy PLC"}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.path}
                  className={`px-3 py-2 rounded-md transition-colors duration-200 hover:border text-lg ${
                    isActiveLink(link.path)
                      ? "border font-bold"
                      : "text-gray-900"
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <IconButton edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </div>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.title}
                component={Link}
                href={link.path}
                className={`transition-colors duration-200 hover:text-green-600 ${
                  isActiveLink(link.path)
                    ? "text-green-600 font-bold"
                    : "text-gray-900"
                }`}
              >
                <ListItemText primary={link.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </div>
  );
}
