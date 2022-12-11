import { Sidebar, Menu, SubMenu, MenuItem, ProSidebarProvider, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

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
