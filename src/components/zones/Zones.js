/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import api from '../../api';

const Zones = () => {
  const [zones, setZones] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };
  const [newZoneName, setNewZoneName] = useState(null);

  const [newZoneDescription, setNewZoneDescription] = useState(null);
  const handleOK = async () => {
    await api.createZone({
      name: newZoneName,
      description: newZoneDescription,
    });
    await loadZones();
  };
  const loadZones = async () => {
    const fetchedZones = await api.fetchZones();
    setZones(
      fetchedZones.map((zone) => {
        return {
          zoneID: zone._id,
          name: zone.name,
          numCameras: zone.numCameras,
          description: zone.description,
        };
      })
    );
  };

  useEffect(() => {
    (async () => {
      await loadZones();
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
                  Add new zone
                </Button>
             
                <Modal
                  show={props.openModal === 'default'}
                  onClose={() => props.setOpenModal(undefined)}
                >
                  <Modal.Header>Add a new zone</Modal.Header>
                  <Modal.Body>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                      <div class="sm:col-span-2">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Zone Name
                        </label>
                        <input
                          type="text"
                          name="cameraName"
                          id="cameraName"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Enter zone name"
                          required=""
                          onChange={(data) => setNewZoneName(data.target.value)}
                        ></input>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="description"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          rows="5"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Write a description..."
                          onChange={(data) =>
                            setNewZoneDescription(data.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="bg-blue-700"
                      onClick={() => {
                        handleOK();
                        props.setOpenModal(undefined);
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => props.setOpenModal(undefined)}
                    >
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto pb-10">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">
                    zone id
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Number of Cameras
                  </th>
                </tr>
              </thead>
              <tbody>
                {zones.map((zone) => (
                  <tr class="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {zone.zoneID}
                    </th>
                    <td class="px-2 py-3">{zone.name}</td>
                    <td class="px-2 py-3">{zone.description}</td>
                    <td class="px-4 py-3">{zone.numCameras}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Zones;
