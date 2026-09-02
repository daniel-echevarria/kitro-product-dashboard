import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <nav className="w-64 bg-[#323232] text-white p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#ED695F] mb-8">KITRO</h1>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-[#ED695F] font-semibold' : 'text-gray-300 hover:text-white'
        }
      >
        Overview
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? 'text-[#ED695F] font-semibold' : 'text-gray-300 hover:text-white'
        }
      >
        Products
      </NavLink>
    </nav>
  );
};
