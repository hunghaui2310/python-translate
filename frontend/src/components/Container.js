import React from 'react';
import Statistic from "./Statistic";
import UploadFile from "./UploadFile";
import Welcome from "./Welcome";
import './custom-component.css';

const Container = () => {

  return (
    <div className="container">
      <Welcome/>
      <UploadFile/>
      {/*<Statistic/>*/}
      <div className="pt-100"/>
    </div>
  )
};

export default Container;
