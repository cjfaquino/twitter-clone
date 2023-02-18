import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import GoogleIcon from '../../assets/GoogleIcon';

interface IProps {
  emailProviderStatus: boolean | null;
  googleStatus: boolean | null;
  githubStatus: boolean | null;
  handleEmailProvider: React.MouseEventHandler<HTMLButtonElement>;
  handleGoogle: React.MouseEventHandler<HTMLButtonElement>;
  handleGithub: React.MouseEventHandler<HTMLButtonElement>;
}

const LinkProviderButtons = ({
  emailProviderStatus,
  handleEmailProvider,
  handleGithub,
  handleGoogle,
  githubStatus,
  googleStatus,
}: IProps) => (
  <section className='link-accounts'>
    <span className='error' />

    {emailProviderStatus && (
      <button
        type='button'
        onClick={handleEmailProvider}
        className='btn-with-provider'
      >
        <FontAwesomeIcon icon={faPaperPlane} />
        Unlink Email account
      </button>
    )}

    <button type='button' onClick={handleGithub} className='btn-with-provider'>
      <FontAwesomeIcon icon={faGithub as IconProp} />
      {githubStatus ? 'Unlink' : 'Link'} Github account
    </button>

    <button type='button' onClick={handleGoogle} className='btn-with-provider'>
      <GoogleIcon />
      {googleStatus ? 'Unlink' : 'Link'} Google account
    </button>
  </section>
);

export default LinkProviderButtons;
