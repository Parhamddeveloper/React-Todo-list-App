import React, { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export const TaskDetailsPage = () => {
  //useSelector
  const TodoList = useSelector((state) => state.todo.TodoList);
  //TaskInformations
  const TaskId = useParams().taskid;
  const TaskInfo = TodoList.find((Task) => Task.id == TaskId);
  //useNavigate
  const Navigate = useNavigate();

  //Back to homepage with escape key
  useEffect(() => {
    const BackToHomeKey = (e) => {
      if (e.key == "Escape" || e.key == "esc") Navigate("/");
    };
    window.addEventListener("keydown", BackToHomeKey);
    return () => {
      window.removeEventListener("keydown", BackToHomeKey);
    };
  }, [Navigate]);

  return (
    <div className="max-w-[960px] m-auto relative my-8 px-3">
      <Link
        to={"/"}
        className="left-0  absolute text-xl flex gap-3 text-white ms-3 items-center"
      >
        <FaArrowLeftLong />
        <p className="text-lg">
          Back <span className="hidden lg:inline-block">(esc)</span>
        </p>
      </Link>
      <h1 className="text-center text-white text-3xl font-bold">
        Task Details
      </h1>
      <div className="my-12 text-white p-8 w-full rounded-lg shadow-2xl glass-effect3">
        <h3 className="text-center text-2xl font-bold">
          Task : {TaskInfo.Title}
        </h3>
        <table className="mt-5 w-full ">
          <tbody className="divide-y-2 grid grid-cols-1 w-full">
            <tr className="w-full py-4">
              <th className="w-[100px] text-start">Emoji :</th>
              <td>
                {TaskInfo.Emoji === "" ? "none" : <img src={TaskInfo.Emoji} />}
              </td>
            </tr>
            <tr className="w-full py-4">
              <th className="w-[100px] text-start">ID :</th>
              <td>{TaskInfo.id}</td>
            </tr>
            <tr className="w-full py-4">
              <th className="w-[100px] text-start">Description :</th>
              <td>{TaskInfo.Description}</td>
            </tr>
            <tr className="w-full py-4">
              <th className="w-[100px] text-start">Created :</th>
              <td>{TaskInfo.time}</td>
            </tr>
            <tr className="w-full py-4">
              <th className="w-[100px] text-start">Status :</th>
              <td>{TaskInfo.Status}</td>
            </tr>
            <tr className="w-full py-4">
              <th className="w-[100px] text-start">Pinned :</th>
              <td>{!TaskInfo.IsPinned ? "false" : "true"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
