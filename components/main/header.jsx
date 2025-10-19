"use client";

import VercelLogo from '@/assets/vercel-logo';
import Link from 'next/link';
import React from 'react';
import ThemeToggle from '../ui/theme-toggle';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';
import { FlickeringGrid } from '../ui/flickering-grid';

const Header = () => {
  return (
    <header className="relative w-full top-0 left-0 z-50 overflow-hidden">
      <div className="absolute top-4  w-full bg-gradient-to-b from-transparent via-background to-background h-20"></div>

      <FlickeringGrid
        className="absolute inset-0 -z-10 w-full h-full opacity-40"
        squareSize={5}
        gridGap={7}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between relative z-10">
        <Link href="/" aria-label="Home">
          <VercelLogo className="w-8 h-auto" />
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'icon',
                className:
                  'bg-transparent text-foreground dark:hover:bg-neutral-800 cursor-pointer active:scale-95',
              })
            )}
          >
            <Github />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
