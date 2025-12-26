import React from "react";
import { Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const { error } = location.state || {};

  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center items-center text-center p-5">
      <h1 className="text-red-500 mb-4">Something went wrong.</h1>
      <p className="text-white mb-8 text-xl">
        {error
          ? error.message
          : "An unexpected error occurred. Please try again."}
      </p>
      <Link
        to="/"
        className="bg-white text-dark-100 px-6 py-3 rounded-lg font-bold hover:bg-light-100 transition"
      >
        Go Home
      </Link>
    </main>
  );
};

export default ErrorPage;
