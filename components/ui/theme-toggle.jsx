"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const [isClient, setIsClient] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(()=>{
    setIsClient(true);
  },[]);

  if(!isClient) return null

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      className={cn(
        buttonVariants({
          size: "icon",
          variant: "secondary",
          className: "bg-transparent cursor-pointer active:scale-95",
        })
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 3l0 18"></path>
        <path d="M12 9l4.65 -4.65"></path>
        <path d="M12 14.3l7.37 -7.37"></path>
        <path d="M12 19.6l8.85 -8.85"></path>
      </svg>
    </Button>
  );
};

export default ThemeToggle;
