import React from 'react'
import { Sidebar } from '../components/sidebar'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-white dark:bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        {/* Add padding-left on mobile to avoid hamburger overlap */}
        <div className="pt-16 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout