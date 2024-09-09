'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/navbar-desktop";

export default function NavbarWrapper() {
  const pathname = usePathname();

  return <Navbar activePath={pathname} />;
}