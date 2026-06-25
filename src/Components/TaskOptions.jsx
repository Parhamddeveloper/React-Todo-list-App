import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DeleteTodo, PinTodo } from "../Redux/Slice";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiFillPushpin } from "react-icons/ai";
export const TaskOptions = ({
  id,
  Title,
  IsOpen,
  SetIsOpen,
  IsCompleted,
  SetIsCompleted,
  IsPinned,
  SetIsPinned,
  SetIsEditModalOpen,
}) => {
  //Ref
  const ContainerRef = useRef();

  //UseDispatch
  const dispatch = useDispatch();

  //UseNavigate
  const Navigate = useNavigate();

  //Handlers
  const DeleteHandler = () => {
    dispatch(DeleteTodo(id));
    toast.success("Task Deleted successfully", {
      position: "top-center",
      theme: "colored",
      style: { background: "#766852" },
    });
  };
  const ActiveTodoHandler = () => {
    if (IsCompleted === "Incomplete") {
      SetIsCompleted("Complete");
    } else if (IsCompleted === "Complete") {
      SetIsCompleted("Incomplete");
    }
    SetIsOpen(false);
  };
  const PinHandler = () => {
    SetIsPinned(!IsPinned);
    SetIsOpen(false);
  };
  const EditHandler = () => {
    SetIsEditModalOpen(true);
    SetIsOpen(false);
  };
  const SeeDetailsHandler = () => {
    Navigate(`/details/${id}`);
  };

  //UseEffects
  useEffect(() => {
    dispatch(
      PinTodo({
        id,
        IsPinned,
      })
    );
  }, [IsPinned]);
  useEffect(() => {
    let InvisibleShareModal = (e) => {
      if (ContainerRef.current && !ContainerRef.current.contains(e.target)) {
        SetIsOpen(false);
      }
    };
    document.addEventListener("mousedown", InvisibleShareModal);
  }, [IsOpen]);

  //Animations
  const Container = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
  };

  const Child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <AnimatePresence>
        {IsOpen && (
          <motion.div
            className="h-screen w-screen  flex  fixed left-0 bottom-0 z-[999] justify-end"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              ref={ContainerRef}
              variants={Container}
              animate="visible"
              initial="hidden"
              exit={{ y: 500 }}
              className="bottom-0 fixed h-[50vh] backdrop-blur-xl md:backdrop-blur-sm glass-effect w-full  rounded-t-3xl py-6 lg:left-0 lg:w-1/3 lg:h-screen lg:rounded-t-none lg:rounded-e-xl"
            >
              <h1 className="text-center text-white font-bold border-b border-b-white/60  pb-5">
                {Title}
              </h1>
              <motion.ul
                className="ps-9 my-4 text-white space-y-7"
                variants={Child}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                <li>
                  <button
                    className="flex items-center w-full"
                    onClick={ActiveTodoHandler}
                  >
                    {IsCompleted === "Complete" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    <span className="ms-2">
                      Mark as
                      {IsCompleted === "Complete"
                        ? " not done"
                        : " done"}
                    </span>
                  </button>
                </li>
                <li>
                  <button className="flex items-center w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>

                    <span className="ms-2" onClick={EditHandler}>
                      Edit
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center w-full"
                    onClick={PinHandler}
                  >
                  <AiFillPushpin className="text-white text-2xl" />

                    <span className="ms-2">{IsPinned ? "unpin" : "pin"}</span>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center w-full"
                    onClick={SeeDetailsHandler}
                  >
                    <svg
                      fill="#fff"
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M2,4A1,1,0,0,1,3,3H21a1,1,0,0,1,0,2H3A1,1,0,0,1,2,4Zm1,9H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm0,8h9a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"></path>
                      </g>
                    </svg>

                    <span className="ms-2">See Details</span>
                  </button>
                </li>
                <li className="text-red-600">
                  <button
                    className="flex items-center w-full"
                    onClick={DeleteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="ms-2">Delete</span>
                  </button>
                </li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
