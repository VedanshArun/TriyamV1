/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const GeneratePass = () => {
    const dummyData = [
        {
            userID : 'x687s2nj',
            visitorName : 'Vedansh Arun',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'New',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : '2gigxhxn',
            visitorName : 'Arnav Choudhary',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'New',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : 'zfxm99qs',
            visitorName : 'Yash Jindal',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'Existing',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : 'npl9tqmr',
            visitorName : 'Vedansh Arun',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'New',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : '4o6vrn7a',
            visitorName : 'Vedansh Arun',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'Existing',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : '3rjuhrhd',
            visitorName : 'Vedansh Arun',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'Existing',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : 'x687s2nj',
            visitorName : 'Vedansh Arun',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'New',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : '2gigxhxn',
            visitorName : 'Arnav Choudhary',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'New',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : 'zfxm99qs',
            visitorName : 'Yash Jindal',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'Existing',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : 'npl9tqmr',
            visitorName : 'Vedansh Arun',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'New',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : '4o6vrn7a',
            visitorName : 'Vedansh Arun',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'Existing',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },
        {
            userID : '3rjuhrhd',
            visitorName : 'Vedansh Arun',
            phoneNumber : 8920984642,
            visitingOfficer : 'Gt. Yash Jindal',
            venue : 'Room 102 , Block A',
            entryTime : '6:30:21',
            exitTime : '7:45:22',
            visitorType : 'Existing',
            address : '317, Green leaf residency, sector 15 gurgaon, 122001',
        },

    ]

    return (
        <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div class="mx-auto  px-4 ">
                <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        
                        {/*Search bar for the table*/}

                        <div class="w-full md:w-1/2">
                            <form class="flex items-center">
                                <label for="simple-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""></input>
                                </div>
                            </form>
                        </div>

                        {/* Add user and Filter button*/}
                       
                    </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-4 py-3">id</th>
                                <th scope="col" class="px-2 py-3">Name</th>
                                <th scope="col" class="px-2 py-3">phone number</th>
                                <th scope="col" class="px-2 py-3">address</th>
                                <th scope="col" class="px-2 py-3">photo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map((visitor) => (
                                <tr class="border-b dark:border-gray-700">
                                    <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{visitor.userID}</th>
                                    <td class="px-2 py-3">{visitor.visitorName}</td>
                                    <td class="px-2 py-3">{visitor.phoneNumber}</td>
                                    <td class="px-4 py-3">{visitor.address}</td>
                                    <td class="px-4 py-3">{visitor.img}</td>
                                    <td class="px-4 py-3 flex items-center justify-end">
                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                        <div id="apple-imac-27-dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                <li>
                                                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                </li>
                                                <li>
                                                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                </li>
                                            </ul>
                                            <div class="py-1">
                                                <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                           
                        </tbody>
                    </table>
                </div>
                <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing
                        <span class="ml-2 mr-2 font-semibold text-gray-900 dark:text-white">1-10</span>
                        of
                        <span class="ml-2 font-semibold text-gray-900 dark:text-white">1000</span>
                    </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <li>
                            <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Previous</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Next</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </section>
    )
}

export default GeneratePass