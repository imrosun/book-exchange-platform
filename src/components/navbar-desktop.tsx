"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "@/components/hooks/use-toast";

interface NavbarProps {
  activePath: string;
}

const Navbar: React.FC<NavbarProps> = ({ activePath }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
    });
  };

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => {
    const isActive = activePath === href;
    return (
      <Link
        href={href}
        className={`px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white ${isActive
            ? "dark:bg-[#747c75] bg-gradient-to-b from-[#747c75] to-[#4c5e5f] text-white"
            : ""
          }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed z-20 w-full transition-colors duration-300 
            ${isScrolled
          ? "bg-white dark:bg-black text-black dark:text-white"
          : "bg-transparent text-black dark:text-white"
        }
            ${isMenuOpen
          ? "bg-white dark:bg-black text-black dark:text-white"
          : "text-black dark:text-white"
        }
        `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold inline-flex items-center">
              <Image src="/bep_logo.png" alt="logo" width={50} height={50} />
              <div className="h-auto w-px my-10 ml-2 bg-gray-600"></div>
              <Link
                href="https://roshan-sharma-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                {theme === "dark" ? (
                  <Image src="/devSharmaLightLogo.png" alt="logo" className="m-1"
                    width={120} height={0}
                  />
                ) : (
                  <Image src="/devSharmaDarkLogo.png" alt="logo" className="m-1"
                    width={120} height={0}
                  />
                )}
              </Link>
            </div>
          </div>

          {/* Navigation Links (desktop) */}
          <div className="hidden md:block z-20">
            <div className="ml-10 flex items-baseline space-x-4 z-10">
              {/* Change Home to Dashboard if logged in */}
              {/* <NavLink href={isLoggedIn ? "/dashboard" : "/"}>
                {isLoggedIn ? "Dashboard" : "Home"}
              </NavLink> */}
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
          </div>

          {/* Right side navigation and Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Conditionally render Register/Login or Logout */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/signup"
                  className="hidden md:inline-block px-3 py-1 rounded-md text-sm font-medium hover:bg-yellow-700 hover:text-white"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="hidden md:inline-block px-3 bg-transparent py-1 rounded-md text-sm font-medium hover:bg-green-600 hover:text-white"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <NavLink href="/dashboard">Dashboard</NavLink>

                <Link
                  href="/cart"
                  className="hidden md:inline-block px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                >
                  Cart
                </Link>
                <Link href=""
                  className="hidden md:inline-block px-3 py-1 rounded-md text-sm font-medium
                   hover:bg-red-600 hover:text-white bg-none text-black dark:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            )}

            <Button className="border-none" variant="ghost"
              size="icon" onClick={toggleTheme}
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative p-2 rounded-md text-black dark:text-white hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <HamburgerMenuIcon />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden top-16 left-0 w-full bg-white dark:bg-black z-20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <NavLink href={isLoggedIn ? "/dashboard" : "/"}>{isLoggedIn ? "Dashboard" : "Home"}</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/contact">Contact</NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink href="/register">Register</NavLink>
                <NavLink href="/login">Login</NavLink>
              </>
            ) : (
              <>
                <NavLink href="/cart">Cart</NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md text-sm font-medium text-black dark:text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
