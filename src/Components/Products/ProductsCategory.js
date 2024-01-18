import React, { useEffect } from "react";
import image1 from "../../Assets/Images/1.png";
import image2 from "../../Assets/Images/2.png";
import image3 from "../../Assets/Images/3.png";
import image4 from "../../Assets/Images/4.png";
import image5 from "../../Assets/Images/5.png";
import image6 from "../../Assets/Images/6.png";
import image7 from "../../Assets/Images/7.png";
import image8 from "../../Assets/Images/8.png";
import image9 from "../../Assets/Images/9.png";
import image10 from "../../Assets/Images/10.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryList } from "../../Redux/AyncCall/categoryActions";
import { Children } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

const products = [
  {
    id: 1,
    icon: image1,
    styles: "#ffebee",
  },
  {
    id: 2,
    icon: image2,
    styles: "#fce4ec",
  },
  {
    id: 3,
    icon: image3,
    styles: "#f3e5f5",
  },
  {
    id: 4,
    icon: image4,
    styles: "#ede7f6",
  },
  {
    id: 5,
    icon: image5,
    styles: "#e8eaf6",
  },
  {
    id: 6,
    icon: image6,
    styles: "#e3f2fd",
  },
  {
    id: 7,
    icon: image7,
    styles: "#e1f5fe",
  },
  {
    id: 8,
    icon: image8,
    styles: "#e0f7fa",
  },
  {
    id: 9,
    icon: image9,
    styles: "#e0f2f1",
  },
  {
    id: 10,
    icon: image10,
    styles: "#e8f5e9",
  },
];

export default function ProductsCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, catList } = useSelector((state) => state.category);
  const page = 0;
  const limit = 10;
  useEffect(() => {
    const data = {
      page,
      limit,
    };

    dispatch(categoryList(data));
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container rounded shadow-sm mt-10 lg:mx-auto bg-white">
        <h1 className="py-5 px-5 md:py-10 md:px-10 font-medium text-xl md:text-3xl">
          Product Categories
        </h1>
        <hr />
        <div className="">
          <div className="md:h-[39rem] lg:h-[26rem] xl:h-[32rem] 2xl:h-[40rem]">
            {loading ? (
              <div className="w-full h-full flex justify-center">
                <Box sx={{ display: "flex", padding: "15rem" }}>
                  <CircularProgress size={40} />
                </Box>
              </div>
            ) : (
              <ul className="flex flex-wrap justify-start p-2">
                {Children.toArray(
                  catList?.map((cat, index) => {
                    return (
                      <li
                        onClick={() => navigate(`/shop/${cat.id}`)}
                        className="flex w-[25rem] sm:w-1/2 md:w-1/4 lg:w-1/5 justify-center py-0 2xl:py-4"
                      >
                        <div
                          style={{ backgroundColor: products[index].styles }}
                          className="my-1 mx-1 py-2 sm:py-8 md:h-[12rem] md:w-[12rem] h-64 w-64 xl:w-[15rem] xl:h-[15rem] 2xl:h-[17rem] 2xl:w-[17rem] rounded shadow-sm text-center"
                        >
                          <h1 className="font-medium p-6 md:p-2 truncate">
                            {cat.title}
                          </h1>
                          <div className="flex justify-center">
                            <img
                              alt="something something"
                              className="pt-6 scale-60 md:scale-50 2xl:scale-75  hover:scale-75 2xl:hover:scale-95 transition-transform"
                              src={products[index].icon}
                            ></img>
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
