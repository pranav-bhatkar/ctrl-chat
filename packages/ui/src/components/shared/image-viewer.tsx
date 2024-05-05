import React from "react";

function Imageviewer() {
  return (
    <div className="fixed top-0 left-0 bottom-0 w-full h-screen bg-black  z-50 flex justify-center items-center">
      <div className="relative">
        <img
          src="https://via.placeholder.com/800x600"
          alt="image"
          className="max-w-full max-h-full"
        />
        <button className="absolute top-0 right-0 m-4 p-2 bg-white text-black rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Imageviewer;
