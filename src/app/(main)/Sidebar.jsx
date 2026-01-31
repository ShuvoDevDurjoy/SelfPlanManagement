'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdChecklistRtl, MdAssignmentTurnedIn, MdEditRoad } from 'react-icons/md';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    {
      name: 'Daily Plan',
      href: '/daily_plan',
      icon: MdChecklistRtl,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Missions',
      href: '/missions',
      icon: MdAssignmentTurnedIn,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Plans',
      href: '/plans',
      icon: MdEditRoad,
      color: 'from-green-500 to-green-600'
    }
  ];

  const isActive = (href) => pathname.startsWith(href);

  return (
    <div className='h-full flex flex-col gap-4 bg-linear-to-b from-gray-50 to-white shadow-lg border border-gray-200 p-3 transition-all duration-300'>
      {/* Header */}
      <div className='flex items-center justify-between mb-2'>
        <h1 className={`text-gray-800 font-bold text-lg transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
          <span className='bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>Navigation</span>
        </h1>
      </div>

      {/* Divider */}
      <div className='h-0.5 bg-linear-to-r from-transparent via-gray-300 to-transparent' />

      {/* Menu Items */}
      <nav className='flex flex-col gap-3 flex-1'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                active
                  ? `bg-linear-to-r ${item.color} text-white shadow-md`
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {/* Background animation for inactive items */}
              {!active && (
                <div className='absolute inset-0 bg-linear-to-r from-gray-100/0 via-gray-100/30 to-gray-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              )}

              {/* Icon */}
              <div className={`shrink-0 transition-all duration-300 relative z-10 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                <Icon size={22} />
              </div>

              {/* Label */}
              <span
                className={`font-semibold text-sm transition-all duration-300 relative z-10 ${
                  isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {item.name}
              </span>

              {/* Active indicator */}
              {active && (
                <div className='absolute right-0 top-0 h-full w-1 bg-white rounded-l-full' />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Stats */}
      <div className={`mt-auto pt-4 border-t border-gray-300 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
        <div className='text-center text-xs text-gray-600 py-2 px-2 rounded-lg bg-gray-100/80'>
          <p className='font-medium text-gray-700'>Plan Manager</p>
          <p className='text-gray-500 text-xs mt-1'>v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
