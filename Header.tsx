import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';

const Header = ({ headerTitle, titleClassName }: { headerTitle?: string; titleClassName?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const switchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="flex flex-col lg:flex-row items-center justify-between p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <button onClick={toggleMenu} className="lg:hidden text-2xl text-gray-600 dark:text-gray-300">
          ☰
        </button>
        <h1 className={cn('text-18 font-bold text-gray-900 dark:text-white', titleClassName)}>
          {headerTitle || 'Default Header'}
        </h1>
        <button onClick={switchTheme} className="hidden lg:block text-gray-600 dark:text-gray-300">
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <nav className={`flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/home" className="text-16 font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
          Home
        </Link>
        <Link href="/about" className="text-16 font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
          About
        </Link>
        <Link href="/services" className="text-16 font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
          Services
        </Link>
        <Link href="/contact" className="text-16 font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
          Contact
        </Link>
        <Link href="/blog" className="text-16 font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
          Blog
        </Link>
        <Link href="/profile" className="text-16 font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
          Profile
        </Link>
        <Link href="/settings" className="text-16 font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
          Settings
        </Link>
        <Link href="/faq" className="text-16 font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
          FAQ
        </Link>
      </nav>
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <button onClick={switchTheme} className="text-gray-600 dark:text-gray-300">
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
