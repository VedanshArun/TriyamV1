import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Typography } from 'antd';
import api from './api';

const { Title } = Typography;
const columns = [
  {
    title: 'Zone Id',
    dataIndex: 'zoneId',
    key: 'zoneId',
    render: (Zone) => <p style={{ color: '#1677FF' }}>{Zone}</p>,
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Number Of Cameras',
    dataIndex: 'numberOfCameras',
    key: 'numberOfCameras',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

const formatZones = (data = []) => {
  return data.map((zone) => {
    return {
      zoneId: zone._id,
      name: zone.name,
      description: zone.description,
    };
  });
};

export default function Setup() {
  const [zones, setZones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState([]);
  const [description, setDescription] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    setConfirmLoading(true);
    await api.createZone({ name, description });
    await loadZones();
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadZones = async () => {
    const zoneData = await api.getZones();
    setZones(formatZones(zoneData));
  };

  useEffect(() => {
    (async () => {
      await loadZones();
    })();
  }, []);
  return (
    <div>
      <Title level={2} style={{ marginBottom: 20 }}>
        Create Zones
      </Title>
      <Button onClick={showModal} style={{ marginBottom: 20 }}>
        Create Zone
      </Button>
      <Table dataSource={zones} columns={columns} />
      <Modal
        title="Create Zone"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              placeholder="Please, enter zone name"
              onChange={(data) => setName(data.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              placeholder="Please, enter zone description"
              onChange={(data) => setDescription(data.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
