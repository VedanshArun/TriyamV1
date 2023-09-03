import React, { useState } from 'react'
import api from '../../api';


const PhotoScan = () => {
    const [file, setFile] = useState(null);
    const [name , setName] = useState(null);
    const [userId , setUserId] = useState(null);
    const [userDetected, setUserDetected] = useState(false);
    const [aadhaar, setAadhaar] = useState(null);
    const [number , setNumber] = useState(null);
    const [company , setCompany] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const[show ,setShow] = useState('No File is uploaded yet');

    const loadFaces = async (imgSrc) => {
        const fetchedFaces = await api.detectFaces({ file });
        console.log(fetchedFaces);
        if (fetchedFaces.length !== 0) {
          setUserId(fetchedFaces[0].userId);
          setUserDetected(true);
          setName(fetchedFaces[0].label);
          setAadhaar(fetchedFaces[0].aadhaarNumber);
          setNumber(fetchedFaces[0].mobile);
          setCompany(fetchedFaces[0].gatePasses[0]?.companyName);
          setVehicle(fetchedFaces[0].vehicles[0]?.vehicleNumber);
          setShow(true);
        }
      };
  return (
    <>
        <div class="  justify-center items-center m-20 bg-white p-20 grid gap-4 mb-4 sm:grid-cols-6 sm:gap-6 sm:mb-5">
            <div className='sm:col-span-6 w-full flex justify-center items-center'>
                <h1 className='text-xl'>Scan Users from photo</h1>
            </div>
            <div className='sm:col-span-6 w-full flex-col justify-center items-center'>

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
                        onChange={(value) => {
                        //   console.log(value);
                          setFile(value?.target?.files[0]);
                          
                        }}
                      ></input>

            </div>
            {file ?(
                <>
                <div className='sm:col-span-6 w-full flex justify-center items-center'>
                    <img src={file.name} alt='Scanned image' className='w-[200px] h-[200px] object-contain'/>
                </div>
                </>
            ) : (
                <></>
            )}

            <div className='sm:col-span-6 w-full flex-col justify-center items-center'>
                {userDetected ? (
                    <>
                        <h1 className='text-xl'>User Details</h1>


                    </>
                ) : (
                    
                    <h2 className='text-md'>No user found in database</h2>
                )}
            </div>

      </div>
    </>
  )
}

export default PhotoScan