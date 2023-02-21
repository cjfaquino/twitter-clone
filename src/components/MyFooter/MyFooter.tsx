import React from 'react';
import './MyFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const MyFooter = () => (
  <footer>
    Copyright © 2023 <a href='https://github.com/cjfaquino/'>cjfaquino</a>
    <FontAwesomeIcon icon={faGithub as IconProp} />
  </footer>
);

export default MyFooter;
