"use client";
import React, { FC } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

interface Props {}

const Hero: FC<Props> = () => {
  return (
    <div className="w-full flex flex-col-reverse items-center 1000px:flex-row-reverse justify-between px-6 1000px:px-16 py-10 relative overflow-hidden">
      {/* Right Text Section */}
      <div className="1000px:w-[55%] flex flex-col items-center 1000px:items-start text-center 1000px:text-left mt-[100px] 1000px:mt-0 z-10">
        <h2 className="dark:text-white text-[#000000c7] text-[32px] 1000px:text-[60px] font-[600] font-josefin leading-[65px]">
          Improve Your Skills with Our Expert-Led Courses
        </h2>

        <p className="dark:text-white text-[#000000b3] font-[500] font-josefin text-[18px] mt-4 1000px:w-[85%]">
          We have 40k+ Online Courses & 5000k+ Registered Students.
          <br />
          Find your desired course & start learning today.
        </p>

        {/* Search Bar */}
        <div className="w-full 1000px:w-[85%] h-[50px] bg-transparent relative mt-8">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border border-[#0000004e] dark:border-none dark:bg-[#575757] dark:text-white dark:placeholder:text-[#ffffffdd] rounded-[5px] px-5 outline-none font-josefin text-[18px] h-full w-full"
          />
          <button className="absolute top-0 right-0 flex items-center justify-center cursor-pointer rounded-r-[5px] bg-[#39c1fc] h-[50px] w-[50px]">
            <BiSearch className="text-white text-[26px]" />
          </button>
        </div>

        {/* Avatars + CTA */}
        <div className="flex items-center justify-center 1000px:justify-start w-full 1000px:w-[85%] mt-8">
          <div className="flex items-center">
            <Image
              src={require("../../../public/assests/1.jpg")}
              alt="student1"
              className="rounded-full w-[45px] h-[45px]"
            />
            <Image
              src={require("../../../public/assests/2.jpg")}
              alt="student2"
              className="rounded-full w-[45px] h-[45px] ml-[-15px] border-2 border-white dark:border-[#181818]"
            />
            <Image
              src={require("../../../public/assests/3.jpg")}
              alt="student3"
              className="rounded-full w-[45px] h-[45px] ml-[-15px] border-2 border-white dark:border-[#181818]"
            />
          </div>

          <p className="font-josefin dark:text-[#edfff4] text-[#000000b3] pl-3 text-[16px] font-[600]">
            500k+ people already trust us.{" "}
            <Link
              href="/courses"
              className="dark:text-[#39c1fc] text-[crimson] underline"
            >
              Join Now
            </Link>
          </p>
        </div>
      </div>

      {/* Left Image Section */}
      <div className="1000px:w-[45%] flex items-center justify-center pt-[30px] 1000px:pt-0 relative">
        {/* Blue Circular Background */}
        <div className="w-[300px] h-[300px] 1000px:w-[400px] 1000px:h-[400px] bg-[#02063d] rounded-full flex items-center justify-center shadow-lg shadow-[#39c1fc]/50 animate-pulse-slow">
          {/* Banner Image */}
          <Image
            src={require("../../../public/assests/banner-img-1.png")}
            alt="Learning Illustration"
            className="object-contain w-[250px] h-[250px] 1000px:w-[340px] 1000px:h-[340px] rounded-full"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
