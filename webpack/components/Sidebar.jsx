import { Sidebar, Menu, SubMenu, MenuItem, ProSidebarProvider, useProSidebar } from 'react-pro-sidebar';
import { HashLink as Link } from 'react-router-hash-link';

function SidebarLayout() {
  console.log('testing')
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
