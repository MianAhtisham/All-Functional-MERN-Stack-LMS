"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiSun, BiMoon } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  
  return (
    <div className="flex items-center justify-center mx-4">
      {currentTheme === "light" ? (
        <BiMoon
          className="cursor-pointer text-black transition-transform duration-300 hover:rotate-180"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className="cursor-pointer text-yellow-400 transition-transform duration-300 hover:rotate-180"
          size={25}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};
