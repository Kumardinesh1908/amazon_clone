
import React from 'react'

import { sidebarData } from '../../constants';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const SideNavContent = () => {

  return (
    <div className='w-[365px] h-[93%] overflow-y-scroll'>
      {
        sidebarData.map((item, index) => {
          return (
            <React.Fragment key={index} >
              <h3 className='text-lg font-sans font-bold pl-[36px] pt-[18px] mb-1'>
                {console.log(item.category)}
              </h3>
              <ul className='pb-1 border-b-[1px] border-gray-400'>
                {item.subcategories.map((subItem, subIndex) => {
                  return (
                    <li key={subIndex} className='group cursor-pointer text-sm text-gray-800 font-sans font-medium pl-[36px] py-[12px] hover:bg-[#e1dede] relative'>
                      {subItem}
                      <span className='absolute left-[310px] text-gray-400 group-hover:text-amazon_light'>
                        <KeyboardArrowRightIcon />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })
      }
    </div>
  );
};

export default SideNavContent;
