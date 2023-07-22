import React from 'react';
import { categoryData } from '../../constants';
import { Link } from 'react-router-dom';

const Category = () => {
    return (
        <div className='relative'>
            <div className='w-full z-10 flex flex-row flex-wrap  justify-evenly -mt-[400px]'>
                {categoryData.map((item) => (
                    <div className='w-[310px] h-[435px] bg-white ' key={item.id} >
                        <div className='m-[20px]'>
                            <h2 className='text-[21px] font-bold tracking-wide'>{item.plot}</h2>
                        </div>
                        <Link to="/allProducts">
                        <div className='group cursor-pointer'>
                            <div className='w-[270px]  mx-auto'>
                                <img className='w-[270px] h-[270px] ' src={item.img} alt='img' />
                            </div>
                            <h4 className=' font-semibold ml-5 mt-2 mb-2'>{item.title}</h4>
                            <p className='text-cyan-700 text-sm font-medium ml-[20px] group-hover:text-red-400'>See more</p>
                        </div>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Category
