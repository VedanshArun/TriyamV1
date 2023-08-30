import React , {useState, useEffect, useRef, useCallback} from 'react'
import {Button , Modal} from 'flowbite-react';
import Datepicker from 'flowbite-datepicker/Datepicker';
import Webcam from "react-webcam";
import api from '../../api';


const Snap = () => {
    const [openModal, setOpenModal] = useState('');
    const props = { openModal, setOpenModal };
    const [name , setName] = useState(null);
    const [aadhaar, setAadhaar] = useState(null);
    const [company, setCompany] = useState(null);
    const [number , setNumber] = useState(null);
    const [address , setAddress] = useState(null);
    const [visitingOfficer , setVisitingOfficer] = useState(null);
    const [expiryDate , setExpiryDate] = useState(null);
    const [image , setImage] = useState(null);
    const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const loadFaces = async (imgSrc) => {
    const fetchedFaces = await api.detectFaces({imgSrc});
    console.log(fetchedFaces);
  };


    useEffect(() => {
    const datepickerEl = document?.getElementById("datepickerId");
    // console.log(datepickerEl);
    new Datepicker(datepickerEl, {});
  }, []);

    return (
        <>
            <div class="flex justify-center m-5">
                <Button  onClick={() => {
                    props.setOpenModal('default');
                  }} 
                  class="block text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">
                    Take Visitor Image
                </Button>
                <Modal
                  show={props.openModal === 'default'}
                  onClose={() => props.setOpenModal(undefined)}
                >
                  <Modal.Header>Add a new camera</Modal.Header>
                  <Modal.Body>
                    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container flex justify-center items-center mt-3">
        
          <Button
                      className = "bg-blue-700"
                      onClick={capture}
                    >
                      Snap
                    </Button>
       
      </div>
    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="bg-blue-700"
                      onClick={() => {
                        setImage(imgSrc)
                        props.setOpenModal(undefined);
                        console.log(imgSrc)
                        loadFaces(imgSrc)
                      }}
                    >
                      Use photo
                    </Button>
                    
                    { imgSrc ? (
                        <Button
                      color="gray"
                      onClick={retake}
                    >
                      Retake photo
                    </Button>
                    ) : (<></>)}
                    <Button
                      color="gray"
                      onClick={() => {
                        props.setOpenModal(undefined);
                      }}
                    >
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>
            {imgSrc ? (<div className='flex justify-center items-center'><img src={imgSrc} width={400} height={400}/></div>) : (<></>)}
            <div class="  justify-center items-center m-20 bg-white p-20 grid gap-4 mb-4 sm:grid-cols-6 sm:gap-6 sm:mb-5">
                    <div class="sm:col-span-3">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter name of the user"
                        required=""
                      ></input>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter aadhaar number"
                        required=""
                      ></input>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="cameraName"
                        id="cameraName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="mobile number"
                        required=""
                      ></input>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="vehicle number"
                        required=""
                      ></input>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Vehicle Number
                      </label>
                      <input
                        type="number"
                        name="cameraName"
                        id="cameraName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="mobile number"
                        required=""
                      ></input>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Visiting Officer
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="vehicle number"
                        required=""
                      ></input>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="cameraName"
                        id="cameraName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter address of the user"
                        required=""
                      ></input>
                    </div>
                    <div class="flex justify-center items-center sm:col-span-6">
                      <div className="relative w-72">
        <input
          datepicker
          datepicker-autohide
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Select Expiry Date"
          id="datepickerId"
        />
        <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
                      
                    </div>
                    
                    <div  class = " mt-10 flex justify-center items-center sm:col-span-6">
                        <Button
                    className="bg-blue-700" 
                  >
                    Generate Pass
                  </Button>
                    </div>
                    
            </div>
        </>
  )
}

export default Snap