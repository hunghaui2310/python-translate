import React from 'react';
import logo              from '../assets/images/logo-image.png';

const Header = (props) => {

  return (
    <header className="header-area">
      <div className="navbar-area headroom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">
                  <img src={logo} alt="Logo" height={50}/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                  <span className="toggler-icon"/>
                  <span className="toggler-icon"/>
                  <span className="toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" className="navbar-nav m-auto">
                    {/*<li className="nav-item active">*/}
                    {/*  <a href="#home">Home</a>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*  <a href="#about">About </a>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*  <a href="#services">Services</a>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*  <a href="#portfolio">Portfolio</a>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*  <a href="#blog">Blog</a>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*  <a href="#contact">Contact</a>*/}
                    {/*</li>*/}
                  </ul>
                </div>

                <div className="navbar-btn d-none d-sm-inline-block">
                  <a className="main-btn" data-scroll-nav="0" href="/">Home</a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header;
