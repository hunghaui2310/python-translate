import React, {useEffect, useRef, useState} from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {message, Upload, Spin, Button, Tooltip, Select} from 'antd';
import {CloseOutlined, DownloadOutlined, CheckOutlined, RightOutlined} from '@ant-design/icons';
import {BASE_URL, downloadFile, getFile, uploadFile} from "../services/UploadService";
import logoPPT from '../assets/images/ppt-icon-499.png';
import axios from "axios";
import {translate} from "../services/TranslateService";

const dataCountries = require('../assets/data/data2.json');
const BASE_DOWNLOAD_URL = BASE_URL + '/media/origin/';
const {Dragger} = Upload;

const UploadFile = () => {

  const [successFiles, setSuccessFiles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [langSource, setLanguageSource] = useState('auto');
  const [langDestination, setLangDestination] = useState('vi');
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    setCountries(dataCountries.data);
  }, []);

  const handleChangeUpload = (info) => {
    if (info.file.status === 'done') {
      const file = info.file;
      const fileResponse = file.response;
      const fileName = fileResponse.file.replace(BASE_DOWNLOAD_URL, '');
      setTranslating(true);
      translate(fileName, langSource, langDestination).then(res => {
        setTranslating(false);
        setSuccessFiles([...successFiles, {
          id: fileResponse.id,
          name: decodeURI(res.data),
          isDownloaded: false
        }]);
      }).catch(err => {
        setTranslating(false);
        message.error(`${fileName} file translate failed.`);
      })
    }
  };

  const changeStateDownload = (item) => {
    setSuccessFiles(successFiles.map(file => {
      if (file.id === item.id) {
        file.isDownloaded = true;
      }
      return file;
    }));
  };

  const handleDownload = (item) => {
    downloadFile(item.name).then(res => {
      const file = new Blob([res.data]);
      let url = URL.createObjectURL(file);
      let a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', item.name);
      document.body.appendChild(a);
      a.click();
      // window.URL.revokeObjectURL(url);
      changeStateDownload(item);
      message.success(`${item.name} file downloaded successfully.`);
    }).catch((err) => {
      changeStateDownload(item);
      message.error(`${item.name} file download failed.`);
    });
  };

  const props = {
    name: 'file',
    height: 400,
    action: BASE_URL + '/api/files/',
    onChange: handleChangeUpload,
    onDrop(e) {

    }
  };

  const handleChangeSource = (e) => {
    setLanguageSource(e);
  };

  const handleChangeDestination = (e) => {
    setLangDestination(e);
  };

  return (
    <div className="d-flex pt-90 justify-content-between">
      <div className="m-2 w-40p">
        <div className="mb-2">
          <Select
            showSearch
            defaultValue={langSource}
            style={{
              width: 150,
            }}
            onChange={handleChangeSource}
            options={[{value: 'auto', label: 'Auto'}, ...countries]}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
          />
        </div>
        <Dragger
          {...props}
          accept=".ppt, .pptx"
          className="upload-result w-100"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Document Files Supported: PPT, PPTX<br/>(Max size = 100MB)
          </p>
        </Dragger>
      </div>
      <div className="m-4 pt-190">
        {translating ? <Spin size="large"/> : <RightOutlined style={{fontSize: '50px'}}/>}
      </div>
      <div className="m-2 w-40p">
        <div className="mb-2">
          <Select
            showSearch
            defaultValue={langDestination}
            style={{
              width: 150,
            }}
            onChange={handleChangeDestination}
            options={countries}
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
          />
        </div>
        <div className="upload-result">
          {successFiles && successFiles.map((item, index) =>
            <div className="upload-item m-2" key={index}>
              <div className="upload-item-image">
                <a>
                  <img height={40} src={logoPPT}/>
                </a>
                <Tooltip title={item.name}>
                  <p className="upload-title">{item.name}</p>
                </Tooltip>
              </div>
              <div className="upload-item-action">
                <Button shape="circle" type="primary" className="mr-1"
                        icon={item.isDownloaded ? <CheckOutlined/> : <DownloadOutlined/>}
                        ghost onClick={() => handleDownload(item)}/>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default UploadFile;
