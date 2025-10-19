import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://domains.vercel.app/"),
  title: "Vercel Domain Checker | Check Your Vercel Domain Availablity.",
  description: "Check if a *.vercel.app domain is available on Vercel",
  openGraph: {
    title: "Vercel Domain Checker | Check Your Vercel Domain Availablity.",
    description: "Check if a *.vercel.app domain is available on Vercel",
    url: "https://domains.vercel.app/",
    type: "website",
    images: "/banner.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
