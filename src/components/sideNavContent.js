import React from 'react'
import { user } from '../assets';
import { close } from '../assets';
import { sidebarData } from '../constants';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const SideNavContent = ({handleClose}) => {
  return (
    <div  className='w-full h-full text-black fixed top-0 left-0  bg-amazon_black bg-opacity-90'>
      <div className='w-full h-full relative transform transition-transform duration-200'>
        <div className='w-[365px] h-full bg-white'>
          <div className='bg-amazon_light cursor-pointer  text-white py-[11px] px-[36px] flex items-center gap-3'>
            <img className="w-[26px]" src={user} alt='user' />
            <h3 className='font-titleFont font-bold text-lg tracking-wider'>Hello, sign in</h3>
          </div>
          <div className='w-[365px] h-[93%] overflow-y-scroll'>

            {sidebarData.map((item, index) => {
              return (
                <React.Fragment key={index} >
                  <h3 className='text-lg font-sans font-bold pl-[36px] pt-[18px] mb-1'>
                    {item.category}
                    {console.log(item.category)}
                  </h3>
                  <ul className='pb-1 border-b-[1px] border-gray-400'>
                    {item.subcategories.map((subItem, subIndex) => {
                      return (
                        <li key={subIndex} className='group cursor-pointer text-sm text-gray-800 font-sans font-medium pl-[36px] py-[12px] hover:bg-[#e1dede] relative'>
                          {subItem}
                          {console.log(item)}
                          <span className='absolute left-[310px] text-gray-400 group-hover:text-amazon_light'>
                            <KeyboardArrowRightIcon />
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </React.Fragment>
              );
            })}
          </div>

        </div>
        <span onClick={handleClose} className='cursor-pointer absolute top-5 left-[380px] w-5 h-5
        text-white flex items-center justify-center'>
          <img src={close}/>
        </span>

      </div>

    </div>

  );
};

export default SideNavContent;
