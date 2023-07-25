import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { HashLink } from 'react-router-hash-link';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const SidebarLayout = ({height, rawTitles}) => {
  const [isExpand, setIsExapand] = useState(true);
  const titles = rawTitles.map((item) => ({
    content: item.content,
    tagName: item.tagName.match(/\d+/)[0],
    position: rawTitles.indexOf(item)
  }))
  const menuItemsDesired = titles.map((title, index) => (
    <MenuItem
      key={index}
      component={<HashLink to={`#${title.content.toLowerCase().replace(/[?!,-]+/g, '').replace(/\s+/g, '-')}`} />}
    >
      {title.content}
    </MenuItem>
  ))

  useEffect(() => {
    if (window.innerWidth > 1280) {
      setIsExapand(false)
    } else {
      setIsExapand(true)
    }
  }, [])

  return (
    <div style={{ display: 'flex', height: height }} >
      <Sidebar
        backgroundColor="rgb(156 163 175)"
        collapsed={isExpand}
      >
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              setIsExapand(!isExpand)
            }}
            style={{ textAlign: "center" }}
          >
          {" "}
         
        </MenuItem>
          {menuItemsDesired}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SidebarLayout
