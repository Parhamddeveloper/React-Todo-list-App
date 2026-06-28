import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AddTodo } from "../../Redux/Slice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
export const AddTaskPage = () => {
  //States
  const [Title, SetTitle] = useState("");
  const [Description, SetDescription] = useState("");
  const [Status, SetStatus] = useState("Incomplete");
  const [IsEmojiPickerOpen, SetIsEmojiPickerOpen] = useState(false);
  const [DeadlineDate, SetDeadLineDate] = useState("");
  const [Emoji, SetEmoji] = useState("");

  //useNavigate
  const Navigate = useNavigate();

  //UseDispatch
  const dispatch = useDispatch();

  //Ref
  const TitleRef = useRef();

  //Handlers
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (Title === "") {
      toast.error("Title is empty", {
        theme:"colored",
        style: {
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "18px",
          WebkitBackdropFilter: "18px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        },
      });
      TitleRef.current.focus();
    } else if (Title.length > 40 || Description.length > 256) {
      toast.error("you typed more limited lenght");
    } else {
      dispatch(
        AddTodo({
          id: uuid(),
          Title,
          Emoji,
          Status,
          Description,
          DeadlineDate,
          IsPinned: false,
          time: new Date().toLocaleDateString(),
        }),
      );
      Navigate("/");
      toast.success("Task added successfully", {
        position: "top-right",
        theme: "colored",
        style: {
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "18px",
          WebkitBackdropFilter: "18px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  };

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

  const EmojiHandler = (emojiobject) => {
    SetEmoji(emojiobject.imageUrl);
    SetIsEmojiPickerOpen(false);
  };
  const ClearEmojiHandler = () => {
    SetEmoji("");
    SetIsEmojiPickerOpen(false);
  };

  //Animations
  const Drop3 = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <div className="max-w-[860px] relative m-auto p-4 py-8 flex items-center flex-col space-y-8 h-screen">
        <Link
          className="left-0 top-5 absolute text-xl flex gap-3 text-white ms-3 items-center"
          to={"/"}
        >
          <FaArrowLeftLong />
          <p className="text-lg">
            Back <span className="hidden lg:inline-block">(esc)</span>
          </p>
        </Link>
        <h1 className="text-3xl text-white font-semibold">Add new task</h1>
        <button
          aria-label="Open Emoji Picker"
          onClick={() => SetIsEmojiPickerOpen(!IsEmojiPickerOpen)}
        >
          <div className="w-[100px] h-[100px] glass-effect rounded-full relative flex justify-center items-center text-white cursor-pointer">
            {Emoji == "" ? (
              <RiEmojiStickerLine className="text-[70px]" />
            ) : (
              <img src={Emoji} />
            )}
            <div className="w-[40px] h-[40px] glass-effect rounded-full text-xl  absolute bottom-0 right-[-10px] backdrop-blur-3xl flex items-center justify-center">
              <FaPen className="text-lg" />
            </div>
          </div>
        </button>
        {IsEmojiPickerOpen && (
          <motion.div
            variants={Drop3}
            exit={"exit"}
            initial="hidden"
            animate="visible"
          >
            <EmojiPicker theme="dark" onEmojiClick={EmojiHandler} />
            {Emoji !== "" && (
              <button
                className="w-full my-4 glass-effect py-2 text-white/65"
                onClick={ClearEmojiHandler}
              >
                Clear Emoji
              </button>
            )}
          </motion.div>
        )}

        <form
          onSubmit={SubmitHandler}
          action=""
          className="max-w-[460px] w-full flex flex-col justify-center gap-y-5"
        >
          <div className="">
            <input
              type="text"
              placeholder="task name"
              className="w-full glass-effect3 GlassEffectHover1 text-white p-2 focus:outline-none placeholder:text-white/50"
              onChange={(e) => SetTitle(e.target.value)}
              value={Title}
              maxLength={40}
            />

            {Title.length > 0 && (
              <p
                className={`${
                  Title.length >= 40 ? "text-red-500" : "text-white"
                } mt-3 ms-3`}
              >
                {Title.length}/ 40
              </p>
            )}
          </div>
          <div>
            <textarea
              className="w-full h-36 glass-effect3 text-white p-2 GlassEffectHover1 placeholder:text-white/50 focus:outline-none"
              placeholder="Task Description (optional)"
              value={Description}
              onChange={(e) => SetDescription(e.target.value)}
              maxLength={256}
            />
            {Description.length > 0 && (
              <p
                className={`${
                  Description.length === 256 ? "text-red-500" : "text-white"
                } mt-3 ms-3`}
              >
                {Description.length}/ 256
              </p>
            )}

            <input
              type="type"
              name=""
              id=""
              value={DeadlineDate}
              onChange={(e) => SetDeadLineDate(e.target.value)}
              placeholder="Task deadline"
              onBlur={(e) => (e.target.type = "text")}
              onFocus={(e) => (e.target.type = "date")}
              className="glass-effect3 hover:outline-none placeholder:text-white/50 w-full text-white p-2 mt-5 GlassEffectHover1 focus:outline-none"
            />
          </div>
          <div></div>
          <button
            type="submit"
            className="text-white transition-all glass-effect3 GlassEffectHover1 rounded-full py-4 AddTaskBTN"
          >
            Add task
          </button>
        </form>
      </div>
    </>
  );
};
