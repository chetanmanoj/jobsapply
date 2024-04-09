import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  // useState and function for toggling the navbar on mobile render
  const [toggle, setToggle] = useState(false);
  const toggleNav = () => {
    setToggle(!toggle);
  };
  // define max-width for responsive navbar
  const isMobile = useMediaQuery({ maxWidth: 900 });

  // DESKTOP RENDER
  if (!isMobile) {
    return (
      <motion.div
        className="w-screen h-[80px] text-navbar  px-12 text-[1.5rem] flex flex-row items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* LEFT HAND SIDE  */}
        <div className="flex justify-start items-start font-bold">
          <span>Jobs</span>
          <span className="text-secondary">Apply</span>
          <span className="text-[0.7rem] align-bottom">UK</span>
        </div>
        {/* NAV ELEMENTS OR BUTTONS  */}
        <div className="flex flex-row items-center gap-5 text-[1.3rem] font-medium">
          <button className="text-secondary border-b-2 border-secondary">
            Home
          </button>
          <button>Companies</button>
          <button>Salaries</button>
        </div>
        {/* RIGHT HAND SIDE  */}
        <div className="flex flex-row items-end gap-5">
          <motion.button
            className=" rounded-xl px-6 py-2 border-2 border-secondary text-[1rem]"
            whileHover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}
          >
            SIGN IN
          </motion.button>
          <motion.button
            className=" rounded-xl px-6 py-2 bg-secondary border-2 border-secondary text-primary text-[1rem]"
            whileHover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}
          >
            POST A JOB
          </motion.button>
        </div>
      </motion.div>
    );
  }
  // MOBILE RENDER
  else {
    return (
      <div className="flex flex-row items-center justify-between w-screen px-14 pt-6 ">
        <button className="flex justify-start text-navbar text-[1.2rem] font-bold items-start">
          <span>Jobs</span>
          <span className="text-secondary">Apply</span>
          <span className="text-[0.5rem]">UK</span>
        </button>
        {/* TOGGLE NAVBAR  */}
        <button
          onClick={toggleNav}
          className="relative text-black text-[1.5rem] "
        >
          {toggle ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
          <ul
            className={
              toggle
                ? "list-none absolute bg-white flex flex-col text-left border-2 -ml-12 border-solid w-48 gap-5 top-full left-1/2 transform -translate-x-1/2 z-10 text-[1rem]  rounded-xl p-4 text-black "
                : "hidden"
            }
          >
            <button className="text-secondary">Home</button>
            <button>Companies</button>
            <button>Salaries</button>
            <button>SIGN IN </button>
            <button>POST A JOB </button>
          </ul>
        </button>
      </div>
    );
  }
};

export default NavBar;
