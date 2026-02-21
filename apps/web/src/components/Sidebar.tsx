import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-item active' : 'nav-item';
  return (
    <aside className="sidebar">
      <nav>
        <div className="logo-container">
          <NavLink to="/" className="logo-navitem">
            <img src="/logo.webp" alt="the Seal of Test City" className="logo" />
          </NavLink>
          Test city
        </div>
        <NavLink to="/announcements" className={linkStyle}>
          Announcements
        </NavLink>
      </nav>
    </aside>
  );
}
