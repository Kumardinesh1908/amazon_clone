import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/amazonSlice';

const ErrorPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.amazon.error);
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = () => {
      navigate(-1);
      dispatch(clearError());
    };
    const timeoutId = setTimeout(redirect, 3000);
    return () => clearTimeout(timeoutId);
  }, [navigate, dispatch]);


  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">{error}</span>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <h1 className="">OOPS!! Something went wrong. You will be re-directed to previous page in 3-seconds.</h1>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <h1 className="">OOPS!! Something went wrong. You will be re-directed to previous page in 3-seconds.</h1>
      </div>
    )
  }
}

export default ErrorPage;


