import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { location, required } from '../../assets';
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const Location = () => {

    const [selectedLocation, setSelectedLocation] = useState(false);
    const [userZipCode, setUserZipCode] = useState(''); // State for the user's entered ZIP code
    const [locationName, setLocationName] = useState(null);
    const [warning, setWarning] = useState("");
    const [autoLocationWarning, setAutoLocationWarning] = useState("")
    const [loading, setLoading] = useState(false);
    const [autoLocationLoading, setAutoLocationLoading] = useState(false);

    useEffect(() => {
        // Check local storage for existing values and set them in state
        const storedLocationName = localStorage.getItem("locationName");
        const storedUserZipCode = localStorage.getItem("userZipCode");
        if (storedLocationName && storedUserZipCode) {
            setLocationName(storedLocationName);
            setUserZipCode(storedUserZipCode);
        }
    }, []);

    // Ref for the location dropdown
    const locationRef = useRef(null);

    // Effect to close the location when clicking outside
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(locationRef.current)) {
                setSelectedLocation(false);
                setWarning(false);
                setAutoLocationWarning(false);
            };
        })
    }, [locationRef])

    // Fetch location data from API based on user's ZIP code
    async function fetchLocationData(userZipCode) {
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${userZipCode}`);
            if (response.data[0].PostOffice != null) {
                const locationCity = response.data[0].PostOffice[0].District;
                const locationPincode = response.data[0].PostOffice[0].Pincode;
                setLocationName(locationCity);
                setUserZipCode(locationPincode);
                setWarning("");
                setLoading(false);
                setSelectedLocation(false);

                // Store the values in local storage
                localStorage.setItem("locationName", locationCity);
                localStorage.setItem("userZipCode", locationPincode);
            } else {
                setLoading(false);
                setUserZipCode("");
                setWarning("Location not found");
            }
        } catch (error) {
            setLoading(false);
            setUserZipCode("");
            setWarning(error.message);
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

    // function to auto detect your location
    function getLocation() {
        setWarning("");
        setAutoLocationLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    try {
                        const response = await axios.get(
                            `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${latitude}&lng=${longitude}&username=kumardinesh1908`
                        );
                        if (response.data.postalCodes[0] != null) {
                            const locationPincode = response.data.postalCodes[0].postalCode;
                            const locationCity = response.data.postalCodes[0].placeName;
                            setLocationName(locationCity);
                            setUserZipCode(locationPincode);
                            setAutoLocationLoading(false);
                            setSelectedLocation(false);
                            // Store the values in local storage
                            localStorage.setItem("locationName", locationCity);
                            localStorage.setItem("userZipCode", locationPincode);
                        } else {
                            setAutoLocationLoading(false);
                            setAutoLocationWarning("Location not found");
                        }
                    } catch (error) {
                        setAutoLocationLoading(false);
                        setAutoLocationWarning(error.message);
                    }
                },
                (error) => {
                    setAutoLocationLoading(false);
                    setAutoLocationWarning(error.message);
                }
            );
        }
    }

    return (
        <div>
            <div className="headerHover" onClick={() => setSelectedLocation(!selectedLocation)}>
                <img className="w-6 h-5 mt-1" src={location} alt="locationIcon" />
                <div className="text-xs text-lightText font-medium flex flex-col items-start">
                    {locationName ? 'Deliver to' : 'Hello'}
                    <span className="text-sm font-bold -mt-1 text-whiteText">
                        {locationName ? <p>{locationName} {userZipCode}</p> : 'Select your address'}
                    </span>
                </div>
            </div>
            {selectedLocation &&
                <div className='w-screen h-screen text-black fixed z-50 top-0 left-0  bg-amazon_black bg-opacity-50 flex items-center justify-center' >
                    <div ref={locationRef} className=" w-[320px] bg-white rounded-lg">
                        <div className="rounded-tr-lg rounded-tl-lg  bg-gray-100 border-b-[0.066rem] border-gray-200 p-4 font-bold">
                            Choose your location
                        </div>
                        <form className=" p-4 flex flex-col gap-5" onSubmit={handleSubmit}>
                            <p className="text-xs text-gray-400">Enter an Indian pincode to see product availability and delivery options for your location.</p>
                            <div className="flex justify-center" >
                                <input type="text" maxLength={6} placeholder="Enter a 6-digit ZIP code" className="w-[65%] border-[1px] border-[#a6a6a6] rounded p-1 font-medium"
                                    onChange={(e) => { setUserZipCode(e.target.value); setWarning("") }} />
                                <button className="w-[33%] p-2 ml-2 text-center font-medium rounded-md bg-gray-200 border-[0.066rem] border-gray-300 hover:bg-gray-300 active:ring-2 active:ring-offset-1 active:ring-blue-500"> Apply</button>
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
                        <div className=" flex flex-row justify-between items-center px-4 ">
                            <hr className="w-[45%]" />
                            <p className="text-sm font-semibold">or</p>
                            <hr className="w-[45%]" />
                        </div>
                        <div onClick={getLocation} className="p-2 m-4 text-center font-medium rounded-md bg-gray-200 border-[0.066rem] border-gray-300 cursor-pointer hover:bg-gray-300 active:ring-2 active:ring-offset-1 active:ring-blue-500">
                            <p>Auto detect your location</p>
                        </div>
                        {
                            autoLocationLoading && <div className='flex justify-center mt-2 pb-3'>
                                <RotatingLines
                                    strokeColor="#febd69"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="50"
                                    visible={true}
                                />
                            </div>
                        }
                        {
                            autoLocationWarning && <div className="flex flex-row gap-1 items-center pl-4 -mt-3 pb-2">
                                <img src={required} className="w-4 h-4" alt="warning" />
                                <div className="text-zsm text-red-700 ">{autoLocationWarning}</div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Location
