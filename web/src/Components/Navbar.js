import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the module CSS

const Navbar = ({ onLogout }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>कौशल Quest</div>
      <div className={styles.navLinksContainer}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link to="/hackthons" className={styles.navLink}>Hackathons</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/courses" className={styles.navLink}>Courses</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/events" className={styles.navLink}>DCC</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/jobs" className={styles.navLink}>Jobs</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/workshop" className={styles.navLink}>Events</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/profile" className={styles.navLink}>Profile</Link>
          </li>
        </ul>
        <button className={styles.logoutButton} onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
