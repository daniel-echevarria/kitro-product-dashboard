import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
