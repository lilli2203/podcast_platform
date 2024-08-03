import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "../providers/ConvexClerkProvider";
import AudioProvider from "@/providers/AudioProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import NotificationsProvider from "@/providers/NotificationsProvider";
import ThemeProvider from "@/providers/ThemeProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcastr",
  description: "Generate your podcasts using AI",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default function Sidebar() {
  return (
    <aside className="w-64 p-4 bg-black-1 border-r border-gray-700">
      <ul>
        <li className="mb-4"><a href="#" className="text-gray-300 hover:text-white">Dashboard</a></li>
        <li className="mb-4"><a href="#" className="text-gray-300 hover:text-white">My Podcasts</a></li>
        <li className="mb-4"><a href="#" className="text-gray-300 hover:text-white">Settings</a></li>
      </ul>
    </aside>
  );
}

export default function Header() {
  return (
    <header className="w-full p-4 bg-black-2 flex justify-between items-center">
      <div className="text-2xl font-bold">Podcastr</div>
      <nav>
        <a href="#" className="mr-4 text-gray-300 hover:text-white">Home</a>
        <a href="#" className="mr-4 text-gray-300 hover:text-white">About</a>
        <a href="#" className="text-gray-300 hover:text-white">Contact</a>
      </nav>
    </header>
  );
}

    <ConvexClerkProvider>
      <ThemeProvider>
        <NotificationsProvider>
          <html lang="en">
            <AudioProvider>
              <body className={`${manrope.className} bg-gray-900 text-white min-h-screen flex flex-col`}>
                <Header />
                <div className="flex flex-1">
                  <Sidebar />
                  <main className="flex-1 p-4">
                    {children}
                  </main>
                </div>
                <Footer />
              </body>
            </AudioProvider>
          </html>
        </NotificationsProvider>
      </ThemeProvider>
    </ConvexClerkProvider>
  );
}
