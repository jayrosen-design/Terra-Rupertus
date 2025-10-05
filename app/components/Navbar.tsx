'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();

    const navItems = [
      { href: '/', label: 'Earth', icon: '🌍', type: 'emoji' },
      { href: '/rupert', label: 'Rupert', icon: '/rupertus-logo.png', type: 'image' },
      { href: '/terra-satellite', label: 'Terra', icon: '🛰️', type: 'emoji' },
      { href: '/astreaus', label: 'Astreaus', icon: '🌟', type: 'emoji' },
      { href: '/about', label: 'About', icon: 'ℹ️', type: 'emoji' },
    ];

  return (
    <nav className="navbar-overlay fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="navbar-container">
          {/* Logo/Brand - Left side */}
          <Link href="/" className="navbar-brand">
            <Image 
              src="/rupertus-logo.png" 
              alt="Rupertus" 
              width={32} 
              height={32}
              className="rounded-full"
            />
            <span>Terra Rupertus</span>
          </Link>

          {/* Navigation Items - Right side */}
          <div className="navbar-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.type === 'image' ? (
                    <Image 
                      src={item.icon} 
                      alt={item.label} 
                      width={20} 
                      height={20}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-lg">{item.icon}</span>
                  )}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
