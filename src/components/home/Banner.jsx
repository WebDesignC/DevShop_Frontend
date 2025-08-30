import { useRef, useEffect } from 'react';
import '../../styles/Banner.css';

export const Banner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Error al reproducir el video:", error);
      });
    }
  }, []);

  return (
    <>
    
    <div className='slides'>
      <div className='video-overlay'></div>
      <video 
        ref={videoRef}
        className='video-home' 
        autoPlay 
        muted 
        playsInline 
        loop
        preload="auto"
        poster='https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg'
      >
        <source 
          src="https://res.cloudinary.com/dzvaxcfbx/video/upload/v1756160042/c2d272fe762038ae_ce5f6d78ddcc4c85a07be4086f7047d1_ac1lxo.webm" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      

      <div className='slide-content'>
        <h1>MerCart</h1>
      </div>
    </div>
    </>
  );
};

