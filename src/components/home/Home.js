import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'flowbite-react';
import Webcam from 'react-webcam';
import './Home.css';
import api from '../../api';

const Home = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

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
        </div>
      </div>
    </>
  );
};

export default Home;
