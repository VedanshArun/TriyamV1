import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Dropdown,
  Space,
  Select,
  Table,
  Col,
} from 'antd';
import api from './api';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import { MediumCircleFilled } from '@ant-design/icons';


export default function PreviewFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualRtsp, setManualRtsp] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [rtspLinks, setRtspLinks] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [zones, setZones] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [currentZone, setCurrentZone] = useState(null);
  const [currentRtspLink, setCurrentRtspLink] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const canvasRef = useRef(null);
  let player = null;

  

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    setConfirmLoading(true);
    await api.addFeed({
      rtspUrl: currentRtspLink,
      zoneId: currentZone,
      cameraName: name,
      description: description,
    });
    await loadFeeds();
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleScan = async () => {
    setScanLoading(true);
    await scanRtspLinks();
    setScanLoading(false);
  };

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

  const getRtspLinks = async () => {
    const data = await api.getRtspUrls();
    setRtspLinks(
      data.map((val) => {
        return { value: val, label: val };
      })
    );
  };

  const scanRtspLinks = async () => {
    const data = await api.scanRtspLinks({ username, password });
    setRtspLinks(
      data.map((val) => {
        return { value: val, label: val };
      })
    );
  };

  const handleMenuClick = (e) => {
    if (e) {
      setCurrentRtspLink(e);
      setSubmitDisabled(false);
      startStream(e);
    }
  };

  const startStream = function (url) {
    try {
      if (url) {
        console.log(url);
        (async () => {
          if (player && player.stop) {
            player.stop();
          }
          const wsLink = await api.getStreamLink({ rtspLink: url });
          player = new JSMpeg.Player(wsLink, {
            canvas: document.getElementById('canvas'),
            videoBufferSize: 1024 * 1024 * 16,
          });
        })();
      }
      return <a></a>;
    } catch (error) {
      console.log(error);
    }
  };

  const handleZoneSelect = (e) => {
    setCurrentZone(e);
  };

  const loadFeeds = async () => {
    const feedsData = await api.getFeeds();
    setFeeds(
      feedsData.map((val) => {
        return {
          name: val.cameraName,
          description: val.description,
          rtspLink: val.rtspUrl,
          zoneId: val.zoneId,
        };
      })
    );
  };

  useEffect(() => {
    (async () => {
      await getRtspLinks();
      await loadZones();
      await loadFeeds();
    })();
  }, []);

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'RTSP Link',
      dataIndex: 'rtspLink',
      key: 'rtspLink',
    },
    {
      title: 'Zone Id',
      dataIndex: 'zoneId',
      key: 'zoneId',
    },
    {
      title: 'Preview',
      dataIndex: 'preview',
      key: 'preview',
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={showModal} style={{marginBottom : 10}}>Add Camera</Button>
      <Table dataSource={feeds} columns={columns} />
    </div>
  );
}


