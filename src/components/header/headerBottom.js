import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect, useRef } from 'react';
import { user } from "../../assets"
import { close } from '../../assets';
import SideNavContent from './sideNavContent';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HeaderBottom() {
    const userInfo = useSelector((state) => state.amazon.userInfo);

    const [sideBar, setSidebar] = useState(false);
    const ref = useRef(null);
    const handleClose = () => {
        setSidebar(false);
    }
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                setSidebar(false);
            }
        })
    }, [ref, sideBar]);

    return (
        <div className="w-full z-50  px-4 h-[40px] flex items-center bg-amazon_light text-white">

            {/* listitems start here */}
            <ul className='flex items-center text-sm tracking-wide'>
                <li onClick={() => setSidebar(true)} className='headerHover h-10'>
                    <MenuIcon />
                    <p className="text-sm font-bold ml-1">
                        All
                    </p>
                </li>
                <li className='headerHover h-10'>Amazon miniTV</li>
                <li className='headerHover h-10'>Sell</li>
                <li className='headerHover h-10'>Best Sellers</li>
                <li className='headerHover h-10'>today's Deals</li>
                <Link to="/smartphones"><li className='headerHover h-10'>Mobiles</li></Link>
                <li className='headerHover h-10'>New Releases</li>
                <li className='headerHover h-10'>Customer Service</li>
                <li className='headerHover h-10'>Prime</li>
                <li className='headerHover h-10'>Electronics</li>
            </ul>
            {/* listitems end here */}

            {/* Side Navbar Component call starts*/}
            {
                sideBar && (
                    <div className='w-full h-full text-black fixed z-50 top-0 left-0  bg-amazon_black bg-opacity-90 '>
                        <div className='w-full h-full relative '>
                            <motion.div initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -500, opacity: 0 }} transition={{ duration: 0.5 }} className='w-[365px] h-full bg-white'
                                ref={ref}
                            >
                                <div className='bg-amazon_light cursor-pointer  text-white py-[11px] px-[36px] flex items-center gap-3'>
                                    <img className="w-[26px]" src={user} alt='user' />
                                    {
                                        userInfo
                                            ? <h3 className='font-titleFont font-bold text-lg tracking-wider'>Hello, {userInfo.name}</h3>
                                            : <h3 className='font-titleFont font-bold text-lg tracking-wider'>Hello, sign in</h3>
                                    }
                                    
                                </div>
                                <SideNavContent />
                                <span
                                    onClick={handleClose} className='cursor-pointer absolute top-5 left-[380px] w-5 h-5
                                   text-white flex items-center justify-center'>
                                    <img src={close} alt="close" />
                                </span>
                            </motion.div>
                        </div>
                    </div>
                )
            }
            {/* Side Navbar Component call ends */}

        </div>
    );
};