/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Button, Modal, Checkbox, Label, TextInput  } from 'flowbite-react';
import api from '../../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };
  const loadUsers = async () => {
    const data = await api.getUsers();
    setUsers(
      data.map((user) => {
        return {
          userID: user._id,
          name: user.name,
          zones: user.zones,
          images: user.images,
          aadhaarNumber: user.aadhaarNumber,
          vehicles : user.vehicles,
          mobile: user.mobile,
          email: user.email,
          designation: user.designation,
          address: user.address,
        };
      })
    );
  };
  useEffect(() => {
    (async () => {
      await loadUsers();
    })();
  }, []);

  return (
    <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div class="px-4 mx-auto">
        <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div class="flex items-center flex-1 space-x-4">
              <h5>
                <span class="text-gray-500">All Users </span>
                <span class="dark:text-white">{users.length}</span>
              </h5>
            </div>
            <div class=" flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
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
                Add new user
              </Button>
              <Modal
                  show={props.openModal === 'default'}
                  onClose={() => props.setOpenModal(undefined)}
                >
                  <Modal.Header>Add a new zone</Modal.Header>
                  <Modal.Body>
                  <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email2"
            value="Your email"
          />
        </div>
        <TextInput
          id="email2"
          placeholder="name@flowbite.com"
          required
          shadow
          type="email"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password2"
            value="Your password"
          />
        </div>
        <TextInput
          id="password2"
          required
          shadow
          type="password"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="repeat-password"
            value="Repeat password"
          />
        </div>
        <TextInput
          id="repeat-password"
          required
          shadow
          type="password"
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label
          className="flex"
          htmlFor="agree"
        >
          <p>
            I agree with the 
          </p>
          
        </Label>
      </div>
      <Button type="submit">
        Register new account
      </Button>
    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="bg-blue-700"
                      onClick={() => {
                    
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
          <div class="mb-10 overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-4 py-3">
                    designation
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Registered Vehicles
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Zones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    
                    <th
                      scope="row"
                      class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td class="px-4 py-2">
                      <span class="bg-primary-100 text-primary-800 font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {user.designation}
                      </span>
                    </td>
                    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className='flex flex-col'>
                        {user.vehicles.map((vehicle) => (
                          <p>{vehicle.vehicleNumber}</p>
                        ))}
                      </div>
                    </td>
                    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className = "flex flex-col">
                        {user.zones.map((zone)=>(
                          
                            <p>{zone.name}</p>
                          
                        ))}
                      </div>
                    </td>
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
        </div>
      </div>
    </section>
  );
};

export default Users;
