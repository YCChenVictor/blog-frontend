import { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function BurgerSidebarLayout() {
  const [menuItems, setMenuItems] = useState('testing')
  const [windowWidth, setWindowWidth] = useState(0)

  if (windowWidth < 1440) {
    return (
      <div style={{ display: 'flex', height: '75vh', overflow: 'auto' }} >
        <Menu>
          <a className="menu-item" href="/">
            Home
          </a>
          <a className="menu-item" href="/about">
            About
          </a>
          <a className="menu-item" href="/contact">
            Contact
          </a>
        </Menu>
      </div>
    );
  }
}

export default BurgerSidebarLayout;
