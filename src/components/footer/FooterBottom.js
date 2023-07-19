import React from 'react';
import { footerBootmData } from '../../constants';

const FooterBottom = () => {
    return (
        <div className='w-full bg-[#07101cf2] '>
            <div className='w-[80%] flex flex-row flex-wrap  ml-[178px] pt-8  '>
                {footerBootmData.map((item,index) => (
                    <div className='w-[176px] h-10 cursor-pointer group mr-8 mb-4' key={index}>
                        <h3 className='text-gray-200  group-hover:underline text-xs leading-[13px]' key={item.id}> {item.title} </h3>
                        {item.listItem.map((data, index) => (
                            <p className='group-hover:underline text-gray-400 text-xs leading-[13px]' key={index} > {data} </p>
                        ))}
                    </div>
                ))}
            </div>
            <div className='w-full py-7'>

                <div className="flex flex-row text-xs gap-4 ml-3 text-white justify-center tracking-wide ">
                    <p className=''>Conditions of Use & Sale</p>
                    <p className=''>Privacy Notice</p>
                    <p className=''>Interest-Based Ads</p>
                </div>
                <div className='text-xs tracking-wider text-white flex justify-center mt-[2px]'>
                    © 1996-2023, Amazon.com, Inc. or its affiliates
                </div>
            </div>
        </div>
    )
}

export default FooterBottom
