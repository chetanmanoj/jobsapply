import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const toggleNav = () => {
    setToggle(!toggle);
  };

  if (!isMobile) {
    return (
      <motion.div
        className="w-screen h-[80px] text-navbar  px-12 text-[1.5rem] flex flex-row items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-start items-start font-bold">
          <span>Jobs</span>
          <span className="text-[#1a70eb]">Apply</span>
        </div>
        <div className="flex flex-row items-center gap-5 text-[1.3rem] font-medium">
          <button className="text-[#1a70eb] border-b-2 border-[#1a70eb]">
            Home
          </button>
          <button>Companies</button>
          <button>Salaries</button>
        </div>

        <div className="flex flex-row items-end gap-5">
          <motion.button
            className=" rounded-xl px-6 py-2 border-2 border-[#1a70eb] text-[1rem]"
            whileHover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}
          >
            SIGN IN
          </motion.button>
          <motion.button
            className=" rounded-xl px-6 py-2 bg-[#1a70eb] border-2 border-[#1a70eb] text-white text-[1rem]"
            whileHover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}
          >
            POST A JOB
          </motion.button>
        </div>
      </motion.div>
    );
  } else {
    // MOBILE RENDER
    return (
      <div className="flex flex-row items-center justify-between w-screen px-14 pt-6 ">
        <button className="flex justify-start text-navbar text-[1.2rem] font-bold items-start">
          JobsApply
        </button>

        <button
          onClick={toggleNav}
          className="relative text-secondary text-[1.5rem] "
        >
          {toggle ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
          <ul
            className={
              toggle
                ? "list-none absolute bg-white flex flex-col gap-5 top-full left-1/2 transform -translate-x-1/2 text-[1rem] border-2 border-solid border-secondary rounded-xl p-4 text-black "
                : "hidden"
            }
          >
            <button className="text-[#1a70eb]">Home</button>
            <button>Companies</button>
            <button>Salaries</button>
          </ul>
        </button>
      </div>
    );
  }
};

export default NavBar;
