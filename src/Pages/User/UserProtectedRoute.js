import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className="unauthorized">
        <div className="bg-slate-100">
          <br />
          <div className="container mx-auto max-h-[60rem] max-w-xl rounded-sm shadow-lg p-20 bg-white">
            <figure></figure>
            <h1 className="mt-10 flex justify-center font-semibold text-4xl mb-6 ">
              Unauthorized :(
            </h1>
            <p className="flex justify-center font-medium text-lg">
              <span>
                <NavLink
                  className="text-red-600 hover:text-red-800 hover:underline"
                  to="/sign-in"
                >
                  Login
                </NavLink>{" "}
                to gain access
              </span>
            </p>
          </div>
          <br />
        </div>
      </div>
    );
  }

  // returns child route elements
  return <Outlet />;
};
export default UserProtectedRoute;
