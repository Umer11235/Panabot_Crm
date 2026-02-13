"use client";

import React, { useState } from 'react';
import { IoClose, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Icon from '@/utils/Icons';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import Image from 'next/image';
import userAvatar from '@/public/images/users.jpg';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubMenu(null);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu} />
      )}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.leftSection}>
            <div className={styles.navLinks}>
              {NAV_DATA.map((menu) => (
                <div key={menu.title} className={styles.navItem}>
                  {menu.path ? (
                    <Link href={menu.path} className={`${styles.navLink} ${pathname === menu.path ? styles.activeLink : ''}`}>
                      {menu.title}
                    </Link>
                  ) : (
                    <div className={styles.navLinkWrapper}>
                      <span className={styles.navLink}>{menu.title}</span>
                      {menu.columns && (
                        <div className={styles.megaMenu}>
                          <div className={styles.megaMenuInner}>
                            {menu.columns.map((col) => (
                              <div key={col.heading} className={styles.menuColumn}>
                                <h4 className={styles.columnTitle}>{col.heading}</h4>
                                {col.items.map((item) => (
                                  <Link key={item.title} href={item.path} className={styles.dropLink}>
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.iconGroup}>
              <ThemeToggle />
              <button className={styles.iconBtn}><Icon name="messages-alert" size={18} /></button>
              <button className={styles.iconBtn}><Icon name="chat-double" size={18} /></button>
            </div>
            <button className={styles.mobileToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <IoClose size={24} /> : <Icon name="menu-list" size={20} />}
            </button>
            <Image src={userAvatar} alt="User" className={styles.userAvatar} width={40} height={40} />
          </div>
        </div>
        <div className={`${styles.mobileMenuWrapper} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {NAV_DATA.map((menu) => (
            <div key={menu.title} className={styles.mobileItem}>
              {menu.path ? (
                <Link href={menu.path} onClick={closeMenu} className={styles.mobileNavLink}>
                  {menu.title}
                </Link>
              ) : (
                <div className={styles.mobileCollapse}>
                  <div className={styles.mobileMenuHeader} onClick={() => toggleSubMenu(menu.title)}>
                    <span className={styles.mobileHeading}>{menu.title}</span>
                    <span className={styles.toggleIcon}>
                      {openSubMenu === menu.title ? <IoChevronUp size={16} /> : <IoChevronDown size={16} />}
                    </span>
                  </div>
                  <div className={`${styles.mobileSubLinks} ${openSubMenu === menu.title ? styles.show : ''}`}>
                    {menu.columns?.map(col => (
                      <div key={col.heading} className="mb-4">
                        <div className={styles.mobileColHeading}>{col.heading}</div>
                        {col.items.map(item => (
                          <Link key={item.title} href={item.path} onClick={closeMenu} className={styles.mobileSubLinkItem}>
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

const NAV_DATA = [
  { title: 'Home', path: '/' },
  {
    title: 'Profiles',
    columns: [
      { heading: 'General', items: [{ title: 'Get Started', path: '/get-started' }, { title: 'Colleagues', path: '/colleagues' }] },
      { heading: 'User Cards', items: [{ title: 'Mini Cards', path: '/mini-cards' }, { title: 'Team Crew', path: '/team' }] }
    ]
  },
  { title: 'My Account', path: '/account' },
];

export default Navbar;
