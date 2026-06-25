import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export const TaskDetailsPage = () => {
  const TodoList = useSelector((state) => state.todo.TodoList);
  const TaskId = useParams().taskid;
  const TaskInfo = TodoList.find((Task) => Task.id == TaskId);
  return (
    <div className="max-w-[960px] m-auto relative my-8 px-3">
      <Link to={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-10 absolute  text-white"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
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
