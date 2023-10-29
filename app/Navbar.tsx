import Link from "next/link";
import React from "react";

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex border-b h-14 px-6 space-x-5 items-center">
      <Link href="/">Logo</Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            className="text-zinc-500 hover:text-zinc-800 translate-x-3"
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
