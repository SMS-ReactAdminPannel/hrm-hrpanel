import { useState } from "react";
import { motion } from "framer-motion";

const HomeIntro3 = () => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const options = [
    "Consulting",
    "Construction",
    "Digital marketing",
    "Ecommerce",
    "Education",
    "Financial",
    "Government organization",
    "Healthcare",
    "HoReCa",
    "IT",
    "Legal",
    "Manufacturing",
    "Non-profit/NGO",
    "Real estate",
    "Retail",
    "Transport and Storage",
    "Travel",
    "Other"
  ];

  const toggleActive = (index: number) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <motion.div
      className="w-11/12 mx-auto my-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.p
        className="my-6 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        What do you do?
      </motion.p>

      <div className="grid grid-cols-3 gap-3 items-center text-white rounded-2xl">
        {options.map((label, index) => (
          <motion.button
            key={index}
            onClick={() => toggleActive(index)}
            className={`text-black border border-[#006666] rounded-lg px-4 py-1 text-xl transition-all duration-150
              ${activeIndexes.includes(index) ? "bg-[#006666] text-white" : "bg-white"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.03 }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeIntro3;
