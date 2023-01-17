import logo from '../assets/images/logo-image.png';
import React from "react";

const Footer = () => {

  return (
    <footer id="footer" className="footer-area bg_cover">
      <div className="container">
        <div className="footer-widget pt-30 pb-70">
          <div className="row">
            <div className="col-lg-3 col-sm-6 order-sm-1 order-lg-1">
              <div className="footer-about pt-40">
                <a href="#">
                  <img src={logo} alt="Logo" height={50}/>
                </a>
                <hr/>
                <span><span className="title-footer">ISO 17100 certified Language Service</span> for your business</span>
                <hr/>
                <span><span className="title-footer">MOBICO</span> by Saltlux Innovation specializes in multilingual translating and localizing.
                  Our team works closely with professional linguists from over 50 countries and territories across the globe.
                  We are committed to providing you with the best language services at reasonable prices.</span>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 order-sm-3 order-lg-2">
              <div className="footer-link pt-40">
                <div className="footer-title">
                  <h5 className="title">Services</h5>
                </div>
                <ul>
                  <li><a href="https://mobico.com/translation-service/" target="_blank">Translation</a></li>
                  <li><a href="https://mobico.com/localization-services/" target="_blank">Localization</a></li>
                  <li><a href="https://mobico.com/transcription-and-subtitling/" target="_blank">Transcription & Subtitling</a></li>
                  <li><a href="https://mobico.com/language-sign-off/" target="_blank">Language Sign Off</a></li>
                  <li><a href="https://mobico.com/language-quality-assurance/" target="_blank">Language Quality Assurance</a></li>
                  <li><a href="https://mobico.com/desktop-publishing/" target="_blank">Desktop Publishing</a></li>
                  <li><a href="https://mobico.com/machine-translation-post-editing-mtpe/" target="_blank">Machine Translation Post-Editing</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 order-sm-4 order-lg-3">
              <div className="footer-link pt-40">
                <div className="footer-title">
                  <h5 className="title">Company</h5>
                </div>
                <ul>
                  <li><a href="https://mobico.com/about-mobico/" target="_blank">Our Story</a></li>
                  <li><a href="https://mobico.com/our-clients/" target="_blank">Our Clients</a></li>
                  <li><a href="https://mobico.com/translation-tools/" target="_blank">Technologies & Tools</a></li>
                  <li><a href="https://mobico.com/project-management-system-vpms/" target="_blank">VPMS</a></li>
                  <li><a href="https://mobico.com/contact-us/" target="_blank">Contact Us</a></li>
                  <li><a href="https://mobico.com/translation-jobs-careers/" target="_blank">Careers</a></li>
                  <li><a href="https://mobico.com/privacy-policy/" target="_blank">Privacy Policy</a></li>
                  <li><a href="https://mobico.com/terms-conditions/" target="_blank">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 order-sm-2 order-lg-4">
              <div className="footer-contact pt-40">
                <div className="footer-title">
                  <h5 className="title">Contact Info</h5>
                </div>
                <div className="contact pt-10">
                  <p className="text">Daewoong Building, 538 Eonju-ro, <br/>
                    Gangnam-gu, Seoul, Korea</p>

                  <p className="text">Vien Dong Building, 36 Hoang Cau, <br/>
                    Hanoi, Vietnam</p>
                  <p className="text">mobico@saltlux.com</p>

                  <ul className="social mt-40">
                    <li><a href="https://www.facebook.com/mobicobysaltluxinno" target="_blank"><i className="lni-facebook"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/mobicobysaltluxinno/" target="_blank"><i className="lni-linkedin"></i></a></li>
                    <li><a href="https://twitter.com/MOBICObySaltlux" target="_blank"><i className="lni-twitter"></i></a></li>
                    <li><a href="https://www.instagram.com/mobicobysaltluxinno/?hl=en" target="_blank"><i className="lni-instagram"></i></a></li>
                    <li><a href="https://www.instagram.com/mobicobysaltluxinno/?hl=en" target="_blank"><i className="lni-network"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center">
          <p className="text">© 2022 MOBICO by <a href="https://mobico.com/" rel="nofollow" target="_blank">Saltlux Innovation</a> All Rights
            Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
