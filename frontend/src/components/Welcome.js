import React, {useEffect} from "react";
import {testCallAPI, translate} from "../services/TranslateService";

const Welcome = () => {

  useEffect(() => {
      testCallAPI().then();
  })

  return (
    <div className="row justify-content-center mt-130">
      <div className="col-lg-9">
        <div className="about-title text-center wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
          <h6 className="welcome">WELCOME</h6>
          <h3 className="title"><span>MOBICO TRANSLATE </span> auto translate your file
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Welcome;
