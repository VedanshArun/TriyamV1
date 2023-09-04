/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Modal, FileInput, Label, input } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { MultiSelect } from 'react-multi-select-component';
import Webcam from 'react-webcam';
import api from '../../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [useWebcam, setUseWebcam] = useState(false);
  const [openModal, setOpenModal] = useState('');
  const [openModal2, setOpenModal2] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [zoneIds, setZoneIds] = useState([]);
  const [aadhaarNumber, setAadhaar] = useState('');
  const [email, setEmail] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [zones, setZones] = useState([]);
  const props = { openModal, setOpenModal };
  const props2 = { openModal2, setOpenModal2 };
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);
  const [options, setOptions] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const handleOK = async () => {
    await api.addUser({
      name: name,
      address: address,
      mobile: mobile,
      type: 'EMPLOYEE',
      vehicles: [{ vehicleNumber: vehicles }],
      aadhaarNumber: aadhaarNumber,
      designation: designation,
      email: email,
      zoneIds: zoneIds,
      ...(imgSrc ? { imgSrc } : { file }),
    });
    await loadUsers();
  };
  const loadUsers = async () => {
    const data = await api.getUsers();
    console.log(data);
    setUsers(
      data.map((user) => {
        return {
          userID: user._id,
          name: user.name,
          zones: user.zones,
          images: user.images,
          aadhaarNumber: user.aadhaarNumber,
          vehicles: user.vehicles,
          mobile: user.mobile,
          email: user.email,
          designation: user.designation,
          address: user.address,
        };
      })
    );
  };
  const getZones = async () => {
    const data = await api.fetchZones();
    setZones(
      data.map((zone) => {
        return {
          zoneID: zone._id,
          name: zone.name,
        };
      })
    );
    setZoneIds([data[0]._id]);
  };
  useEffect(() => {
    (async () => {
      await loadUsers();
      await getZones();
    })();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div className="px-4 mx-auto">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-gray-500">All Users </span>
                <span className="dark:text-white">{users.length}</span>
              </h5>
            </div>
            <div className=" flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <Button
                onClick={() => {
                  getZones();
                  props.setOpenModal('placement');
                }}
                type="button"
                className="flex items-center justify-center px-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add new user
              </Button>
              <Modal
                position="top-center"
                show={props.openModal === 'placement'}
                onClose={() => props.setOpenModal(undefined)}
              >
                <Modal.Header>Add a new user</Modal.Header>
                <Modal.Body>
                  <div className="grid gap-4 mb-4 sm:grid-cols-6 sm:gap-6 sm:mb-5">
                    <div className="sm:col-span-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Upload file
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={(value) => {
                          console.log(value);
                          setFile(value?.target?.files[0]);
                          // console.log(file);
                        }}
                      ></input>
                    </div>
                    <div className="sm:col-span-2 mt-7">
                      <Button
                        color="gray"
                        onClick={() => {
                          setUseWebcam(true);
                        }}
                      >
                        Use Webcam
                      </Button>
                    </div>
                    {useWebcam ? (
                      <div className="sm:col-span-6">
                        <div className="">
                          {imgSrc ? (
                            <img src={imgSrc} alt="webcam" />
                          ) : (
                            <Webcam
                              screenshotFormat="image/jpeg"
                              height={600}
                              width={600}
                              ref={webcamRef}
                            />
                          )}
                          <div className="btn-container flex justify-center items-center mt-3">
                            <Button
                              className="bg-blue-700"
                              onClick={() => {
                                setOptions(true);
                                capture();
                              }}
                            >
                              Snap
                            </Button>
                            {options ? (
                              <>
                                <Button
                                  className="bg-blue-700 ml-3"
                                  onClick={() => {
                                    setImgSrc(imgSrc);
                                    setOptions(false);
                                  }}
                                >
                                  Use photo
                                </Button>
                                <Button
                                  color="gray"
                                  className="ml-3"
                                  onClick={() => {
                                    setOptions(true);
                                    retake();
                                  }}
                                >
                                  Retake
                                </Button>
                              </>
                            ) : (
                              <></>
                            )}
                            <Button
                              color="gray"
                              className="ml-3"
                              onClick={() => {
                                setUseWebcam(false);
                                setImgSrc(null);
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="sm:col-span-3">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter name of the user"
                        required=""
                        onChange={(data) => setName(data.target.value)}
                      ></input>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter aadhaar number"
                        required=""
                        onChange={(data) => setAadhaar(data.target.value)}
                      ></input>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="cameraName"
                        id="cameraName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="mobile number"
                        required=""
                        onChange={(data) => setMobile(data.target.value)}
                      ></input>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Email address"
                        required=""
                        onChange={(data) => setEmail(data.target.value)}
                      ></input>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Vehicle Number
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="vehicle number"
                        required=""
                        onChange={(data) => setVehicles(data.target.value)}
                      ></input>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Designation
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Designation"
                        required=""
                        onChange={(data) => setDesignation(data.target.value)}
                      ></input>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        for="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Zone
                      </label>
                      <select
                        id="category"
                        defaultValue={''}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        onChange={(data) => setZoneIds([data.target.value])}
                      >
                        {zones.map((zone) => {
                          return (
                            <option selected="" value={zone.zoneID}>
                              {zone.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter address of the user"
                        required=""
                        onChange={(data) => setAddress(data.target.value)}
                      ></input>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="bg-blue-700"
                    onClick={async () => {
                      props.setOpenModal(undefined);
                      await handleOK();
                      loadUsers();
                      setImgSrc(null);
                      setFile(null);
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => {
                      setImgSrc(null);
                      setFile(null);
                      props.setOpenModal(undefined);
                    }}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div className="mb-10 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    designation
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Registered Vehicles
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Zones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  console.log(user);
                  return (
                    <>
                      <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <th
                          scope="row"
                          className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {user.name}
                        </th>
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {user.designation}
                          </span>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex flex-col">
                            {user.vehicles.map((vehicle) => (
                              <p>{vehicle.vehicleNumber}</p>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className={`flex flex-col`}>
                            {user.zones.map((zone) => (
                              <p>{zone.name}</p>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 flex items-center justify-center">
                          <Dropdown inline label="Options" placement="bottom">
                            <Dropdown.Item
                              onClick={async () => {
                                await api.updateUser({
                                  type: 'BLACKLISTED',
                                  _id: user.userID,
                                });
                                await loadUsers();
                              }}
                            >
                              Blacklist User
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button
                                onClick={() => {
                                  props2.setOpenModal2('placement');
                                }}
                              >
                                View Details
                              </button>
                            </Dropdown.Item>
                          </Dropdown>
                        </td>
                      </tr>
                      <Modal
                        position="top-center"
                        show={props2.openModal2 === 'placement'}
                        onClose={() => props2.setOpenModal2(undefined)}
                      >
                        <Modal.Header>User Details</Modal.Header>
                        <Modal.Body>
                          <div className="grid gap-4 mb-4 sm:grid-cols-6 sm:gap-6 sm:mb-5">
                            <div className="sm:col-span-3 justify-center items-center w-full md:h-full">
                              <div className="w-full max-w-xl h-full md:h-auto">
                                <div className="bg-white rounded-lg ">
                                  <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                                    <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                      <h3 className="font-semibold">
                                        {user.name}
                                      </h3>
                                      <p className="text-gray-500 text-sm">
                                        User ID : {user.userID}
                                      </p>
                                    </div>
                                  </div>
                                  <dl className="mt-5">
                                    <dt className="mb-2 font-semibold leading-none text-xl text-gray-900 dark:text-white">
                                      Details
                                    </dt>
                                    <dd className="mt-5 mb-2 font-light text-gray-500  dark:text-gray-400">
                                      <span className=" font-medium text-[#000000]">
                                        Phone Number :{' '}
                                      </span>
                                      {user.mobile}
                                    </dd>
                                    <dd className="mb-2 font-light text-gray-500  dark:text-gray-400">
                                      <span className=" font-medium text-[#000000]">
                                        Email :{' '}
                                      </span>
                                      {user.email}
                                    </dd>
                                    <dd className="mb-2 font-light text-gray-500  dark:text-gray-400">
                                      <span className=" font-medium text-[#000000]">
                                        Aadhaar :{' '}
                                      </span>
                                      {user.aadhaarNumber}
                                    </dd>
                                    <dd className="mb-2 font-light text-gray-500  dark:text-gray-400">
                                      <span className=" font-medium text-[#000000]">
                                        Address :{' '}
                                      </span>
                                      {user.address}
                                    </dd>
                                    <dd className="mb-2 font-light text-gray-500  dark:text-gray-400">
                                      <span className=" font-medium text-[#000000]">
                                        Designation :{' '}
                                      </span>
                                      {user.designation}
                                    </dd>
                                    <dd className="mb-2 font-light text-gray-500  dark:text-gray-400">
                                      <span className=" font-medium text-[#000000]">
                                        Vehicles :{' '}
                                      </span>
                                      {user.vehicles.map((vehicle) => {
                                        return <p>{vehicle.vehicleNumber}</p>;
                                      })}
                                    </dd>
                                    <dd className="mb-2 font-light text-gray-500  dark:text-gray-400">
                                      <span className=" font-medium text-[#000000]">
                                        Zones :{' '}
                                      </span>
                                      {user.zones.map((zone) => {
                                        return <p>{zone._id}</p>;
                                      })}
                                    </dd>
                                  </dl>
                                </div>
                              </div>
                            </div>
                            <div className="sm:col-span-3 justify-center items-center w-full md:h-full">
                              <img
                                src={user.images}
                                alt="user image"
                                className="w-[300px] h-[400px] object-cover"
                              />
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            color="gray"
                            onClick={() => props2.setOpenModal2(undefined)}
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
