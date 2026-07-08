import { useSelector } from "react-redux";
import { TaskItem } from "../TaskItem/TaskItem";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { BsClipboard2X } from "react-icons/bs";
export const TodoListContainer = () => {
  //states
  const TodoList = useSelector((state) => state.todo.TodoList);
  const SortedTodoList = [...TodoList];
  const FilterStatus = useSelector((state) => state.todo.FilterStatus);
  const SearchFilter = useSelector((state) => state.todo.SearchFilter);
  SortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  //filter tasks
  const FilteredTodoList = SortedTodoList.filter((Item) => {
    if (FilterStatus === "All") {
      if (SearchFilter === "") {
        return Item;
      } else {
        const filter = SearchFilter.toUpperCase();
        if (Item.Title.toUpperCase().indexOf(filter) > -1) {
          return Item;
        }
      }
    } else {
      if (Item.Status === FilterStatus) {
        if (SearchFilter === "") {
          return Item;
        } else {
          const filter = SearchFilter.toUpperCase();
          if (Item.Title.toUpperCase().indexOf(filter) > -1) {
            return Item;
          }
        }
      }
    }
  });

  //animations
  const Container = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
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
    <motion.main
      className="space-y-4"
      variants={Container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {FilteredTodoList && FilteredTodoList.length > 0 ? (
          <>
            {FilteredTodoList.map((TodoItem) => {
              if (TodoItem.IsPinned === true) {
                return <TaskItem data={TodoItem} key={TodoItem.id} />;
              }
            })}
            {FilteredTodoList.map((TodoItem) => {
              if (TodoItem.IsPinned === false)
                return <TaskItem data={TodoItem} key={TodoItem.id} />;
            })}
          </>
        ) : (
          <>
            <motion.div
              variants={Child}
              initial="hidden"
              animate="visible"
              className=" m-auto "
            >
              <div className="m-auto">
                <BsClipboard2X className="text-white/35 text-[180px] mt-6 m-auto" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
};
