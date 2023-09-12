import React from 'react';
import FooterMiddleList from './FooterMiddleList';
import { countryList } from '../../constants/index';
import { footerMiddleData } from "../../constants/index";
import { logo, world, UpDown } from "../../assets/index";


const FooterMiddle = () => {
    return (
        <div className='bg-[#232F3E] w-full text-white'>

            {/* Middle-Top starts here */}
            <div className='w-full border-b-[1px] border-gray-600 pb-9'>
                <div className="flex flew-row gap-[120px] ml-[197px] pt-11">
                    {
                        footerMiddleData.map((item) => (
                            <FooterMiddleList key={item.id} title={item.title} listItem={item.listItem} />
                        ))
                    }
                </div>
            </div>
            {/* Middle-Top ends here */}

            {/* Middle-Bottom starts here */}
            <div className='w-full  flex items-center justify-center gap-24'>
                <div className='w-[75px] mt-9'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='flex gap-2 border-[1px] rounded p-[6px] mt-6 cursor-pointer'>
                    <img className="w-[18px] h-[18px]" src={world} alt="world" />
                    <p className=' text-sm tracking-wide'>English</p>
                    <img className="w-3 h-3 ml-3 mt-[4px]" src={UpDown} alt="UpDown" />
                </div>
            </div>
            <div className='w-[65%] mx-auto mt-5 pb-6  flex flex-row flex-wrap gap-4  justify-center'>
                {
                    countryList.map((item, index)=>(
                        <p className='text-xs cursor-pointer hover:underline' key={index} > {item} </p>
                    ))
                }
            </div>
            {/* Middle-Bottom ends here */}
        </div>
    )
}

export default FooterMiddle;
