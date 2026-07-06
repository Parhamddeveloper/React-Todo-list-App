import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "./CircularProgress/CircularProgress";

export const TasksCompletedPercent = () => {
  //States
  const TodoList = useSelector((state) => state.todo.TodoList);
  const [TasksCompleted, SetTasksCompleted] = useState([]);
  const [CompletedTasksPercent, SetCompletedTasksPercent] = useState(0);

  //UseEffects
  useEffect(() => {
    const CompleteTasks = TodoList.filter((Task) => {
      if (Task.Status === "Complete") {
        return Task;
      }
    });
    SetTasksCompleted(CompleteTasks);
  }, [TodoList]);
  useEffect(() => {
    let Percent = 0;
    Percent = (TasksCompleted.length / TodoList.length) * 100;
    SetCompletedTasksPercent(Percent);
  }, [TasksCompleted]);

  return (
    <>
      {TodoList.length > 0 && (
        <div className="bg-[#bb849332] rounded-3xl p-3 mt-9 flex glass-effect">
          <div className="w-[60px] relative h-[60px] flex  border rounded-full border-[#DBAFA0] items-center justify-center">
            
            {/* <CircularProgress
              variant="determinate"
              value={CompletedTasksPercent}
              size={50}
            className="absolute top-1/2 left-1/2"
              style={{ transform: "translate(-50%,-50%) rotate(-90deg)" }}
            /> */}
            <CircularProgress value={CompletedTasksPercent}/>
          </div>

          <p className=" text-white font-semibold text-md ms-3 ">
            {TasksCompleted.length ? (<>
                        You have completed {TasksCompleted.length} of {TodoList.length}{" "}
            tasks
            {CompletedTasksPercent === 100 && (
              <span className="font-normal block">
                Great! All tasks are done
              </span>
            )}</>) : "You have not done any tasks yet"}

          </p>
        </div>
      )}
    </>
  );
};
