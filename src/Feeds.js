import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Select,
  Table,
  Typography,
} from 'antd';
import api from './api';
import JSMpeg from '@cycjimmy/jsmpeg-player';

const { Title } = Typography;

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
    render: (link) => <p style={{ color: '#1677FF' }}>{link}</p>,
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
        <Button
          onClick={async () => {
            await api.getStreamLink({ rtspLink: record.rtspLink });
          }}
        >
          Preview
        </Button>
      </div>
    ),
  },
];

export default function Detections() {
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
  const [isModal2Open, setIsModal2Open] = useState(false);
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

  return (
    <div>
      <Title level={2} style={{ marginBottom: 20 }}>
        Add Cameras
      </Title>
      <Button onClick={showModal} style={{ marginBottom: 20 }}>
        Add Camera
      </Button>
      <Table dataSource={feeds} columns={columns} />
      <Modal
        title="Add Feed"
        open={isModal2Open}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        destroyOnClose={true}
        footer={[
          <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            disabled={submitDisabled}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      ></Modal>
      <Modal
        title="Add Feed"
        open={isModalOpen}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        destroyOnClose={true}
        footer={[
          <Button
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
        <Form>
          <Form.Item label="Name">
            <Input
              placeholder="Please, enter cam name"
              onChange={(data) => setName(data.target.value)}
            />
            <Input
              placeholder="Please, enter cam description"
              onChange={(data) => setDescription(data.target.value)}
            />
          </Form.Item>
          <Select
            defaultValue="select zone"
            onSelect={handleZoneSelect}
            options={zones}
          />
          <p>RTSP Setup</p>
          <p>
            Manually Enter RTSP Link:{' '}
            <Switch
              onChange={() => {
                setManualRtsp(!manualRtsp);
              }}
            ></Switch>
          </p>

          {manualRtsp ? (
            <Form.Item label="RTSP Link">
              <Input
                placeholder="Please, enter rtsp link"
                onChange={(data) => setName(data.target.value)}
              />
            </Form.Item>
          ) : (
            <div>
              Camera Login Details
              <Form.Item label="Username">
                <Input
                  placeholder="Please, enter cam username."
                  onChange={(data) => setUsername(data.target.value)}
                />
              </Form.Item>
              <Form.Item label="Password">
                <Input
                  placeholder="Please, enter cam password."
                  onChange={(data) => setPassword(data.target.value)}
                />
              </Form.Item>
              <Button onClick={handleScan} loading={scanLoading}>
                Scan RTSP Links
              </Button>
              <Form.Item>
                {/* <Dropdown
                  menu={{ items: rtspLinks, onClick: handleMenuClick }}
                  disabled={scanLoading}
                >
                  <Button>RTSP LINKS AVAILABLE</Button>
                </Dropdown> */}
                <Select
                  disabled={scanLoading}
                  defaultValue="select rtsp"
                  options={rtspLinks}
                  onSelect={handleMenuClick}
                />
              </Form.Item>
              <Form.Item>
                <canvas
                  id="canvas"
                  ref={canvasRef}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    zindex: 0,
                    width: 300,
                    height: 200,
                  }}
                />
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
}
