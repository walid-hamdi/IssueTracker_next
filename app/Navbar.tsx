"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineBug } from "react-icons/ai";

const Navbar = () => {
  const currentPath = usePathname();
  const { status } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className=" border-b h-14 px-6 py-4 space-x-5 justify-between">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiOutlineBug />
            </Link>
            <ul className="flex space-x-5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-900": currentPath === link.href,
                      "text-zinc-500": currentPath !== link.href,
                      "transition-colors hover:text-zinc-800": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Flex>
            <Box>
              {status === "authenticated" && (
                <Link href="/api/auth/signout">Log out</Link>
              )}
              {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Login</Link>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
