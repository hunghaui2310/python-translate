import React from 'react';

const Statistic = () => {

  return (
    <>
      <div className="row justify-content-center pb-100">
        <div className="col">
          <div className="about-content pt-45">
            <div className="about-counter">
              <div className="d-flex justify-content-around">
                <div className="single-counter counter-color-1 mt-30 d-flex wow fadeInUp" data-wow-duration="1s"
                     data-wow-delay="0.3s">
                  <div className="counter-shape">
                    <span className="shape-1"></span>
                    <span className="shape-2"></span>
                  </div>
                  <div className="counter-content media-body">
                    <span className="counter-count"><span className="counter">350</span></span>
                    <p className="text">Files Translated</p>
                  </div>
                </div>
                <div className="single-counter counter-color-2 mt-30 d-flex wow fadeInUp" data-wow-duration="1s"
                     data-wow-delay="0.6s">
                  <div className="counter-shape">
                    <span className="shape-1"></span>
                    <span className="shape-2"></span>
                  </div>
                  <div className="counter-content media-body">
                    <span className="counter-count"><span className="counter">99</span></span>
                    <p className="text">Clients</p>
                  </div>
                </div>
                <div className="single-counter counter-color-3 mt-30 d-flex wow fadeInUp" data-wow-duration="1s"
                     data-wow-delay="0.9s">
                  <div className="counter-shape">
                    <span className="shape-1"></span>
                    <span className="shape-2"></span>
                  </div>
                  <div className="counter-content media-body">
                    <span className="counter-count"><span className="counter">870</span></span>
                    <p className="text">Usages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Statistic;
