import React from 'react';

interface MenuItemProps {
  item: string;
  onClick: () => void;
  isScrolled: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onClick, isScrolled }) => (
  <li>
    <a
      onClick={onClick}
      className={`${
        isScrolled ? 'text-gray-900' : 'text-white'
      } text-sm font-semibold leading-6 hover:text-[#4FD1C5] cursor-pointer`}
    >
      {item
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}
    </a>
  </li>
);