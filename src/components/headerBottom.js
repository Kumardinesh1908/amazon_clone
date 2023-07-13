import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import SideNavContent from './sideNavContent';

export default function HeaderBottom() {
    const [sideBar, setSidebar] = useState(false);

    const handleClose=()=>{
        setSidebar(false);
    }
    
    return (
        <div className="w-full px-4 h-[40px] flex items-center bg-amazon_light text-white">

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
                <li className='headerHover h-10'>Mobiles</li>
                <li className='headerHover h-10'>New Releases</li>
                <li className='headerHover h-10'>Customer Service</li>
                <li className='headerHover h-10'>Prime</li>
                <li className='headerHover h-10'>Electronics</li>
            </ul>
            {/* listitems end here */}

            {/* Side Navbar Component call starts*/}
            {
                sideBar && ( <SideNavContent handleClose={handleClose} /> )
            }
            {/* Side Navbar Component call ends */}

        </div>
    );
};