import React from "react";
import googlestore from "../../Assets/Images/googlestore.png";
import applestore from "../../Assets/Images/applestore.png";

const brands1 = [
  {
    id: 1,
    name: "knorr",
  },
  {
    id: 2,
    name: "Nestle",
  },
  {
    id: 3,
    name: "Jiffy's",
  },
  {
    id: 4,
    name: "Unilever",
  },
  {
    id: 5,
    name: "Bunny's",
  },

  {
    id: 7,
    name: "Pepsico",
  },
  {
    id: 8,
    name: "Always",
  },
  {
    id: 10,
    name: "Nimco's",
  },
  {
    id: 11,
    name: "Axe",
  },
  {
    id: 12,
    name: "kolson",
  },
  {
    id: 13,
    name: "Nurpur",
  },
  {
    id: 14,
    name: "Blue Band",
  },

  {
    id: 16,
    name: "K&N's",
  },
  {
    id: 17,
    name: "Kellogg's",
  },
  {
    id: 18,
    name: "Gillette",
  },

  {
    id: 21,
    name: "Dalda",
  },
  {
    id: 22,
    name: "Season",
  },
  {
    id: 23,
    name: "JohnsonsBaby",
  },
  {
    id: 24,
    name: "Pampers",
  },
  {
    id: 25,
    name: "Olpers",
  },
  {
    id: 26,
    name: "National",
  },
  {
    id: 27,
    name: "Gillette",
  },
  {
    id: 28,
    name: "Colgate",
  },
  {
    id: 29,
    name: "Sensodyne",
  },
  {
    id: 30,
    name: "Closeup",
  },
  {
    id: 31,
    name: "Dettol",
  },
  {
    id: 32,
    name: "Palmolive",
  },
  {
    id: 34,
    name: "Finish",
  },
  {
    id: 35,
    name: "Lemon Max",
  },
  {
    id: 36,
    name: "Bonus",
  },
  {
    id: 37,
    name: "Youngs",
  },
  {
    id: 38,
    name: "Mitchell's",
  },
  {
    id: 39,
    name: "Figaro",
  },
  {
    id: 40,
    name: "Mama-Sitas",
  },
  {
    id: 42,
    name: "Marhaba",
  },
  {
    id: 43,
    name: "Alshifa",
  },
  {
    id: 44,
    name: "Sufi",
  },
];
const Footer = () => {
  return (
    <div className=" shadow-md bg-white mx-auto mt-2">
      <div className="container   mx-auto">
        <div className="container ">
          <div>
            <h1 className="mb-6 mt-6 mr-2 text-lg font-semibold text-gray-900 uppercase dark:text-white sm:p-0 p-4">
              Top Brands
            </h1>
            <hr />
            <div className="container py-2">
              <div className="flex flex-wrap justify-start">
                {brands1.map((brand) => {
                  return (
                    <a href="!#" className="py-4 px-2" key={brand.id}>
                      {brand.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="container md:flex md:justify-between">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 sm:grid-cols-5 mt-5 sm:p-0 p-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Company
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Location
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Reviews & ratings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us on
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="https://github.com/" className="hover:underline ">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/" className="hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="container mx-auto">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Contact us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-6 md:flex-row">
                  <a href="/jiffy-mail" className="hover:underline">
                    jiffys.co@
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="hover:underline">
                    +92-3047772023
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Useful links
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="/privacypolicy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="mt-4">
                  <a href="/faqs" className="hover:underline">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Download the app
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4 flex ">
                  <a href="https://play.google.com">
                    <img
                      className="p-0.5"
                      alt="google play store design"
                      src={googlestore}
                    ></img>
                  </a>
                  <a href="https://apple.com/app-store">
                    <img
                      className="p-0.5"
                      alt="apple store design"
                      src={applestore}
                    ></img>
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="hover:underline">
                    Developed by{" "}
                    <span className="text-red-700 font-medium">
                      Naveed Javed
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:items-center bg-red-800 ">
        <p className="text-sm text-white-500 sm:text-center md:text-center ld:text-center xl:text-center xxl:text-center text-white dark:text-white-400 h-14 text-center p-4">
          ©{" "}
          <a href="https://www.jiffy.co/" className="hover:underline">
            Jiffy's™
          </a>
          {"  "}
          Pakistan
        </p>
        <p className="h-3 bg-slate-700"></p>
      </div>
    </div>
  );
};

export default Footer;
