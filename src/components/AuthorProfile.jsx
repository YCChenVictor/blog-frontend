import React, { useState, useEffect } from 'react';
import headImg from '../assets/img/head.jpeg'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const AuthorProfile = () => {
  return (
    <div className="prose bg-gray-400 p-4">
      <div className='p-4'>
        <div className="text-center text-indigo flex items-center justify-center flex-col">
          <img className="mx-auto p-4 rounded-full" src={headImg} alt="author profile" />
          <p className="text-5xl font-bold">YCChen</p>
          <p className="text-gray-500 pb-4">Software Engineer</p>
          <div className="text text-indigo font-mono">
            <p>
              Hello and welcome to my personal blog! Have fun and have a good day!
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
    </div>
  );
};

export default AuthorProfile;
  