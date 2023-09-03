/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { BiCameraHome } from 'react-icons/bi';
import { TbCurrentLocation } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineDangerous } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { AiOutlineAlert } from 'react-icons/ai';
import {AiOutlineScan} from 'react-icons/ai';
import { GrMapLocation } from 'react-icons/gr';
import { RiPassportLine } from 'react-icons/ri';
import { BsDatabaseDown } from 'react-icons/bs';
import Home from '../home/Home';
import Cameras from '../cameras/Cameras';
import Zones from '../zones/Zones';
import Visitors from '../visitors/Visitors';
import Blacklist from '../blacklist/Blacklist';
import Alerts from '../alerts/Alerts';
import Users from '../users/Users';
import GeneratePass from '../pass/GeneratePass';
import bss_logo from '../../assets/bss_logo.png';
import api from '../../api.js';
import { Layout, Menu, Button, Form, Input, Row, Checkbox } from 'antd';
import logoBlack from '../../assets/logo-black.png';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  SettingOutlined,
  VideoCameraOutlined,
  ZoomInOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import PhotoScan from '../photoScan/PhotoScan';

const components = {
  1: <Home></Home>,
  2: <Cameras></Cameras>,
  3: <Zones></Zones>,
  4: <Users></Users>,
  5: <Blacklist></Blacklist>,
  6: <Visitors></Visitors>,
  7: <Alerts></Alerts>,
  8: <GeneratePass></GeneratePass>,
  9: <PhotoScan></PhotoScan>,
};

const Main = () => {
  const [render, updateRender] = useState(1);

  const [token, setToken] = useState(false);

  const handleMenuClick = (key) => {
    updateRender(key);
  };

  const onFinish = async (values) => {
    try {
      console.log('Success:', values);
      const { token } = await api.login(values);
      localStorage.setItem('token', token);
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert('Incorrect login id password.');
  };

  return (
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
      <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div class="flex flex-wrap justify-between items-center">
          <div class="flex justify-start items-center">
            <a
              href="https://flowbite.com"
              class="flex items-center justify-center mr-4"
            >
              <img src={bss_logo} class="mr-3 h-7" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Triyam Dashboard
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/*Side bar */}

      {token ? (
        <div>
          <aside
            class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidenav"
            id="drawer-navigation"
          >
            <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
              <ul class="space-y-2">
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(1)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <BiCameraHome className="w-5 h-5" />
                      <span class="ml-3">Home</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(2)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <TbCurrentLocation className="w-5 h-5" />
                      <span class="ml-3">Cameras</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(3)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <FaRegUser className="w-5 h-5" />
                      <span class="ml-3">Zones</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(4)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <MdOutlineDangerous className="w-5 h-5" />
                      <span class="ml-3">Users</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(5)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <HiOutlineUserGroup className="h-5 w-5" />
                      <span class="ml-3">Blacklist</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(6)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <AiOutlineAlert className="h-5 w-5" />
                      <span class="ml-3">Visitors</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(7)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <AiOutlineAlert className="h-5 w-5" />
                      <span class="ml-3">Alerts</span>
                    </div>
                  </a>
                </li>
              </ul>
              <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(8)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <RiPassportLine className="h-5 w-5" />
                      <span class="ml-3">Visitor Pass</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(9)}
                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="inline-flex justify-center items-center">
                      <AiOutlineScan className="h-5 w-5" />
                      <span class="ml-3">Photo Scan</span>
                    </div>
                  </a>
                </li>
              </ul>
              
            </div>
          </aside>
          <main class="p-4 bg-[#F9FAFB] md:ml-64 h-auto pt-20">
            {components[render]}
          </main>
        </div>
      ) : (
        <Layout style={{ background: '#F5F5F5', height: '100vh' }}>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: '100vh' }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <img
                  src={logoBlack}
                  width={240}
                  size="contain"
                  alt="bss-logo"
                  style={{ marginRight: 10, marginLeft: 20 }}
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ background: 'blue', borderColor: 'blue' }}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Layout>
      )}
    </div>
  );
};

export default Main;
