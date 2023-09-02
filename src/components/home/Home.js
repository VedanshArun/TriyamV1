import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'flowbite-react';
import Webcam from 'react-webcam';
import './Home.css';
import api from '../../api';

const Home = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [openModal, setOpenModal] = useState('');
  const [userDetails, setUserDetails] = useState([]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <>
      <div class="flex flex-col items-center justify-center m-5">
        <div className="w-full flex justify-center items-center">
          {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
          ) : (
            <Webcam
              screenshotFormat="image/jpeg"
              className="w-3/4 flex justify-center items-center"
              height={400}
              width={400}
              ref={webcamRef}
            />
          )}
        </div>
        <div class=" bottom-0 flex justify-center items-center mt-5">
          <Button
            className="bg-green-400"
            onClick={async () => {
              console.log(imgSrc);
              const data = await api.detectFaces({ imgSrc });
              setOpenModal('default');
              setUserDetails(data);
              console.log(data);
            }}
          >
            Use photo
          </Button>
          <Button className="bg-blue-700 ml-5" onClick={capture}>
            Snap
          </Button>

          {imgSrc ? (
            <>
              <Button class="ml-5 bg-white rounded-md" onClick={retake}>
                Retake photo
              </Button>
              <Button
                color="gray"
                class="ml-5 bg-white rounded-md"
                onClick={retake}
              >
                Cancel
              </Button>
            </>
          ) : (
            <></>
          )}
          <Modal
            position="top-center"
            show={openModal === 'default'}
            onClose={() => setOpenModal(undefined)}
          >
            <Modal.Header>Alert Preview</Modal.Header>
            <Modal.Body>
              <div class="grid gap-4 mb-4 sm:grid-cols-6 sm:gap-6 sm:mb-5">
                {userDetails && userDetails.length ? (
                  <>
                    <div class="sm:col-span-3 justify-center items-center w-full md:h-full">
                      <div class="w-full max-w-xl h-full md:h-auto">
                        <div class="bg-white rounded-lg ">
                          <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                              <h3 class="font-semibold ">
                                {userDetails[0].name}
                              </h3>
                              <p class="text-gray-500 text-sm">
                                User ID : {userDetails[0]._id}
                              </p>
                            </div>
                          </div>
                          <dl className="mt-5">
                            <dt class="mb-2 font-semibold leading-none text-xl text-gray-900 dark:text-white">
                              Details
                            </dt>
                            <dd class="mt-5 mb-2 font-light text-gray-500  dark:text-gray-400">
                              <span className=" font-medium text-[#000000]">
                                Type :{' '}
                              </span>
                              {userDetails[0].type}
                            </dd>
                            <dd class="mt-5 mb-2 font-light text-gray-500  dark:text-gray-400">
                              <span className=" font-medium text-[#000000]">
                                Phone Number :{' '}
                              </span>
                              {userDetails[0].mobile}
                            </dd>
                            <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                              <span className=" font-medium text-[#000000]">
                                Email :{' '}
                              </span>
                              {userDetails[0].email}
                            </dd>
                            <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                              <span className=" font-medium text-[#000000]">
                                Aadhaar :{' '}
                              </span>
                              {userDetails[0].aadhaarNumber}
                            </dd>
                            <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                              <span className=" font-medium text-[#000000]">
                                Address :{' '}
                              </span>
                              {userDetails[0].address}
                            </dd>
                            <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                              <span className=" font-medium text-[#000000]">
                                Designation :{' '}
                              </span>
                              {userDetails[0].designation}
                            </dd>
                            <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                              <span className=" font-medium text-[#000000]">
                                Vehicles :{' '}
                              </span>
                              {(userDetails[0]?.vehicles || []).map(
                                (vehicle) => {
                                  return <p>{vehicle.vehicleNumber}</p>;
                                }
                              )}
                            </dd>
                            <dd class="mb-2 font-light text-gray-500  dark:text-gray-400">
                              <span className=" font-medium text-[#000000]">
                                Zones :{' '}
                              </span>
                              {(userDetails[0]?.zones || []).map((zone) => {
                                return <p>{zone._id}</p>;
                              })}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <img
                        src={userDetails[0].userImage}
                        alt="user image"
                        className="w-[300px] h-[400px] object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <div class="sm:col-span-6">User Not Detected</div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="gray"
                onClick={() => {
                  setOpenModal(undefined);
                }}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Home;
