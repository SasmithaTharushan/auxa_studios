import React from 'react';
import './Footer.css';
import youtube_icon from '../../assets/youtube_icon.png';
import facebook_icon from '../../assets/facebook_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import instagram_icon from '../../assets/instagram_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={facebook_icon} alt="Facebook" />
        <img src={twitter_icon} alt="Twitter" />
        <img src={instagram_icon} alt="Instagram" />
        <img src={youtube_icon} alt="YouTube" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Corporate Information</li>
        <li>Cookie Preferences</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'> 2018-2025 Auxa, Inc.</p>
    </div>
  );
};

export default Footer;