import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, ProSidebarProvider, SubMenu } from 'react-pro-sidebar';
import { BrowserRouter, Link } from 'react-router-dom';

function SidebarLayout() {
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    setTitles(
      [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(
        item => ({id: item.id, tag: item.tagName})
      )
    )
  }, []);
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <ProSidebarProvider>
        <BrowserRouter>
          <Sidebar>
            <Menu>
              <SubMenu label="Charts">
                <SubMenu label="AAa">
                  <MenuItem routerLink={<Link to="#why" />}> Documentation</MenuItem>
                </SubMenu>
              </SubMenu>
            </Menu>
          </Sidebar>
        </BrowserRouter>
      </ProSidebarProvider>
    </div>
  );
}

export default SidebarLayout;
