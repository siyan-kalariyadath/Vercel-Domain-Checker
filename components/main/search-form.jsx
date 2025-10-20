"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkDomainExist } from "@/actions/check-domain";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const SearchForm = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [searchAppName, setSearchAppName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    const duration = 2 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }
      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }


  const handleSubmit = async () => {
    setIsAvailable(null);

    if (!searchAppName.trim()) {
      toast.error("Please enter app name");
      return;
    }

    setIsLoading(true);
    try {
      const result = await checkDomainExist(searchAppName.toLowerCase());
      setIsAvailable(!result);

      if (!result) {
        handleClick()
        toast.success("Available", {
          description: `https://${searchAppName.toLowerCase()}.vercel.app is available to use.`,
        });
      } else {
        toast.error("Unavailable", {
          description: `https://${searchAppName.toLowerCase()}.vercel.app is unavailable to use.`,
        });
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (isAvailable !== null) {
      timer = setTimeout(() => {
        setIsAvailable(null);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isAvailable]);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-[80vh] flex flex-col items-center justify-center text-center space-y-6",
          className
        )}
      >
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-40 mx-auto" />
        </div>

        <div className="w-full max-w-sm flex items-center justify-center">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>

        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        " h-[80vh] flex flex-col items-center justify-center text-center space-y-6",
        className
      )}
    >
      <div>
        <h1 className="text-2xl lg:text-4xl font-bold tracking-tight font-sans transition-all duration-300">
          Vercel Domain Checker
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Check your vercel domain availablity
        </p>
      </div>

      <div className="w-full max-w-xs md:max-w-sm flex items-center justify-center">
        <div className="relative flex py-2 items-center w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-full dark:shadow-sm overflow-hidden">
          <Input
            type="text"
            placeholder="Enter your domain"
            value={searchAppName}
            onChange={(e) => setSearchAppName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 shadow-none rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-5 py-3 text-base !bg-transparent placeholder:text-neutral-500"
          />
          <span className="text-base text-neutral-950 dark:text-neutral-300 pr-14 select-none absolute right-2 lg:right-20 pointer-events-none">
            .vercel.app
          </span>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="absolute right-2 h-10 w-10 rounded-full flex items-center justify-center bg-neutral-800 text-white hover:bg-neutral-700 cursor-pointer transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-6 w-32 rounded-full" />
      ) : (
        isAvailable !== null && (
          <span
            className={`text-sm font-medium px-6 py-1.5 border bg-gray-50 dark:bg-neutral-900 rounded-full transition-all duration-500 ease-in-out ${
              isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {isAvailable ? "🎉 Available" : "❌ Unavailable"}
          </span>
        )
      )}
    </div>
  );
};

export default SearchForm;
