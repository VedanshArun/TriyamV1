/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {BiCameraHome} from 'react-icons/bi';
import {TbCurrentLocation} from 'react-icons/tb';
import {FaRegUser} from 'react-icons/fa';
import {MdOutlineDangerous} from 'react-icons/md';
import {HiOutlineUserGroup} from 'react-icons/hi';
import {AiOutlineAlert} from 'react-icons/ai';
import {GrMapLocation} from 'react-icons/gr';
import {RiPassportLine} from 'react-icons/ri';
import {BsDatabaseDown} from 'react-icons/bs';
import Cameras from '../cameras/Cameras';
import Zones from '../zones/Zones';
import Visitors from '../visitors/Visitors';
import Blacklist from '../blacklist/Blacklist'
import Alerts from '../alerts/Alerts';
import Users from '../users/Users';
import FacilityMap from '../facilityMap/FacilityMap';
import DownloadData from '../downloadData/DownloadData';
import GeneratePass from '../pass/GeneratePass';
import bss_logo from '../../assets/bss_logo.png';


const components = {
  1 : <Cameras></Cameras>,
  2 : <Zones></Zones>,
  3 : <Users></Users>,
  4 : <Blacklist></Blacklist>,
  5 : <Visitors></Visitors>,
  6 : <Alerts></Alerts>,
  7 : <FacilityMap></FacilityMap>,
  8 : <GeneratePass></GeneratePass>,
  9 : <DownloadData></DownloadData> 
}

const Main = () => {

  const [render, updateRender] = useState(7);
  const handleMenuClick = (key) => {
    updateRender(key);
  };

  return (
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
      <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
              <a href="https://flowbite.com" class="flex items-center justify-center mr-4">
                <img
                  src={bss_logo}
                  class="mr-3 h-7"
                  alt="Flowbite Logo"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Triyam Dashboard</span>
              </a>
            </div>
            <div class="flex items-center lg:order-2">
              <button
                type="button"
                class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt="user photo"
                />
              </button>
              
              <div
                class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
                id="dropdown"
              >
                <div class="py-3 px-4">
                  <span
                    class="block text-sm font-semibold text-gray-900 dark:text-white"
                    >Neil Sims</span
                  >
                  <span
                    class="block text-sm text-gray-900 truncate dark:text-white"
                    >name@flowbite.com</span
                  >
                </div>
                <ul
                  class="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >My profile</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >Account settings</a
                    >
                  </li>
                </ul>
                <ul
                  class="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      ><svg
                        class="mr-2 w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      My likes</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      ><svg
                        class="mr-2 w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                        ></path>
                      </svg>
                      Collections</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <span class="flex items-center">
                        <svg
                          aria-hidden="true"
                          class="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Pro version
                      </span>
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </li>
                </ul>
                <ul
                  class="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Sign out</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </nav>

      {/*Side bar */}

      <aside
          class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
            <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            <ul class="space-y-2">
                        <li>
                            <a href="#" onClick={() => handleMenuClick(1)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <BiCameraHome className='w-5 h-5'/>
                                    <span class="ml-3">Cameras</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            
                            <a href="#" onClick={() => handleMenuClick(2)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <TbCurrentLocation className='w-5 h-5'/>
                                    <span class="ml-3">Zones</span>
                                </div>
                            </a>
                            
                        </li>
                        <li>
                            <a href="#" onClick={() => handleMenuClick(3)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <FaRegUser className='w-5 h-5'/>
                                    <span class="ml-3">Users</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleMenuClick(4)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <MdOutlineDangerous className='w-5 h-5'/>
                                    <span class="ml-3">Blacklist</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleMenuClick(5)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <HiOutlineUserGroup className='h-5 w-5'/>
                                    <span class="ml-3">Visitors</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleMenuClick(6)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <AiOutlineAlert className='h-5 w-5'/>
                                    <span class="ml-3">Alerts</span>
                                </div>
                            </a>
                        </li>
            </ul>
            <ul
              class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
            >
                        <li>
                            <a href="#" onClick={() => handleMenuClick(7)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <GrMapLocation className='h-5 w-5'/>
                                    <span class="ml-3">Facility Map</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleMenuClick(8)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <RiPassportLine className='h-5 w-5'/>
                                    <span class="ml-3">Visitor Pass</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => handleMenuClick(9)} class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <div className='inline-flex justify-center items-center'>
                                    <BsDatabaseDown className='h-5 w-5'/>
                                    <span class="ml-3">Download Data</span>
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
  )
}

export default Main