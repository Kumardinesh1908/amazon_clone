import React from 'react';
import { categoryData } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const navigate = useNavigate();

    // Function to handle click event when a category is selected
    const handleCategoryClick = (category) => {
        navigate(`/${category}`); // Navigate to the products page with the selected category as a URL parameter
    };

    return (
        <div className='relative'>
            <div className='w-full z-10 flex flex-row flex-wrap  justify-evenly -mt-[400px] '>
                {categoryData.map((item) => (
                    <div className='w-[310px] h-[435px] mb-7 bg-white ' key={item.id} >
                        <div className='m-[20px]'>
                            <h2 className='text-[21px] font-bold tracking-wide'>{item.plot}</h2>
                        </div>
                        {item.subcategories
                            ? <div className='w-[270px] h-[330px] mx-auto flex  flex-row flex-wrap  justify-between'>
                                   { item.subcategories.map((item, index) => (
                                    <div key={index} className='w-[45%] h-[40%] group cursor-pointer' onClick={() => handleCategoryClick(item.category)}>
                                            <img className='w-full h-full ' src={item.img} alt='img' />
                                        <h4 className='text-xs font-semibold ml-5 mt-1 mb-2 group-hover:text-red-400'>{item.title}</h4>
                                    </div>
                                    ))}
                                </div>
                            : <div className='group cursor-pointer' onClick={() => handleCategoryClick(item.category)}>
                                <div className='w-[270px]  mx-auto'>
                                    <img className='w-[270px] h-[270px] ' src={item.img} alt='img' />
                                </div>
                                <h4 className=' font-semibold ml-5 mt-2 mb-2'>{item.title}</h4>
                                <p className='text-cyan-700 text-sm font-medium ml-[20px] group-hover:text-red-400'>See more</p>
                            </div>
                        }
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Category;