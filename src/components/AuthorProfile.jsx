import React, { useState, useEffect } from 'react';
import headImg from '../assets/img/head.jpeg'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const AuthorProfile = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className="prose bg-gray-400 p-4 flex">
      <Sidebar
        backgroundColor="rgb(156 163 175)"
        collapsed={!isCollapsed}
      >
        <Menu>
          <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                setIsCollapsed(!isCollapsed)
              }}
              style={{ textAlign: "center" }}
            >
            {" "}
           
          </MenuItem>
          <MenuItem
            key={4}
            component={<Link to="/blog/investment" />}
          >
            {'Investment'}
          </MenuItem>
          <MenuItem
            key={1}
            component={<Link to="/blog/software" />}
          >
            {'Software'}
          </MenuItem>
          <MenuItem
            key={2}
            component={<Link to="/blog/medicine" />}
          >
            {'Medicine'}
          </MenuItem>
          <MenuItem
            key={3}
            component={<Link to="/blog/aesthetics" />}
          >
            {'Aesthetics'}
          </MenuItem>
        </Menu>
      </Sidebar>
      <div className='p-4'>
        <div className="text-center text-indigo">
          <img className="mx-auto p-4 rounded-full" src={headImg} alt="author profile" />
          <p className="text-5xl font-bold">YCChen</p>
          <p className="text-gray-500 pb-4">Software Engineer</p>
        </div>
        <div className="text-left text-indigo font-mono">
          <p>
            Hello and welcome to my personal blog! Have fun and have a good day! I was born and raised in Taiwan, and I've always had a passion for software. I graduated from National Taiwan University with a degree in economics, and I am now working as a software engineer.
          </p>
          <p>
            In my free time, you can usually find me developing websites, composing music, painting, and working out, or spending time with my family and pet. I also love to explore new topics and ideas.
          </p>
          <p>
            Through this blog, I aim to share my unique perspective on a wide range of topics, with a primary focus on the software field at present. I firmly believe in the power of knowledge and innovation to propel humanity forward, and I am dedicated to living my life in alignment with these values.
          </p>
          <p>
            Thank you for taking the time to get to know me a little better, and I look forward to connecting with you through this blog!
          </p>
        </div>
        <div className='text-center'>
          <a href={'https://github.com/YCChenVictor'} target="_blank" rel="noopener noreferrer">
            <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </a>
          <a href={'https://www.linkedin.com/in/ycchen1'} target="_blank" rel="noopener noreferrer">
            <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <FontAwesomeIcon icon={faLinkedin} />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
  