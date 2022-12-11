import {useEffect} from 'react';
import { Sidebar, Menu, SubMenu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';

function SidebarLayout() {
  useEffect(() => {
    const el = document.querySelector('h1, h2, h3, h4, h5, h6');
  }, []);
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <ProSidebarProvider>
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
      </ProSidebarProvider>
    </div>
  );
}

export default SidebarLayout;
