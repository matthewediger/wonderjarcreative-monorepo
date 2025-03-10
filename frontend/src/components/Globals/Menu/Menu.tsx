"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Menu.module.css";;


export default function Menu({ menuItems }: { menuItems: RootQueryToMenuItemConnection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={styles.navigation}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <button
        className="block md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white shadow-md md:hidden">
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="border-b border-gray-200 py-4">
            <ul className="flex flex-col p-4">
              {menuItems.nodes.map((item: MenuItem) => (
                <li key={item.uri} className="py-2">
                  <Link href={item.uri} target={item.target}>
                      {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4">
        {menuItems.nodes.map((item: MenuItem) => (
          <li key={item.uri} className="fw-b py-2">
            <Link href={item.uri} target={item.target}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
