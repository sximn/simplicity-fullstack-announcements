import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './RootLayout.css';

export default function RootLayout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="content">
        <main className="main-content">
          <Outlet />
        </main>
        <footer>Shared Footer Content</footer>
      </div>
    </div>
  );
}
