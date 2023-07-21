import React, { useState, useEffect } from 'react';
import { CodeSandboxCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { Button, Modal, Form, Input, Table, Upload,Select, Typography } from 'antd';
import api from './api';
import { FilePond, File, registerPlugin } from 'react-filepond'
import './filepond.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { create } from 'filepond';

const input = document.querySelector('input[type="file"]');
create(input, {
  storeAsFile: true,
});

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const { Title } = Typography;
export default function UploadUser() {
  const [file, setFile] = useState([]);
  const [displayFile, setDisplayFile] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const [currentZones, setCurrentZones] = useState([]);

  const loadZones = async () => {
    const zonesData = await api.getZones();
    setZones(
      zonesData.map((val) => {
        return {
          label: val.name,
          value: val._id,
        };
      })
    );
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    setConfirmLoading(true);
    await api.addUser({
      name: name,
      image: image,
      fileType: fileType,
    });
    // await loadUsers();
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMenuClick = (e) => {
    if (e) {
      setSubmitDisabled(false);
    }
  };

  const loadUsers = async () => {
    const usersData = await api.getUsers();
    setUsers(
      usersData.map((user) => {
        return {
          name: user.name,
          image: Array.isArray(user.images) && user.images[0],
          userId: user._id,
          zoneIds: user.zoneIds,
        };
      })
    );
  };

  useEffect(() => {
    (async () => {
      await loadUsers();
      await loadZones();
    })();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Photo',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => {
        return (
          <img style={{ width: 200 }} alt="No Image" src={record?.image} />
        );
      },
    },
    {
      title: 'Zone Ids',
      dataIndex: 'zoneIds',
      key: 'zoneIds',
      render: (_, record) => {
        return (record?.zoneIds || []).map((zone) => (
          <p
            style={{
              color: '#1677FF',
              fontWeight: 'semibold',
            }}
          >
            [{zone}]
          </p>
        ));
      },
    },
  ];

  const handleZoneSelect = (e) => {
    setCurrentZones([e, ...currentZones]);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setIsModalOpen(false);
    setConfirmLoading(true);
    await api.addUser({
      file: data.file[0],
      name : name,
      zones : currentZones,
    });
    await loadUsers();
    setConfirmLoading(false);
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 20 }}>
        Add Users
      </Title>
      <Button onClick={showModal} style={{ marginBottom: 20 }}>
        Add User
      </Button>
      <Table dataSource={users} columns={columns} />
      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        destroyOnClose={true}
        footer={[
          <Button
            type="primary"
            form="myForm"
            key="submit"
            htmlType="submit"
            disabled={submitDisabled}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{display : 'flex', flexDirection : 'column', justifyContent : 'space-evenly'}}>
            <FilePond
            files={displayFile}
            onupdatefiles={(fileData) => { console.log(fileData); 
              if(Array.isArray(fileData) && fileData.length) {
                setFile(fileData[0].file)
                console.log(file);
              } 
            }}
            allowMultiple={false}
            maxFiles={1}
            name="user_image"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            
            />
          {/* <input type="file" {...register('file')} /> */}
          <label style={{display : 'flex' , justifyItems : 'center', alignItems : 'center'}}>
            Name
            <Input
                placeholder="Please, enter the name of the user"
                onChange={(data) => setName(data.target.value)}
                style={{marginLeft : 10}}
              />
          </label>
         
          <Select
            mode='multiple'
            placeholder = 'select zones'
            onSelect={handleZoneSelect}
            options={zones}
            style={{marginTop : 15}}
          />
          <input type="submit" style={{marginTop :15 , padding : 8}} />
        </form>
      </Modal>
    </div>
  );
}
