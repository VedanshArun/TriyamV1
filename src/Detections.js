import React, { useState, useEffect } from 'react';
import { Table, Typography, Modal, Button, Card } from 'antd';
import api from './api';
const { Meta } = Card;

const { Title } = Typography;

export default function Detections() {
  const [alerts, setAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordData, setRecordData] = useState({});

  const showModal = (record) => {
    setRecordData(record);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadAlerts = async () => {
    const alertData = await api.getAlerts();
    setAlerts(
      alertData.map((val) => {
        return {
          id: val._id,
          alertName: val.alert.title,
          camera: val.cameraName,
          time: val.updatedAt,
          body: val.alert.body,
          preview: val,
          snap: val?.alert?.data?.url,
        };
      })
    );
  };

  useEffect(() => {
    (async () => {
      await loadAlerts();
    })();
  }, []);

  const columns = [
    {
      title: 'Alert ID',
      dataIndex: 'id',
      key: 'id',
      render: (generatedId) => (
        <p style={{ color: '#1677FF' }}>{generatedId}</p>
      ),
    },
    {
      title: 'Alert',
      dataIndex: 'alertName',
      key: 'alertName',
    },
    {
      title: 'Region',
      dataIndex: 'camera',
      key: 'camera',
      render: (area) => <div>{area}</div>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Message',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Preview',
      dataIndex: 'preview',
      key: 'preview',
      render: (record) => {
        return (
          <div>
            <Button type="primary" onClick={() => showModal(record)}>
              Preview
            </Button>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Title>Alert Information</Title>
              <div style={{ marginTop: 30 }}>
                <p>
                  <b>Alert ID</b> : {recordData._id}
                </p>
                <p>
                  <b>Alert Title</b> : {recordData?.alert?.title}
                </p>
                <p>
                  <b>Person Detected</b> : {recordData.label}
                </p>
                <p>
                  <b>Camera Location</b> : {recordData.cameraName}
                </p>
                <p>
                  <b>Time of Detection</b> : {recordData.updatedAt}
                </p>
                <p>
                  <b>Message</b> : {recordData?.alert?.body}
                </p>
                <Card
                  style={{ width: 360 }}
                  cover={<img alt="snap" src={recordData?.url} />}
                >
                  <Meta title="Snapshot" />
                </Card>
              </div>
            </Modal>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 20 }}>
        Alerts
      </Title>
      <Table
        columns={columns}
        dataSource={alerts}
        pagination={{ defaultPageSize: 5, showSizeChanger: false }}
      />
    </div>
  );
}
