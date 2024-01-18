import React from "react";

export const PageNotFound = () => {
  return (
    <div>
      <div className="w-full h-full">
        <h1 className="text-xl font-semibold">404 Page not found !!</h1>
      </div>
    </div>
  );
};

export const FailedToSearch = () => {
  return (
    <div>
      <div className="w-full h-full">
        <h1 className="text-xl font-semibold">
          It seems the search keyword are not available
        </h1>
      </div>
    </div>
  );
};

export const PaymentError = () => {
  const handleTryAgain = () => {};
  return (
    <div>
      <div className="w-full h-full">
        <h1 className="text-xl font-semibold">
          <span className="text-red-600">Payment Error</span>
        </h1>
        <div className="flex justify-center">
          <button
            onClick={() => handleTryAgain()}
            className="px-6 py-1 text-center bg-red-600 hover:bg-red-800 text-white rounded-md m-4 shadow-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductNotFound = () => {
  const handleRefresh = () => {};
  return (
    <div>
      <div className="text-lg font-semibold bg-slate-100 p-4 rounded-sm shadow-md">
        <h1>Please check your internet and then refresh the page</h1>
        <div className="flex justify-center">
          <button
            onClick={() => handleRefresh()}
            className="px-6 py-1 text-center bg-red-600 hover:bg-red-800 text-white rounded-md m-4 shadow-sm"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export const PriceProductNotFound = () => {
  return (
    <div>
      <div className="text-lg font-semibold bg-slate-100 p-4 rounded-sm shadow-md">
        <h1>No product is available in the selected filter</h1>
      </div>
    </div>
  );
};

export const EmptyCart = () => {
  return (
    <div>
      <div className="text-lg font-semibold bg-slate-100 p-4 rounded-sm shadow-md">
        <h1 className="text-center">Your cart is empty</h1>
      </div>
    </div>
  );
};
