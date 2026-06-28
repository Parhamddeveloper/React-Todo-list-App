import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ActiveTodo } from "../Redux/Slice";
import { EditTodoModal } from "./EditTodoModal";
import { motion } from "framer-motion";
import { TaskOptions } from "./TaskOptions";
import { FaCheckCircle } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
export const TaskItem = ({ data }) => {
  //states
  const [IsEditModalOpen, SetIsEditModalOpen] = useState(false);
  const [IsCompleted, SetIsCompleted] = useState(data.Status);
  const [IsShowMore, SetIsShowMore] = useState(true);
  const [Ispinned, SetIspinned] = useState(data.IsPinned);
  const [IsShowMoreOptionsOpen, SetIsShowMoreOptionsOpen] = useState(false);
  const EditBTNRef = useRef();

  //dispatches
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      ActiveTodo({
        id: data.id,
        IsCompleted,
      }),
    );
  }, [IsCompleted]);

  const ShowMoreOptionsHandler = () => {
    SetIsShowMoreOptionsOpen(true);
  };

  //Active Todo Handler
  const ActiveTodoHandler = (e) => {
    if (e.target !== EditBTNRef) {
      if (IsCompleted === "Incomplete") {
        SetIsCompleted("Complete");
      } else if (IsCompleted === "Complete") {
        SetIsCompleted("Incomplete");
      }
    }
  };

  //Animation
  const Child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  //JSX Return
  return (
    <>
      <EditTodoModal
        IsOpen={IsEditModalOpen}
        SetIsOpen={SetIsEditModalOpen}
        TaskTitle={data.Title}
        TaskStatus={data.Status}
        id={data.id}
        TaskDescription={data.Description}
        TaskDeadLine={data.DeadlineDate}
        TaskEmoji={data.Emoji}
      />
      <motion.div
        className={`flex  p-5 transition-all duration-500 justify-between items-center rounded-3xl text-[#704264]  h-[150px] glass-effect  ${
          IsCompleted === "Complete" &&
          "border-l-8 border-l-[#d0d1cc93] shadow-[0_0_20px_0px_#1987c2]"
        } `}
        onClick={ActiveTodoHandler}
        variants={Child}
      >
        <div className="flex space-x-5 relative items-center transition-all">
          {Ispinned && (
            <div className="absolute left-[-15px]">
              <TiPin className="text-4xl text-white" />
            </div>
          )}
          <div className={`${Ispinned ? "ps-5" : "ps-1"}`}>
            {data.Emoji !== "" && (
              <div
                className="glass-effect3 w-[85px] h-[85px] transition-all flex items-center justify-center rounded-xl"
                style={{ transform: "translateZ(0px)" }}
              >
                {data.Status === "Complete" ? (
                  <FaCheckCircle className="text-white text-4xl stroke-none" />
                ) : (
                  <>
                    <img src={data.Emoji} className="w-11 sm:w-auto h-auto" />
                  </>
                )}
              </div>
            )}
            {data.Emoji === "" && data.Status === "Complete" && (
              <div
                className="glass-effect3 w-[85px] h-[85px] transition-all flex items-center justify-center rounded-xl"
                style={{ transform: "translateZ(0px)" }}
              >
                <FaCheckCircle className="text-white text-4xl stroke-none" />
              </div>
            )}
            {data.Emoji !== "" && (
              <p className="mt-3 ">
                {data.DeadlineDate === "" ? (
                  data.time
                ) : (
                  <p className="flex relative">
                    <svg
                      width="25px"
                      height="25px"
                      className="absolute left-[-16px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 5.5L5 3.5M21 5.5L19 3.5M12 8.5V12.5L14 14.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <span className="ms-2">{data.DeadlineDate}</span>
                  </p>
                )}
              </p>
            )}
            {data.Emoji === "" && data.Status === "Complete" && (
              <p className="mt-3">
                {data.DeadlineDate === "" ? (
                  data.time
                ) : (
                  <p className="flex relative">
                    <svg
                      width="25px"
                      height="25px"
                      className="absolute left-[-16px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 5.5L5 3.5M21 5.5L19 3.5M12 8.5V12.5L14 14.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <span className="ms-2">{data.DeadlineDate}</span>
                  </p>
                )}
              </p>
            )}
          </div>
          <div
            className={`transition-all ${
              IsShowMore
                ? "w-[195px] sm:w-[455px] overflow-hidden text-ellipsis "
                : "w-[195px] sm:w-[455px]"
            } `}
          >
            <h2 className="text-lg sm:text-xl font-semibold break-words">
              {data.Title}
            </h2>
            <p
              className={`text-lg ${
                IsShowMore
                  ? "overflow-hidden whitespace-nowrap"
                  : "break-words "
              } inline`}
            >
              {data.Description}
            </p>

            {data.Description.length > 28 && (
              <button
                className={` font-semibold block`}
                onClick={() => SetIsShowMore(!IsShowMore)}
                type="button"
              >
                {IsShowMore ? "Show more" : "Show less"}
              </button>
            )}
            {data.Emoji === "" && data.Status === "Incomplete" && (
              <p>
                {data.DeadlineDate === "" ? (
                  data.time
                ) : (
                  <p className="flex relative ">
                    <svg
                      width="25px"
                      height="25px"
                      className=""
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 5.5L5 3.5M21 5.5L19 3.5M12 8.5V12.5L14 14.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <span className="">{data.DeadlineDate}</span>
                  </p>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="space-x-3 flex relative" ref={EditBTNRef}>
          <button
            className="text-3xl absolute right-[-15px] top-1/2 translate-y-[-50%] w-[45px] h-[35px] space-y-2"
            onClick={ShowMoreOptionsHandler}
          >
            {/* <FiMoreVertical /> */}
            <div className="w-[5px] h-[5px] bg-[#49243E] rounded-full"></div>
            <div className="w-[5px] h-[5px] bg-[#49243E] rounded-full"></div>
            <div className="w-[5px] h-[5px] bg-[#49243E] rounded-full"></div>
          </button>
        </div>
      </motion.div>
      <TaskOptions
        id={data.id}
        Title={data.Title}
        IsOpen={IsShowMoreOptionsOpen}
        SetIsOpen={SetIsShowMoreOptionsOpen}
        IsCompleted={IsCompleted}
        SetIsCompleted={SetIsCompleted}
        IsPinned={Ispinned}
        SetIsPinned={SetIspinned}
        IsEditModalOpen={IsEditModalOpen}
        SetIsEditModalOpen={SetIsEditModalOpen}
      />
    </>
  );
};
