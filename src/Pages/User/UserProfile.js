import { useDispatch, useSelector } from "react-redux";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { logout } from "../../Redux/Slice/userSlice";
import { Children } from "react";
import { viewOrder } from "../../Redux/AyncCall/orderActions";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { userInfo, loading } = useSelector((state) => state.user);
  const { orderHistory, orderCount } = useSelector((state) => state.order);
  const [totalPages, setTotalPages] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePaginationChange = (e, p) => {
    setCurrentPage(p);
  };
  const page = currentPage;
  const limit = 12;
  React.useEffect(() => {
    let obj = {
      page,
      limit,
    };
    obj = JSON.parse(JSON.stringify(obj));
    dispatch(viewOrder(obj));
  }, [currentPage]);
  React.useEffect(() => {
    if (orderHistory) {
      const pages = parseInt(orderCount / 12 );
      setTotalPages(pages);
    }
  }, [orderHistory]);

  return (
    <div className="bg-slate-100">
      <br />
      <div className="container mx-auto  rounded-sm shadow-sm bg-white">
        <figure disabled={loading}></figure>
        <div className="md:p-8 p-4">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl md:mt-0 mt-1">
              Account Details
            </h1>
            <button
              onClick={() => dispatch(logout())}
              className="ml-8 md:w-[8rem] whitespace-nowrap inline-flex items-center justify-center px-2 py-1 md:px-4 md:py-2 border border-transparent  shadow-sm text-base md:font-medium text-white bg-red-700 hover:bg-red-800"
            >
              Log out
            </button>
          </div>
          <hr className="mt-4" />
          <div className="mt-4">
            <PersonIcon />
            <span className="ml-4 text-slate-600 capitalize">
              {userInfo?.result.clientInfo.name}
            </span>
          </div>
          <div className="mt-1">
            <MarkunreadIcon />
            <span className=" ml-4 text-slate-600 ">
              {userInfo?.result.clientInfo.email}
            </span>
          </div>
          <div className="mt-1">
            <button
              onClick={() =>
                navigate(
                  `/user-order-details/${userInfo?.result?.clientInfo?.name}`
                )
              }
            >
              <BorderColorIcon style={{ color: "black" }} />
              <span className="capitalize ml-4 text-blue-600 cursor-pointer  p-1 hover:text-red-600 underline underline-offset-4">
                edit profile
              </span>
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="md:container md:mx-auto p-8 bg-white shadow-sm">
        <div>
          <h1 className="font-semibold text-2xl md:mt-0 mt-1">My Orders</h1>
        </div>
      </div>
      <div className="bg-slate-100 md:container md:mx-auto shadow-sm">
        <ul className="flex justify-around py-6">
          <li className="uppercase md:text-lg md:font-medium">order no.</li>
          <li className="uppercase text-lg font-medium">date</li>
          <li className="uppercase text-lg font-medium">status</li>
          <li className="uppercase text-lg font-medium">total</li>
          <li className="uppercase text-lg font-medium">action</li>
        </ul>
      </div>
      <div className="md:container md:mx-auto bg-white shadow-sm">
        {Children.toArray(
          orderHistory?.map((order, index) => {
            return (
              <>
                <ul
                  bg={index % 2 === 0 ? "red" : "blue"}
                  className="flex justify-around py-6 "
                >
                  <li className="font-medium">#{order.id}</li>
                  <li className="font-medium sm:ml-10">
                    {order.dateOrderPlaced.slice(8, 10)}/
                    {order.dateOrderPlaced.slice(5, 7)}/
                    {order.dateOrderPlaced.slice(2, 4)}
                  </li>
                  <li className="capitalize font-medium">{order.status}</li>
                  <li className="capitalize font-medium">
                    Rs {Math.round(order.amount)}
                  </li>
                  <li className=" capitalize font-medium cursor-pointer bg-red-700 hover:bg-red-800 shadow-sm px-6 py-2 rounded-md">
                    <button
                      className="text-white capitalize"
                      onClick={() =>
                        navigate(`/user-order-details/${order.id}`)
                      }
                    >
                      <span>view</span>
                    </button>
                  </li>
                </ul>
              </>
            );
          })
        )}
        <div className=" border-0 border-t-2 border-b-2 border-b-slate-200 border-t-slate-200 flex justify-center p-3 bg-white">
          {/* <div className="inline-flex mt-2 xs:mt-0 "> */}
          <Pagination
            count={totalPages}
            size="large"
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationChange}
          />
          {/* </div> */}
        </div>
      </div>

      <br />
    </div>
  );
};
export default UserProfile;
