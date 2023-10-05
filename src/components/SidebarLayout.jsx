import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { HashLink } from 'react-router-hash-link'

import WordCounts from './WordCounts.jsx'
import LinkPage from './LinkPage.jsx'
import Gpt from './AutoArticle/Gpt.jsx'

const SidebarLayout = ({
    isCollapsed,
    loggedIn,
    setting,
    articleContent,
    rawTitles
  }) => {
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
  const paddingLeft = {
    '2': '',
    '3': 'pl-4',
    '4': 'pl-6',
    '5': 'pl-8',
    '6': 'pl-10',
  }
  const menuItemsDesired = titles.map((title, index) => {
    return (
    <MenuItem
      key={index}
      component={<HashLink to={`#${title.content.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, '-')}`} />}
    >
      <p
        className={`${textColorMapping[title.tagName]} ${paddingLeft[title.tagName]} ${textSizeMapping[title.tagName]}`}
      >
        {title.content}
      </p>
    </MenuItem>
  )})

  return (
    <Sidebar
      backgroundColor="rgb(156 163 175)"
      collapsed={isCollapsed}
    >
      <Menu>
        <h3 className='p-4'>
          Attributes
        </h3>
        <div
          className='p-4'
        >
          <WordCounts
            articleContent={articleContent}
          />
          {loggedIn ? (
            <Gpt />
          ) : (
            <div>{}</div>
          )}
          {setting.publish ? (
            <LinkPage
              articleUrl={setting['url']}
            />
          ) : (
            <div>{}</div>
          )}
        </div>
        <h3 className='p-4'>
          Titles
        </h3>
        {menuItemsDesired}
      </Menu>
    </Sidebar>
  );
}

export default SidebarLayout
