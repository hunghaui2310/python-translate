import React, {useEffect, useRef, useState} from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {message, Upload, Progress, Empty, Button, Tooltip, Select} from 'antd';
import {CloseOutlined, DownloadOutlined, CheckOutlined, RightOutlined} from '@ant-design/icons';
import {BASE_URL, downloadFile, uploadFile} from "../services/UploadService";
import {getCountry} from "../services/OpenAPIService";
import logoPPT from '../assets/images/ppt-icon-499.png';

const dataCountries = require('../assets/data/data1.json');

const {Dragger} = Upload;

const UploadFile = () => {

  const [successFiles, setSuccessFiles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [langSource, setLanguageSource] = useState('auto');
  const [langDestination, setLangDestination] = useState('vi');

  const dummyRequest = ({info, onSuccess}) => {
    // setTimeout(() => {
    //   onSuccess("done");
    // }, 0);
  };

  const getCountryCode = () => {
    getCountry().then(res => {
      const countries = res.map(country => {
        return {
          value: country.code,
          label: country.name,
        }
      });
      // setCountries([{value: 'auto', label: 'Auto'}, ...countries]);
    })
  }

  useEffect(() => {
    // getCountryCode();
    setCountries(dataCountries.data);
  }, []);

  const handleChangeUpload = (info) => {

    let newFileList = [...info.fileList];
    const files = newFileList.filter(file => {
      if (file.xhr) {
        return file;
      }
    });
    setSuccessFiles(files);
    // switch (info.file.status) {
    //   case "uploading":
    //     const formData = new FormData();
    //     formData.append('file', info.file.originFileObj);
    //     uploadFile(formData).then((result) => {
    //
    //       if (result.ok) {
    // console.log("ok = ", info.file);
    // const files = fileList.filter(f => f.uid === info.file.uid);
    // console.log('info = ', files);
    // setTimeout(() => {
    //   setSuccessFiles([{...successFiles, ...info.file}]);
    // });
    //     }
    //   })
    //     .catch((error) => {
    //       console.log("error", info.file);
    //       message.error(`${info.file.name} file upload failed.`);
    //     });
    //   break;
    //
    // case "done":
    //   message.success(`${info.file.name} file uploaded successfully.`);
    //   break;
    //
    // case "removed":
    //   message.success(`${info.file.name} file removed successfully.`);
    //   break;
    //
    // default:
    //   message.error(`${info.file.name} file upload failed.`);
    //   break;
    // }
  }

  const changeStateDownload = (item) => {
    setSuccessFiles(successFiles.map(file => {
      if (file.uid === item.uid) {
        file.isDownloaded = true;
      }
      return file;
    }));
  };

  const handleDownload = (item) => {
    downloadFile(item.name).then(res => {
      const file = new Blob([res], {type: 'application/vnd.ms-powerpoint'});
      let url = URL.createObjectURL(file);
      let a = document.createElement('a');
      a.href = url;
      a.download = item.name;
      a.click();
      window.URL.revokeObjectURL(url);
      changeStateDownload(item);
      message.success(`${item.name} file downloaded successfully.`);
    }).catch((err) => {
      changeStateDownload(item);
      message.error(`${item.name} file download failed.`);
    });
  };

  const props = {
    name: 'file',
    multiple: true,
    height: 400,
    action: BASE_URL + '/api/files/',
    onChange: handleChangeUpload,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
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
        <RightOutlined style={{fontSize: '60px'}}/>
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
                <Button shape="circle" danger ghost icon={<CloseOutlined/>}/>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default UploadFile;
