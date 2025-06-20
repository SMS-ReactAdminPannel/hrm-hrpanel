import Image from "../../assets/HomePage/profile.webp";
import { motion } from "framer-motion";

const HomeIntro1 = () => {
  return (
    <motion.div
      className="w-3/4 mx-auto my-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.p
        className="my-6 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome! Let's set up your Yoho - this will only take a minute.
      </motion.p>

      <motion.div
        className="flex items-center bg-[#006666] text-white px-6  rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.section
          className="w-1/2 pr-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores sequi
          maxime fugiat ab error ea at maiores a reiciendis inventore iure, id
          corporis omnis deserunt quos accusamus quis voluptas vero.
        </motion.section>

        <motion.section
          className="w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <img src={Image} alt="Profile Illustration" className="w-full h-auto" />
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default HomeIntro1;
