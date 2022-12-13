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
  console.log(titles)
  const restructuredTitles = (titles) => {
    result = {'H1': []} // TBC
    for (let i = 0; i < titles.length; i++) {
      if(titles[i].tagName > titles[i-1].tagName) {
        result.
      }
    }
    titles.forEach({
      if 
    })
    while (titles.length > 0) {
      titles.forEach({
      
      })
    }
  }
  // const menu = restructuredTitles.map((title) => {
  //   return(<div label={title}></div>) // 這邊在用 node 的演算法
  // })
  // console.log(menu)
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <ProSidebarProvider>
        <BrowserRouter>
          {/* <Sidebar>
            <Menu>
              <SubMenu label="Charts">
                <SubMenu label="AAa">
                  <MenuItem routerLink={<Link to="#why" />}> Documentation</MenuItem>
                  <SubMenu label="AAa">
                    <MenuItem routerLink={<Link to="#why" />}> Documentation</MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
            </Menu>
          </Sidebar> */}
        </BrowserRouter>
      </ProSidebarProvider>
    </div>
  );
}

export default SidebarLayout;
