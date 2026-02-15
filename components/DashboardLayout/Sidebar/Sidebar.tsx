"use client";
import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 
import styles from './Sidebar.module.css';
import Icon from '@/utils/Icons';
import { Section } from '@/utils/types/sidebar.types';

const SidebarV1 = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(['Dashboards']);
  const pathname = usePathname();
  const isExpanded = isLocked || hovered;
  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) ? prev.filter(i => i !== title) : [...prev, title]
    );
  };
  const sections: Section[] = [
    {
      label: 'USER',
      items: [
        { 
          title: 'Project Management', 
          icon: 'user-profile', 
          children: [
            { title: 'Project List', path: '/projectlist' },
            { title: 'Clients', path: '/clients' },
            { title: 'Teams', path: '/teams' }
          ] 
        },
        { title: 'Boards', icon: 'settings-gear', path: '/boards' },
      ]
    },
    {
      label: 'HR MANAGEMENT',
      items: [
        { 
          title: 'HR', 
          icon: 'team-users', 
          children: [
            { title: 'Employee List', path: '/employees' },
            { title: 'Add Employee', path: '/employees/new' },
            { title: 'Employee Leave', path: '/leaves' },
            { title: 'Add Leave', path: '/leaves/new' },
            { title: 'Attendance', path: '/attendance' },
            { title: 'Departments', path: '/departments' },
            { title: 'Holidays', path: '/holidays' },
          ] 
        },
      ]
    },
    {
      label: 'ACCOUNT',
      items: [
        { title: 'My Account', icon: 'settings-gear', path: '/account' },
      ]
    }
  ];
  return (
    <aside 
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}
      onMouseEnter={() => !isLocked && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.header}>
        <div className={styles.logo}>METRONIC</div>
        {}
<button 
  onClick={() => setIsLocked(!isLocked)} 
  className={`${styles.toggleBtn} ${isLocked ? styles.locked : ''}`}
>
  <span className={`${styles.iconWrapper} ${isLocked ? styles.rotate180 : ''}`}>
    {}
    <Icon name="sidebar-toggle-right" size={18} />
  </span>
</button>
      </div>
      <div className={styles.menuContainer}>
        {}
        <div className="mb-2">
          <Link href="/dashboard" className={`${styles.menuItem} ${pathname === '/dashboard' ? styles.activeSub : ''}`}>
            <div className="flex items-center gap-3">
              <div className={styles.iconWrapper}><Icon name="grid-menu" /></div>
              {isExpanded && <span className={styles.label}>Dashboard</span>}
            </div>
          </Link>
        </div>
        {sections.map((section) => (
          <div key={section.label} className="mt-4">
            {isExpanded && <p className={styles.sectionLabel}>{section.label}</p>}
            {section.items.map((item) => (
              <div key={item.title} className="mb-1">
                {!item.children ? (
                   <Link href={item.path || '#'} className={`${styles.menuItem} ${pathname === item.path ? styles.activeSub : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={styles.iconWrapper}><Icon name={item.icon} /></div>
                        {isExpanded && <span className={styles.label}>{item.title}</span>}
                      </div>
                      {isExpanded && item.isSoon && <span className={styles.soonBadge}>Soon</span>}
                   </Link>
                ) : (
                  <>
                    <div className={styles.menuItem} onClick={() => toggleGroup(item.title)}>
                      <div className="flex items-center gap-3">
                        <div className={styles.iconWrapper}><Icon name={item.icon} /></div>
                        {isExpanded && <span className={styles.label}>{item.title}</span>}
                      </div>
                      {isExpanded && <span className="text-gray-400 font-bold">{openGroups.includes(item.title) ? <IoChevronUp size={16} /> : <IoChevronDown size={16} />}</span>}
                    </div>
                    <div className={`${styles.submenuWrapper} ${isExpanded && openGroups.includes(item.title) ? styles.submenuOpen : ''}`}>
                      <div className={styles.submenuContent}>
                        {item.children.map(child => (
                          <Link 
                            key={child.title} 
                            href={child.path} 
                            className={`${styles.subItem} ${pathname === child.path ? styles.activeSub : ''}`}
                          >
                            <div className={styles.bulletDot} /> 
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};
export default SidebarV1;
