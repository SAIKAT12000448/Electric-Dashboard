import banner1 from '../../images/slideshow/banner2.jpg'
const Banner = () => {
  return (
    <div className="w-full max-w-screen-xl mt-5 mx-auto">
      <div className="relative">
        <img
          src={banner1}
          alt="Banner 1"
          className="w-full h-auto object-cover"
          style={{ maxHeight: '35rem' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
