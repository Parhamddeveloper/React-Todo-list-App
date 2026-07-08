import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { EditTodo } from "../../Redux/Slice";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const EditTodoModal = ({
  IsOpen,
  SetIsOpen,
  TaskTitle,
  TaskDescription,
  TaskDeadLine,
  TaskEmoji,
  id,
}) => {
  //states
  const [Title, SetTitle] = useState(TaskTitle);
  const [Description, SetDescription] = useState(TaskDescription);
  const [DeadLine, SetDeadLine] = useState(TaskDeadLine);
  const [Emoji, SetEmoji] = useState(TaskEmoji);
  const [IsEmojiPickerOpen, SetIsEmojiPickerOpen] = useState(false);

  //UseNavigate
  const Navigate = useNavigate()

  //ref
  const TitleRef = useRef();

  //dispatch
  const dispatch = useDispatch();

  //Handlers
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (Title !== "") {
      dispatch(
        EditTodo({
          Title,
          id,
          Description,
          DeadLine,
          Emoji,
        }),
      );
      SetIsOpen(false);
    }
    if (Title === "") {
      toast.error("Title is empty");
      TitleRef.current.focus();
    }
  };
  const EmojiHandler = (emojiobject) => {
    SetEmoji(emojiobject.imageUrl);
    SetIsEmojiPickerOpen(false);
  };
  const ClearEmojiHandler = () => {
    SetEmoji("");
    SetIsEmojiPickerOpen(false);
  };

  //Animation
  const Drop1 = {
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
  //Back to homepage with escape key
  useEffect(() => {
    const BackToHomeKey = (e) => {
      if (e.key == "Escape" || e.key == "esc") SetIsOpen(false);
    };
    window.addEventListener("keydown", BackToHomeKey);
    return () => {
      window.removeEventListener("keydown", BackToHomeKey);
    };
  }, [Navigate]);
  return (
    <AnimatePresence>
      {IsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen w-screen  flex bg-black/40 fixed left-0 bottom-0 z-[999] justify-center backdrop-blur-md items-center"
        >
          <motion.div
            className="w-full max-w-[600px] overflow-y-auto   p-2"
            variants={Drop1}
            exit="exit"
            initial="hidden"
            animate="visible"
          >
            <div className="glass-effect p-2 rounded-lg relative max-h-[80vh] EditTaskContainer  overflow-y-auto">
              <h2 className="font-bold text-white my-3 ">Edit Task</h2>
              <form action="" className="mt-7 h-full" onSubmit={HandleSubmit}>
                <button
                  className="block m-auto my-4"
                  aria-label="Open Emoji Picker"
                  type="button"
                  onClick={() => SetIsEmojiPickerOpen(!IsEmojiPickerOpen)}
                >
                  <div className="w-[100px] h-[100px] bg-[#bb8493c3] rounded-full relative flex justify-center items-center text-[70px] text-white cursor-pointer">
                    {Emoji == "" ? <RiEmojiStickerLine /> : <img src={Emoji} />}
                    <div className="w-[40px] h-[40px] rounded-full text-lg absolute bottom-0 right-[-10px] backdrop-blur-3xl flex items-center justify-center">
                      <FaPen />
                    </div>
                  </div>
                </button>
                {IsEmojiPickerOpen && (
                  <div>
                    <EmojiPicker
                      theme="dark"
                      className="m-auto"
                      onEmojiClick={EmojiHandler}
                    />
                    {Emoji !== "" && (
                      <button
                        className="w-full my-4 glass-effect3 text-white GlassEffectHover1 py-3 rounded-xl transition-all"
                        onClick={ClearEmojiHandler}
                      >
                        Clear Emoji
                      </button>
                    )}
                  </div>
                )}

                <div className="">
                  <input
                    type="text"
                    placeholder="task name"
                    className="w-full glass-effect3 GlassEffectHover1 text-white p-2 focus:outline-none placeholder:text-white/50 transition-all"
                    onChange={(e) => SetTitle(e.target.value)}
                    value={Title}
                    maxLength={40}
                  />
                  {Title.length > 0 && (
                    <p
                      className={`${
                        Title.length === 40 ? "text-red-500" : "text-white"
                      } mt-3 ms-3`}
                    >
                      {Title.length}/ 40
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <textarea
                    className="w-full h-36 glass-effect3 text-white p-2 GlassEffectHover1 placeholder:text-white/50 focus:outline-none transition-all"
                    placeholder="Task Description (optional)"
                    value={Description}
                    onChange={(e) => SetDescription(e.target.value)}
                    maxLength={256}
                  />
                  {Description.length > 0 && (
                    <p
                      className={`${
                        Description.length === 256
                          ? "text-red-500"
                          : "text-white"
                      } mt-3 ms-3`}
                    >
                      {Description.length}/ 256
                    </p>
                  )}
                </div>
                <input
                  type="type"
                  name=""
                  id=""
                  value={DeadLine}
                  onChange={(e) => SetDeadLine(e.target.value)}
                  placeholder="Task deadline"
                  onBlur={(e) => (e.target.type = "text")}
                  onFocus={(e) => (e.target.type = "date")}
                  className="glass-effect3 placeholder:text-white/50 w-full text-white p-2 mt-5 GlassEffectHover1 transition-all focus:outline-none"
                />
                <div className="mt-7 space-x-2">
                  <button
                    type="submit"
                    className=" bg-[#dbafa06f] glass-effect py-2 px-4 text-white rounded"
                  >
                    Update Task
                  </button>
                  <button
                    type="button"
                    className="bg-[#70426498] glass-effect py-2 px-4 rounded text-white"
                    onClick={() => SetIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
