"use client";
import NavItems from "../utils/NavItems";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import {
  HiOutlineMenuAlt3,
  HiOutlineUserCircle,
} from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSlidebar, setOpenSlidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSlidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-gray-200 dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-[#ffffff1c] h-[80px] z-[80] transition duration-500"
        }`}
      >
        <div className="w-[95%] md:w-[92%] m-auto h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href="/"
                className="text-[25px] font-[500] font-poppins text-black dark:text-white"
              >
                E-Learning
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* {only for mobile} */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  className="cursor-pointer text-black dark:text-white"
                  size={25}
                  onClick={() => setOpenSlidebar(true)}
                />
              </div>
              <HiOutlineUserCircle
                className="hidden 800px:block cursor-pointer text-black dark:text-white ml-4"
                size={25}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        {/* mobile sidebar */}
        {openSlidebar && (
          <div
            className="w-full h-screen bg-[#00000024] fixed top-0 left-0 z-[99999] md:hidden"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] z-[99999] fixed h-screen bg-white dark:bg-slate-900 dark:bd-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                className="cursor-pointer text-black dark:text-white ml-5 my-2"
                size={25}
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                © 2024 E-Learning. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              //  activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;

// "use client";

// import React, { FC, useState, useEffect } from "react";
// import Link from "next/link";
// import NavItems from "../utils/NavItems";
// import { ThemeSwitcher } from "../utils/ThemeSwitcher";
// import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
// import CustomModal from "../utils/CustomModal";
// import Login from "../components/Auth/Login";

// type Props = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeItem: number;
//   route: string;
//   setRoute: (route: string) => void;
// };

// const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);

//   // 🧠 Detect scroll for sticky header background
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 80);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // 🧠 Handle sidebar background click
//   const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
//     if ((e.target as HTMLElement).id === "overlay") {
//       setOpenSidebar(false);
//     }
//   };

//   return (
//     <header className="w-full relative">
//       {/* 🧠 Top NavBar */}
//       <div
//         className={`fixed top-0 left-0 w-full h-[80px] z-[80] border-b transition duration-500 ${
//           isScrolled
//             ? "bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black border-gray-200 dark:border-[#ffffff1c] shadow-xl"
//             : "bg-white dark:bg-gray-900 border-gray-200 dark:border-[#ffffff1c]"
//         }`}
//       >
//         <div className="w-[95%] md:w-[92%] mx-auto h-full flex items-center justify-between p-3">
//           {/* 🧱 Logo */}
//           <Link
//             href="/"
//             className="text-[25px] font-[600] font-poppins text-black dark:text-white"
//           >
//             E-Learning
//           </Link>

//           {/* 🌗 Nav Items + Theme Switch + User */}
//           <div className="flex items-center gap-4">
//             <NavItems activeItem={activeItem} isMobile={false} />
//             <ThemeSwitcher />

//             {/* 📱 Mobile Menu Button */}
//             <div className="md:hidden">
//               <HiOutlineMenuAlt3
//                 className="cursor-pointer text-black dark:text-white"
//                 size={25}
//                 onClick={() => setOpenSidebar(true)}
//               />
//             </div>

//             {/* 👤 Desktop User Icon */}
//             <HiOutlineUserCircle
//               className="hidden md:block cursor-pointer text-black dark:text-white"
//               size={25}
//               onClick={() => setOpen(true)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* 📱 Mobile Sidebar */}
//       {openSidebar && (
//         <div
//           id="overlay"
//           className="fixed top-0 left-0 w-full h-screen bg-black/30 z-[90] md:hidden"
//           onClick={handleClose}
//         >
//           <div className="absolute top-0 right-0 w-[70%] h-full bg-white dark:bg-slate-900 p-5 shadow-lg transition-all duration-300">
//             <NavItems activeItem={activeItem} isMobile={true} />

//             <HiOutlineUserCircle
//               className="cursor-pointer text-black dark:text-white mt-4"
//               size={25}
//               onClick={() => setOpen(true)}
//             />

//             <p className="mt-8 text-[15px] text-black dark:text-gray-300">
//               © 2024 E-Learning. All rights reserved.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* 🔐 Login Modal */}
//       {route === "Login" && open && (
//         <CustomModal
//           open={open}
//           setOpen={setOpen}
//           setRoute={setRoute}
//           component={Login}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;
