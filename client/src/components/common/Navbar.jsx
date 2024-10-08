import React, { useEffect, useState } from "react";
import logoImg from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("get", categories.CATEGORIES_API);
      setSubLinks(result.data.categories);
    } catch (error) {
      console.log("failed to fetch categories ", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <nav className="backdrop-blur-lg w-full z-10 border-b-[1px] border-b-richblack-700 px-4 md:px-[60px] text-richblack-25">
      <div className="w-full mx-auto py-3 flex items-center justify-between">
      <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="">
          <Link to="/">
            <img src={logoImg} alt="logo" className="h-8 md:h-10" />
          </Link>
        </div>
       
        <div className={`flex-col  gap-1 ${isMenuOpen ? 'flex' : 'hidden'} absolute top-16 left-0 w-[30%] lg:hidden transition-transform bg-transparent ml-5`}>
          {NavbarLinks.map((items, index) => {
            return (
              <div key={index} className="">
                {items.title === "Catalog" ? (
                  <div
                    className={`group flex items-center cursor-pointer relative py-1 px-3 gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{items.title}</p>
                    <IoIosArrowDown />

                    <div
                      className="hidden absolute left-[50%] top-[50%] z-[1000] w-[200px] translate-x-[-50%] translate-y-[3em] 
                                                    flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-300 group-hover:flex 
                                                    group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45  select-none rounded bg-richblack-5"></div>
                      {subLinks.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            to={`/catalog/${item.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                          >
                            <p>{item.name}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="py-1 px-3">
                    <Link
                      to={items?.path}
                      className={`${
                        matchRoute(items.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {items.title}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={`lg:flex gap-4 hidden     `}>
          {NavbarLinks.map((items, index) => {
            return (
              <div key={index} className="">
                {items.title === "Catalog" ? (
                  <div
                    className={`group flex items-center cursor-pointer relative py-1 px-3 gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{items.title}</p>
                    <IoIosArrowDown />

                    <div
                      className="hidden absolute left-[50%] top-[50%] z-[1000] w-[200px] translate-x-[-50%] translate-y-[3em] 
                                                    flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-300 group-hover:flex 
                                                    group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45  select-none rounded bg-richblack-5"></div>
                      {subLinks.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            to={`/catalog/${item.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                          >
                            <p>{item.name}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="py-1 px-3">
                    <Link
                      to={items?.path}
                      className={`${
                        matchRoute(items.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {items.title}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-row-reverse items-center gap-5">
          {token === null ? (
            <div className="flex gap-4">
              <Link to={"login"}>
                <div className="border border-richblack-700 rounded-md px-3 py-2 backdrop-blur-sm">
                  Log in
                </div>
              </Link>
              <Link to={"signup"}>
                <div className="border border-richblack-700 rounded-md px-3 py-2 backdrop-blur-sm">
                  Sign up
                </div>
              </Link>
            </div>
          ) : (
            <ProfileMenu />
          )}
          {user && user?.accountType !== "instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartShopping />
              <div className="absolute -top-2 -right-3 text-xs bg-pink-400 rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
