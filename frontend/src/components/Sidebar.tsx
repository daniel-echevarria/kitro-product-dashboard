import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <nav className="w-64 bg-[#323232] text-white p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#ED695F] mb-8">KITRO</h1>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? 'text-white font-semibold border-l-3 border-[#507E6A] pl-3'
            : 'text-gray-300 hover:text-white border-l-3 border-transparent pl-3'
        }
      >
        Overview
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? 'text-white font-semibold border-l-3 border-[#507E6A] pl-3'
            : 'text-gray-300 hover:text-white border-l-3 border-transparent pl-3'
        }
      >
        Products
      </NavLink>
    </nav>
  );
};
