import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
const navigate = useNavigate();
useEffect(()=>(
    setTimeout(()=>navigate("/"),3000)
));
  return (
    <div>
        <h1 className="">OOPS!! Something went wrong. You will be re-directed to previous page in 3-seconds.</h1>
    </div>
  )
}

export default ErrorPage;
