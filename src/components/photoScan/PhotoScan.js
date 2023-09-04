/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { Badge } from 'flowbite-react';
import api from '../../api';

const PhotoScan = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userDetected, setUserDetected] = useState(false);
  const [aadhaar, setAadhaar] = useState(null);
  const [number, setNumber] = useState(null);
  const [company, setCompany] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [images, setImages] = useState(null);
  const [address, setAddress] = useState(null);
  const [lastVisited, setLastVisited] = useState(null);
  const [type, setType] = useState(null);

  const loadFaces = async (imgSrc) => {
    try {
      const fetchedFaces = await api.detectFacesDirect({ imgSrc });
      if (fetchedFaces && fetchedFaces.length) {
        setUserId(fetchedFaces[0].userId);
        setUserDetected(true);
        setName(fetchedFaces[0].label);
        setAadhaar(fetchedFaces[0].aadhaarNumber);
        setType(fetchedFaces[0].type);
        setNumber(fetchedFaces[0].mobile);
        setAddress(fetchedFaces[0].address);
        setCompany(fetchedFaces[0].gatePasses[0]?.companyName);
        setLastVisited(fetchedFaces[0].gatePasses[0]?.createdAt);
        setVehicle(fetchedFaces[0].vehicles[0]?.vehicleNumber);
        setImages(fetchedFaces[0].userImage);
      } else {
        setUserId(null);
        setUserDetected(null);
        setName(null);
        setAadhaar(null);
        setNumber(null);
        setCompany(null);
        setAddress(null);
        setVehicle(null);
        setImages(null);
        setType(null);
        setLastVisited(null);
      }
    } catch (error) {
      console.log(error);
      alert('Face not detected');
    }
  };
  return (
    <>
      <div class="  justify-center items-center m-20 bg-white p-20 grid gap-4 mb-4 sm:grid-cols-6 sm:gap-6 sm:mb-5">
        <div className="sm:col-span-6 w-full flex justify-center items-center">
          <h1 className="text-xl">Scan Users from photo</h1>
        </div>
        <div className="sm:col-span-6 w-full flex-col justify-center items-center">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={async (value) => {
              await loadFaces(value?.target?.files[0]);
            }}
          ></input>
        </div>

        <div className="sm:col-span-6 w-full flex-col justify-center items-center">
          {userDetected ? (
            <>
              <h1 className="text-xl mb-10">User Details</h1>
              <div class="grid gap-4 mb-4 sm:grid-cols-6 sm:gap-6 sm:mb-5">
                <div class="sm:col-span-3 justify-center items-center w-full md:h-full">
                  <div class="w-full max-w-xl h-full md:h-auto">
                    <div class="bg-white rounded-lg ">
                      <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                        <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                          <h3 class="font-semibold ">{name}</h3>
                          <p class="text-gray-500 text-sm">
                            User ID : {userId}
                          </p>
                          {type === 'BLACKLISTED' ? (
                            <Badge color="failure">{type}</Badge>
                          ) : (
                            <Badge color="indigo">{type}</Badge>
                          )}
                        </div>
                      </div>
                      <dl className="mt-5">
                        <dt class="mb-2 font-semibold leading-none text-xl text-gray-900 dark:text-white">
                          Details
                        </dt>
                        <dd class="mt-5 mb-2 font-light text-gray-500  dark:text-gray-400">
                          <span className=" font-medium text-[#000000]">
                            Phone Number :{' '}
                          </span>
                          {number}
                        </dd>

                        <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                          <span className=" font-medium text-[#000000]">
                            Aadhaar :{' '}
                          </span>
                          {aadhaar}
                        </dd>
                        <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                          <span className=" font-medium text-[#000000]">
                            Address :{' '}
                          </span>
                          {address}
                        </dd>
                        <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                          <span className=" font-medium text-[#000000]">
                            Company :{' '}
                          </span>
                          {company}
                        </dd>
                        <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                          <span className=" font-medium text-[#000000]">
                            Last Visit to Facility :{' '}
                          </span>
                          {lastVisited}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="sm:col-span-3 justify-center items-center w-full md:h-full">
                  <img
                    src={images}
                    alt="user image"
                    className="w-[300px] h-[400px] object-cover"
                  />
                </div>
              </div>
            </>
          ) : (
            <h2 className="text-md">No user found in database</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default PhotoScan;
