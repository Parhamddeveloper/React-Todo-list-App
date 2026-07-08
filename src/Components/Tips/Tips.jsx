import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export const Tips = () => {
  //states
  let [TipNumber, SetTipNumber] = useState(0);
  let [State,SetState] = useState(false)

  //Tip data
  let Tips = [
    "Welcome to Todo app 🙌",
    "Don't forget to do Tasks 😉",
    "Work hard 🚶‍♂️🚶‍♀️",
    "Now go and try to check all tasks✅",
    "Don't forget to do exercise everyday 🏃‍♂️🏃‍♀️",
    "You can pin tasks 📌",
    "Have a routine in your life 🕑",
    "Good luck 🍀"
  ];

  //Animation
  const TipAnim = {
    hidden: {
      x: -50,
      transition: 0.5,
    },
    visible: {
      transform: "scale(1)",
      x: 0,
      transition: 0.5,
    },
  };

  //Handler
  const ChangeTextHandler = () => {
    const TipRandNumber = Math.floor(Math.random() * Tips.length);
    SetTipNumber(TipRandNumber);
    SetState(!State)
  };

  //UseEffects
  useEffect(()=>{
    SetState(true)
  },[])
  useEffect(() => {
    setTimeout(ChangeTextHandler, 4000);
  },[State]);

  return (
    <motion.p
      variants={TipAnim}
      initial="hidden"
      animate="visible"
      className="text-center font-semibold text-xl mt-6 text-white"
      key={TipNumber}
    >
      {Tips[TipNumber]}
    </motion.p>
  );
};
