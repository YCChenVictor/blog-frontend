import React, { useState, useEffect } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { HashLink } from 'react-router-hash-link'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"

const SidebarLayout = ({onToggleExpand, height, rawTitles}) => {
  const [isExpand, setIsExapand] = useState(true);
  const titles = rawTitles.map((item) => ({
    content: item.content,
    tagName: item.tagName.match(/\d+/)[0],
    position: rawTitles.indexOf(item)
  }))
  const textSizeMapping = {
    '2': 'text-xl',
    '3': 'text-lg',
    '4': 'text-base',
    '5': 'text-sm',
    '6': 'text-xs',
  }
  const textColorMapping = {
    '2': 'text-zinc-900',
    '3': 'text-zinc-800',
    '4': 'text-zinc-700',
    '5': 'text-zinc-600',
    '6': 'text-zinc-500',
  }
  const menuItemsDesired = titles.map((title, index) => (
    <MenuItem
      key={index}
      component={<HashLink to={`#${title.content.toLowerCase().replace(/[?!,-]+/g, '').replace(/\s+/g, '-')}`} />}
    >
      <p
        className={`${textColorMapping[title.tagName]} pl-${title.tagName} ${textSizeMapping[title.tagName]}`}
      >
        {title.content}
      </p>
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
              setTimeout(() => {
                onToggleExpand()
              }, 400);
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
