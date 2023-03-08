import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, ProSidebarProvider, SubMenu } from 'react-pro-sidebar';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function SidebarLayout() {
  const [menuItems, setMenuItems] = useState('testing')
  useEffect(() => {
    const queriedTitles = [...document.querySelectorAll('h2, h3, h4, h5, h6')];
    const titles = queriedTitles.map(
      item => ({id: item.id, tag: item.tagName.match(/\d+/)[0], position: queriedTitles.indexOf(item)})
    )
    const menuItemsDesired = titles.map((title) => (<MenuItem
      rootStyles={{
        'font-size': 48 / title.tag + 'px'
      }}
      routerLink={
        <HashLink to={`#${title.id}`} />
      }
    >{title.id}
    </MenuItem>))
    setMenuItems(menuItemsDesired)
  }, [])
  return (
    <div style={{ display: 'flex', height: '75vh', overflow: 'auto' }} >
      <ProSidebarProvider>
        <BrowserRouter>
          <Sidebar>
            <Menu>
              {menuItems}
            </Menu>
          </Sidebar>
          <Routes>
            <Route path="#why"/>
          </Routes>
        </BrowserRouter>
      </ProSidebarProvider>
    </div>
  );
}

export default SidebarLayout;
