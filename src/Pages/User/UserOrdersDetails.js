import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function UserOrdersDetails() {
  const { orderHistory } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.user);
  const { id } = useParams();
  if (id === userInfo?.result?.clientInfo?.name) {
    return (
      <div className="bg-slate-100">
        <br />
        <div className="container mx-auto bg-white p-2">
          <div className="orders-details">
            <div>
              <h1 className="text-center">
                customer edit Profile detail Page incase need
              </h1>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
  const filterOrders = orderHistory?.filter((order) =>
    order ? order.id === parseInt(id) : null
  );

  if (filterOrders) {
    return (
      <div className="bg-slate-100">
        <br />
        <div className="container mx-auto bg-white p-2">
          <div className="p-4 border-b ">
            <h1 className="font-semibold">Order #{id}</h1>
            <p className="text-[0.8rem] text-slate-500 flex flex-wrap flex-col">
              Order place on Date:{" "}
              {filterOrders[0]?.dateOrderPlaced?.slice(0, 10)}
              <span>
                Time: {filterOrders[0]?.dateOrderPlaced?.slice(11, 19)}
              </span>
            </p>
          </div>
          <div className="orders-details flex flex-wrap flex-col justify-center items-center">
            <div
              label="Stroke width"
              className="rounded-md shadow-md w-[20rem] h-[25rem] mt-2 bg-slate-100"
            >
              <h1 className="text-center font-semibold mt-4">Order Status</h1>
              <hr className="mt-4 bg-slate-400 mb-2" />
              {filterOrders[0]?.status === "pending" ? (
                <CircularProgressbar
                  className="p-4"
                  value={50}
                  text="Pending"
                  strokeWidth={4}
                  styles={buildStyles({
                    textColor: "#696880",
                    pathColor: "#696880",
                  })}
                />
              ) : (
                <>
                  {filterOrders[0]?.status === "canceled" ? (
                    <CircularProgressbar
                      className="p-4"
                      value={100}
                      text="Cancel"
                      strokeWidth={4}
                      styles={buildStyles({
                        textColor: "#b80f0a",
                        pathColor: "#b80f0a",
                      })}
                    />
                  ) : (
                    <CircularProgressbar
                      className="p-4"
                      value={100}
                      text="Complete"
                      strokeWidth={4}
                      styles={buildStyles({
                        textColor: "#32cd32",
                        pathColor: "#32cd32",
                      })}
                    />
                  )}
                </>
              )}
            </div>
            <div className="rounded-md shadow-md w-[20rem] h-[25rem] mt-2 bg-slate-100 ">
              <h1 className="font-semibold text-center mt-4">Order Details</h1>
              <hr className="mt-4 bg-slate-400" />
              <div className="p-2 md:p-5 lg:p-10">
                <div>
                  <p>
                    <span className="font-semibold">Address: </span>{" "}
                    {filterOrders[0]?.address}
                  </p>
                  <p>
                    <span className="font-semibold">City: </span>{" "}
                    {filterOrders[0]?.city}
                  </p>
                  <p>
                    <span className="font-semibold">Phone: </span>{" "}
                    {filterOrders[0]?.phone}
                  </p>
                  {filterOrders[0]?.note !== null ? (
                    <p>
                      <span className="font-semibold">Note: </span>{" "}
                      {filterOrders[0]?.note}
                    </p>
                  ) : null}
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Order Amount: </span> Rs{" "}
                    {Math.round(filterOrders[0]?.amount)}
                  </p>
                  <hr className="mt-2 bg-slate-400" />
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-2 mb-[5rem] bg-slate-400" />
        </div>
        <br />
      </div>
    );
  }
}

export default UserOrdersDetails;
