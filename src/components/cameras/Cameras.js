/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'flowbite-react';
import api from '../../api';
import JSMpeg from '@cycjimmy/jsmpeg-player';
let player = null;

const Cameras = () => {
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };
  const [scanNew, setScanNew] = useState(false);
  const [camName, setCamName] = useState(null);
  const [currentZone, setCurrentZone] = useState(null);
  const [currentRtspLink, setCurrentRtspLink] = useState(null);
  const [camDescription, setCamDescription] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rtspLinks, setRtspLinks] = useState([]);
  const [zones, setZones] = useState([]);
  const [cameras, setCameras] = useState([]);
  const canvasRef = useRef(null);

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
  };

  const getRtspLinks = async () => {
    const data = await api.getRtspUrls();
    setRtspLinks(
      data.map((val) => {
        return val;
      })
    );
  };

  const scanRtspLinks = async () => {
    const data = await api.scanRtspLinks({ username, password });
    setRtspLinks(
      data.map((val) => {
        return val;
      })
    );
  };

  const loadCameras = async () => {
    const fetchedCameras = await api.fetchFeeds();
    setCameras(
      fetchedCameras.map((camera) => {
        return {
          cameraID: camera._id,
          name: camera.cameraName,
          description: camera.description,
          rtsplink: camera.rtspUrl,
          zoneIDs: camera.zoneId,
        };
      })
    );
  };
  const handleOk = async () => {
    await api.addFeed({
      rtspUrl: currentRtspLink,
      zoneId: currentZone,
      cameraName: camName,
      description: camDescription,
    });
    await loadCameras();
  };

  const startStream = async function (url) {
    try {
      if (url) {
        console.log(url);
        console.log(player);
        if (player && player.stop) {
          await player.stop();
        }
        const wsLink = await api.getStreamLink({ rtspLink: url });
        player = new JSMpeg.Player(wsLink, {
          canvas: document.getElementById('canvas'),
          videoBufferSize: 1024 * 1024 * 16,
        });
      }
      return <a></a>;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await loadCameras();
    })();
  }, []);

  return (
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div class="mt-8">
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            {/*Search bar for the table*/}

            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                    required=""
                  ></input>
                </div>
              </form>
            </div>

            {/* Add user and Filter button*/}
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <div class="flex items-center space-x-3 w-full md:w-auto">
                <Button
                  onClick={() => {
                    getRtspLinks();
                    getZones();
                    props.setOpenModal('default');
                  }}
                  type="button"
                  class="flex items-center justify-center px-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    class="h-3.5 w-3.5 mr-2"
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
                  Add new camera
                </Button>
                <Modal
                  show={props.openModal === 'default'}
                  onClose={() => props.setOpenModal(undefined)}
                >
                  <Modal.Header>Add a new camera</Modal.Header>
                  <Modal.Body>
                    <div class="grid gap-4 mb-4 sm:grid-cols-6 sm:gap-6 sm:mb-5">
                      <div class="sm:col-span-6">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Camera Name
                        </label>
                        <input
                          type="text"
                          name="cameraName"
                          id="cameraName"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Enter camera name"
                          required=""
                          onChange={(data) => setCamName(data.target.value)}
                        ></input>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="category"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Select Zone
                        </label>
                        <select
                          id="category"
                          defaultValue={''}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          onChange={(data) => setCurrentZone(data.target.value)}
                        >
                          {zones.map((zone) => {
                            return (
                              <option selected="" value={zone.name}>
                                {zone.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div class=" flex items-center sm:col-span-6">
                        <div className="flex mr-10">
                          <Button color="gray" onClick={() => setScanNew(true)}>
                            Scan RTSPs
                          </Button>
                          {scanNew ? (
                            <>
                              <Button
                                color="gray"
                                className="ml-4"
                                onClick={() => {
                                  setScanNew(false);
                                  setUsername(null);
                                  setPassword(null);
                                }}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <p></p>
                          )}
                        </div>

                        <p className="text-sm">Scan for new RTSP Links.</p>
                      </div>
                      {scanNew ? (
                        <>
                          <div class=" flex items-center sm:col-span-6">
                            <p className="text-md text-bold mr-2">
                              Camera login details :
                            </p>
                          </div>
                          <div class="sm:col-span-6 grid gap-4 mb-2 sm:grid-cols-2 justify-center items-center">
                            <div>
                              <label
                                for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter username"
                                onChange={(data) =>
                                  setUsername(data.target.value)
                                }
                              ></input>
                            </div>
                            <div>
                              <label
                                for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                name="brand"
                                id="brand"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter password"
                                onChange={(data) =>
                                  setPassword(data.target.value)
                                }
                              ></input>
                            </div>
                            <div className="mt-2">
                              <Button
                                color="blue"
                                className="bg-blue-700 text-white border-white"
                                onClick={() => scanRtspLinks()}
                              >
                                Enter Details
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div class="sm:col-span-6">
                        <label
                          for="category"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Select RTSP Link
                        </label>
                        <select
                          id="rtsp"
                          onChange={(data) => {
                            console.log(canvasRef);
                            console.log('........');
                            startStream(data.target.value);
                            setCurrentRtspLink(data.target.value);
                          }}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          {rtspLinks.map((link) => {
                            return <option value={link}>{link}</option>;
                          })}
                        </select>
                      </div>

                      <div class="sm:col-span-6">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          name="cameraName"
                          id="cameraName"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Enter Description"
                          required=""
                          onChange={(data) =>
                            setCamDescription(data.target.value)
                          }
                        ></input>
                      </div>
                      <div class="sm:col-span-6">
                        <canvas
                          id="canvas"
                          ref={canvasRef}
                          className="ml-auto mr-auto w-[300px] h-[300px]"
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="bg-blue-700"
                      onClick={() => {
                        handleOk();
                        props.setOpenModal(undefined);
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => {
                        setUsername(null);
                        setCamName(null);
                        setCamDescription(null);
                        setPassword(null);
                        setCurrentZone(null);
                        setCurrentRtspLink(null);
                        props.setOpenModal(undefined);
                      }}
                    >
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div
                  id="filterDropdown"
                  class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Choose brand
                  </h6>
                  <ul
                    class="space-y-2 text-sm"
                    aria-labelledby="filterDropdownButton"
                  >
                    <li class="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      ></input>
                      <label
                        for="apple"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Apple (56)
                      </label>
                    </li>
                    <li class="flex items-center">
                      <input
                        id="fitbit"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      ></input>
                      <label
                        for="fitbit"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Microsoft (16)
                      </label>
                    </li>
                    <li class="flex items-center">
                      <input
                        id="razor"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      ></input>
                      <label
                        for="razor"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Razor (49)
                      </label>
                    </li>
                    <li class="flex items-center">
                      <input
                        id="nikon"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      ></input>
                      <label
                        for="nikon"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Nikon (12)
                      </label>
                    </li>
                    <li class="flex items-center">
                      <input
                        id="benq"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      ></input>
                      <label
                        for="benq"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        BenQ (74)
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-2 py-3">
                    RTSP Link
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Zone IDS
                  </th>
                  <th scope="col" class="px-2 py-3">
                    preview
                  </th>
                </tr>
              </thead>
              <tbody>
                {cameras.map((camera) => (
                  <tr class="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {camera.name}
                    </th>
                    <td class="px-2 py-3">{camera.description}</td>
                    <td class="px-2 py-3">{camera.rtsplink}</td>
                    <td class="px-4 py-3">{camera.zoneIDs}</td>
                    <td class="px-4 py-3 flex items-center justify-end">
                      <button
                        id="apple-imac-27-dropdown-button"
                        data-dropdown-toggle="apple-imac-27-dropdown"
                        class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      <div
                        id="apple-imac-27-dropdown"
                        class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          class="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="apple-imac-27-dropdown-button"
                        >
                          <li>
                            <a
                              href="#"
                              class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Show
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </a>
                          </li>
                        </ul>
                        <div class="py-1">
                          <a
                            href="#"
                            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="ml-2 mr-2 font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
              of
              <span class="ml-2 font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Cameras;
