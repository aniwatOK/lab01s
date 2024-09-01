import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "daisyui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeNext",
  description: "PokemonAPI ByNextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li><a href="/">HOME</a></li>
                <li><a href="/pokemon">Pokemon</a></li>
                <li><a href="https://aniwatok.github.io/">AboutMe</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-2xl">Pokemon.NEXT</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-2xl">
              <li><a href="/">HOME</a></li>
              <li><a href="/pokemon">Pokemon</a></li>
              <li><a href="https://aniwatok.github.io/" target="_blank" rel="noopener noreferrer">AboutMe</a></li>
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn">byMeMix</a>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
