import React, { useRef, useState, useEffect } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import './Home.css';

const Home = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        var nopromise = {
          catch: new Function(),
        };
        (video.play() || nopromise).catch(function () {});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
  };

  useEffect(() => {
    getVideo();
    return () => {
      console.log('component unmounted .......');
    };
  }, [videoRef]);

  return (
    <div>
      <div class="videoFeed">
        <video ref={videoRef}></video>
        <button class="snap" onClick={takePhoto}>
          <AiFillCamera className="w-6 h-6" />
        </button>
      </div>
      <div class="result">
        <canvas ref={photoRef}></canvas>
        <button>Generate Pass</button>
      </div>
    </div>
  );
};

export default Home;
