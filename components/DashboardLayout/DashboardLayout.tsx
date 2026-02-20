"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-y-hidden overflow-x-visible">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onMobileSidebarToggle={() => setIsMobileSidebarOpen((prev) => !prev)}
          onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
        />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          backgroundColor: 'var(--md-sys-color-background)'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
