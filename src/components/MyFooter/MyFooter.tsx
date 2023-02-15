import React from 'react';
import './MyFooter.css';
import Logo from './GitHub-Mark-Light-64px.png';

const MyFooter = () => (
  <footer>
    Copyright © 2023 <a href='https://github.com/cjfaquino/'>cjfaquino</a>
    <img src={Logo} alt='github user: cjfaquino' />
  </footer>
);

export default MyFooter;
