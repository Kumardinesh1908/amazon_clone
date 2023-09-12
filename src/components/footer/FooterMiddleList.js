import React from 'react';

const FooterMiddleList = ({ title, listItem }) => {
  return (

    <div className='flex flex-col'>
      <h3 className='text-[16px] font-bold '>
        {title}
      </h3>
      <ul className="text-sm my-[7px]">
        {
          listItem.map((item) =>
            item.listData.map((data, index) => (
              <li className="mb-[7px] tracking-wide hover:underline cursor-pointer" key={index}>{data}</li>
            )
            )
          )
        }
      </ul>
    </div>

  );
}

export default FooterMiddleList

