import React from 'react';
import { Link } from 'react-router-dom';

const FooterTop = () => {
  // const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // // function to go back to top
  // const handleScroll = () => {
  //   if (window.scrollY > 300) {
  //     setShowBackToTop(true);
  //   } else {
  //     setShowBackToTop(false);
  //   }
  // };

  // // Add scroll event listener
  //   window.addEventListener('scroll', handleScroll);


  return (
    <>
      <div className='w-full bg-white pt-10 pb-6'>
        <div className='w-full border-[1px] rounded-md border-gray-200'>
          <div className='mx-auto w-60 text-center pt-10 pb-5'>
            <p className='text-sm'>See personalized recommendations</p>
            <Link to="/signIn" preventScrollReset={true}>
              <button
                className='w-full bg-[#FFCF56] rounded-md py-1 font-semibold cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 text-sm mt-[2px] mb-[2px]'
              >
                Sign in
              </button>
            </Link>
            <p className='text-xs'>
              New customer? &nbsp;
              <Link to="/createAccount" preventScrollReset={true}>
                <span className='text-xs text-blue-400 hover:text-red-500 cursor-pointer'>
                   Start here.
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-full py-[14px] hover:bg-[#414953] bg-[#485769]"
        onClick={handleScrollToTop}
      >
        <p className='text-sm mx-auto text-center text-white'>Back to top</p>
      </div>
    </>
  );
};

export default FooterTop;
