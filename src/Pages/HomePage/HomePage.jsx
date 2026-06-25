import React, { useEffect, useRef, useState } from "react";
import { TodoListContainer } from "../../Components/TodoListContainer";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFilterStatus, UpdateSearchFilter } from "../../Redux/Slice";
import { Tips } from "../../Components/Tips";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TasksCompletedPercent } from "../../Components/TasksCompletedPercent";
import { FaCaretDown, FaGithub } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export const HomePage = () => {
  //Use selectors
  const FilterStatus = useSelector((state) => state.todo.FilterStatus);
  const SearchFilter = useSelector((state) => state.todo.SearchFilter);
  //States
  const [IsFilterOpen, SetIsFilterOpen] = useState(false);
  //Refs
  const menuRef = useRef();
  //dispatch
  const dispatch = useDispatch();
  //Handlers
  const StatusFilterHandler = (filterStatus) => {
    dispatch(UpdateFilterStatus(filterStatus));
    SetIsFilterOpen(false);
  };
  const SearchFilterHandler = (e) => {
    dispatch(UpdateSearchFilter(e.target.value));
  };

  //UseEffect 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        const filterButton = menuRef.current.previousSibling;
        if (filterButton && filterButton.contains(e.target)) {
          return;
        }
        SetIsFilterOpen(false);
      }
    };
    if (IsFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [IsFilterOpen]);

  //animation
  const Drop2 = {
    hidden: {
      opacity: 0,
      transform: "scale(0.9)",
    },
    visible: {
      transform: "scale(1)",
      opacity: 1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
    exit: {
      transform: "scale(0.9)",
      opacity: 0,
    },
  };

  return (
    <>
      <a
        href="https://github.com/Parhamddeveloper"
        target="_blank"
        className="text-center block mt-4"
      >
        <button aria-label="Parham Daneshnejad's github page button">
          <FaGithub className="text-white text-[70px]" />
        </button>
      </a>
      <Tips />
      <div className="m-auto max-w-[860px] p-4">
        <TasksCompletedPercent />
        <div className="flex justify-between items-center mt-11 ">
          <div className="flex items-center gap-x-2 justify-between w-full relative text-white/70">
            <CiSearch className=" text-[#d0d1cc93] text-2xl absolute z-20 left-4" />
            <input
              type="text"
              className="w-full glass-effect3 text-white transition-all p-2 ps-10 rounded-xl focus:border-[#7776B3] focus:outline-0 focus:outline-none text-lg"
              name=""
              id=""
              value={SearchFilter}
              onChange={SearchFilterHandler}
              aria-label="Search Input"
              maxLength={40}
            />

            <div
              aria-label="Tasks status filter"
              className="glass-effect3 py-2 text-white w-2/5 md:w-1/6 flex justify-around items-center relative z-[99] cursor-pointer select-none "
              onClick={() => SetIsFilterOpen(!IsFilterOpen)}
            >
              <p>{FilterStatus}</p>
              <FaCaretDown />
            </div>
            <AnimatePresence>
              {IsFilterOpen && (
                <motion.div
                  variants={Drop2}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-12 w-[105px] lg:w-[115px] right-0 z-[999] glass-effect px-5 flex flex-col text-center justify-center items-center gap-y-1 cursor-pointer  text-white/80"
                  ref={menuRef}
                >
                  <div
                    className="z-[99]"
                    onClick={(filterStatus) => StatusFilterHandler("All")}
                  >
                    All
                  </div>
                  <div
                    className="z-[99]"
                    onClick={(filterStatus) =>
                      StatusFilterHandler("Incomplete")
                    }
                  >
                    Incomplete
                  </div>
                  <div
                    className="z-[99]"
                    onClick={(filterStatus) => StatusFilterHandler("Complete")}
                  >
                    Complete
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-3">
          <TodoListContainer />
        </div>
      </div>
      <Link to="/add-task">
        <button
          aria-label="Add task"
          className="glass-effect2 flex rotate-0  text-white fixed w-[60px] h-[60px] rounded-full justify-center items-center p-4 duration-500 transition-all hover:rotate-90 text-4xl  bottom-14  right-[25px] z-[50]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-12">
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
    </>
  );
};
