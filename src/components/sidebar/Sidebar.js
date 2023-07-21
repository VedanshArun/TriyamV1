import React from 'react'
import {BiCameraHome} from 'react-icons/bi';
import {TbCurrentLocation} from 'react-icons/tb';
import {FaRegUser} from 'react-icons/fa';
import {MdOutlineDangerous} from 'react-icons/md';
import {HiOutlineUserGroup} from 'react-icons/hi';
import {AiOutlineAlert} from 'react-icons/ai';
import {GrMapLocation} from 'react-icons/gr';
import {BsDatabaseDown} from 'react-icons/bs';
import {BiLogIn} from 'react-icons/bi';

const Sidebar = () => {
  return (
    <div>
        <aside id="default-sidebar" class=" fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
            <div class="overflow-y-auto py-5 px-3 h-full  border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <ul class="space-y-2">
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <div className='inline-flex justify-center items-center'>
                                <BiCameraHome className='w-5 h-5'/>
                                <span class="ml-3">Cameras</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <div className='inline-flex justify-center items-center'>
                                <TbCurrentLocation className='w-5 h-5'/>
                                <span class="ml-3">Zones</span>
                            </div>
                        </a>
                        
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <div className='inline-flex justify-center items-center'>
                                <FaRegUser className='w-5 h-5'/>
                                <span class="ml-3">Users</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <div className='inline-flex justify-center items-center'>
                                <MdOutlineDangerous className='w-5 h-5'/>
                                <span class="ml-3">Blacklist</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <div className='inline-flex justify-center items-center'>
                                <HiOutlineUserGroup className='h-5 w-5'/>
                                <span class="ml-3">Visitors</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <div className='inline-flex justify-center items-center'>
                                <AiOutlineAlert className='h-5 w-5'/>
                                <span class="ml-3">Alerts</span>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <div className='inline-flex justify-center items-center'>
                                <GrMapLocation className='h-5 w-5'/>
                                <span class="ml-3">Facility Map</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <div className='inline-flex justify-center items-center'>
                                <BsDatabaseDown className='h-5 w-5'/>
                                <span class="ml-3">Download Data</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
  )
}

export default Sidebar