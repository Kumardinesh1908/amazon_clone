import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { location, required } from '../../assets';
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";



const Location = () => {

    // Ref for the location dropdown
    const locationRef = useRef(null);

    const [selectedLocation, setSelectedLocation] = useState(false);
    const [userZipCode, setUserZipCode] = useState(''); // State for the user's entered ZIP code
    const [locationName, setLocationName] = useState(null);

    const [warning, setWarning] = useState(false);

    const [loading, setLoading] = useState(false);

    // Effect to close the location when clicking outside
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(locationRef.current)) {
                setSelectedLocation(false);
                setWarning(false);
            };
        })
    }, [locationRef])


    // Fetch location data from API based on user's ZIP code
    async function fetchLocationData(userZipCode) {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${userZipCode}`);
        if (response.data[0].PostOffice != null) {
            setLocationName(response.data);
            setWarning(false);
            setLoading(false);
            setSelectedLocation(false)
        }
    }

    // function to validate the userZipCode
    const validate = () => {
        const reqPincode = /^[0-9]{6}$/;
        let isValid = true;
        // Validate pincode - 1
        if (userZipCode === "") {
            setWarning("Please enter a ZIP or postal code.");
            isValid = false;
        }
        // Validate pincode - 2
        if (userZipCode.length > 0) {
            if (!reqPincode.test(userZipCode)) {
                setWarning("Please enter a valid ZIP or postal code.");
                isValid = false;
            }
        }
        return isValid
    }

    //   Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }
        setLoading(true);
        fetchLocationData(userZipCode);
        setUserZipCode("");

    }

    return (
        <div>
            <div className="headerHover" onClick={() => setSelectedLocation(!selectedLocation)}>
                <img className="w-6 h-5 mt-1" src={location} alt="locationIcon" />
                <div className="text-xs text-lightText font-medium flex flex-col items-start">
                    {locationName ? 'Deliver to' : 'Hello'}
                    <span className="text-sm font-bold -mt-1 text-whiteText">
                        {locationName ? <p>{locationName[0].PostOffice[0].District} {locationName[0].PostOffice[0].Pincode}</p> : 'Select your address'}
                    </span>
                </div>
            </div>
            {selectedLocation &&
                <div className='w-screen h-screen text-black fixed z-50 top-0 left-0  bg-amazon_black bg-opacity-50 flex items-center justify-center' >
                    <div ref={locationRef} className=" w-[320px] bg-white rounded-lg">
                        <div className="w-full h-[30%] rounded-tr-lg rounded-tl-lg  bg-gray-100 border-b-[0.066rem] border-gray-200 p-4 font-bold">
                            Choose your location
                        </div>
                        <form className="w-full h-[70%] p-4" onSubmit={handleSubmit}>
                            <p className="text-xs text-gray-400">Enter an Indian pincode to see product availability and delivery options for your location.</p>
                            <div className="flex justify-center" >
                                <input type="text" maxLength={6} placeholder="Enter a 6-digit ZIP code" className="w-[65%] mt-5 border-[1px] border-[#a6a6a6] rounded p-1 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500"
                                    onChange={(e) => setUserZipCode(e.target.value)}
                                />
                                <button className="w-[33%] border-[0.066rem] mt-5 border-gray-200 rounded-lg p-2 ml-2 cursor-pointer"> Apply</button>
                            </div>
                            {
                                loading && <div className='flex justify-center mt-2'>
                                    <RotatingLines
                                        strokeColor="#febd69"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                    />
                                </div>
                            }
                        </form>
                        {
                            warning && <div className="flex flex-row gap-1 items-center pl-4 -mt-3 pb-2">
                                <img src={required} className="w-4 h-4" alt="warning" />
                                <div className="text-zsm text-red-700 ">{warning}</div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Location
