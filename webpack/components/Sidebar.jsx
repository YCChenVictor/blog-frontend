import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, ProSidebarProvider, SubMenu } from 'react-pro-sidebar';
import { BrowserRouter, Link } from 'react-router-dom';

function SidebarLayout() {
  const [menuItems, setMenuItems] = useState('testing')
  useEffect(() => {
    const queriedTitles = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const titles = queriedTitles.map(
      item => ({id: item.id, tag: item.tagName.match(/\d+/)[0], position: queriedTitles.indexOf(item)})
    )
    const menuItemsDesired = titles.map((title) => (<MenuItem>{title.id}</MenuItem>))
    setMenuItems(menuItemsDesired)
  }, []);
  // console.log(titles)
  // const menuItems = titles.map(title => <MenuItem label={title.id}>testing</MenuItem>)
  // console.log(menuItems)
  // const subMenu = menuItems.foreach(menuItem => menu.pushObject(menuItem))
  // console.log(subMenu)
  return (
    <div style={{ display: 'flex', height: '100%' }} >
      <ProSidebarProvider>
        <BrowserRouter>
          <Sidebar>
            <Menu>
              {menuItems}
            </Menu>
          </Sidebar>
        </BrowserRouter>
      </ProSidebarProvider>
    </div>
  );
}

export default SidebarLayout;
