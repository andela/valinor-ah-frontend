import React from 'react';
import facebook from '../../../../public/images/facebook-logo-button.svg';
import twitter from '../../../../public/images/twitter-logo-button.svg';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      {/* footer for smaller screens */}
      <div className="row mobile-footer">
        <div className="col-7 m-0">
          <a href="/"><p className="d-inline m-0">Privacy Policy</p></a>
          <a href="/"><p className="d-inline pl-2 m-0">Terms of Use</p></a>
          <p className="text-muted m-0 font-weight-bold">Copyright 2018, Author’s Haven</p>
        </div>
        <div className="col-5 text-right">
          <div className="social-links">
            <a href="/"><img className="mr-3" src={facebook} alt="facebook logo" /></a>
            <a href="/"><img className="ml-3" src={twitter} alt="twitter logo" /></a>
          </div>
        </div>
      </div>

      {/* footer for bigger screens */}
      <div className="row full-width-footer">
        <div className="col-8">
          <div className="row">
            <div className="col-sm">
              <p className="text-muted footer-text m-0 pt-2 text-right">Copyright 2018, Author’s Haven</p>
            </div>
            <div className="col-sm">
              <div className="social-links text-center">
                <a href="/"><img className="mr-2" src={facebook} alt="facebook logo" /></a>
                <a href="/"><img className="ml-2" src={twitter} alt="twitter logo" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <a href="/"><p className="text-muted footer-text m-0 pt-2">Privacy Policy</p></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
