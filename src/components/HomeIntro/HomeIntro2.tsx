import { useState } from "react";
import { motion } from "framer-motion";

const HomeIntro2 = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const options = [
    "Just me",
    "2-5 people",
    "6-50 people",
    "51-100 people",
    "101-250 people",
    "More Than 250 people",
  ];

  return (
    <motion.div
      className="w-11/12 mx-auto my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.p
        className="my-6 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        How big is your Company?
      </motion.p>

      <div className="grid grid-cols-3 gap-3 items-center text-white rounded-2xl">
        {options.map((label, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`text-black border border-[#006666] rounded-lg px-4 py-1 text-xl transition-all duration-150
              ${activeIndex === index ? "bg-[#006666] text-white" : "bg-white"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeIntro2;
