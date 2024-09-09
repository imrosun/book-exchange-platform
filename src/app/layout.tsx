"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import NavbarWrapper from "@/components/navbar-wrapper";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/splash-screen";
import { metadata } from "./metadata";
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const pathname = usePathname();
  const isHome = pathname === "/"
  const [isLoading, setIsLoading] = useState(isHome);

  useEffect(() => {
    if (isLoading) return
  }, [isLoading])
  return (
    <html lang="en">
      <head>
        {/* Use a fallback if metadata.title is null or undefined */}
        <title>{String(metadata.title) || "BEP"}</title>
        <meta
          name="description"
          content={metadata.description || "Default description"}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className='{inter.className} bg-gray-100 dark:bg-gray-900 text-black dark:text-white'>
        {isLoading && isHome ? (
           <ThemeProvider
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange
           >
          <SplashScreen finishLoading={() => setIsLoading(false)}/>
            </ThemeProvider>
        ) : (
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <AuthProvider>
            <NavbarWrapper />
              {children}
            </AuthProvider>
          </ThemeProvider>
        )}
         <Toaster />
      </body>
    </html>
  );
}
