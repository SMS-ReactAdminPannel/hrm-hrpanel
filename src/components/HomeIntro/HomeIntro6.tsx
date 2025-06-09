import Image from "../../assets/HomePage/fullstack-banner.webp";
import { motion } from "framer-motion";

const HomeIntro6 = () => {
  return (
    <div className="w-[450px] mx-auto my-8">
      <motion.p
        className="my-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome! Let's set up your Yoho - this will only take a minute.
      </motion.p>

      <motion.div
        className="h-[250px] flex items-center bg-[#006666] text-white p-4 rounded-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <motion.section
          className="w-1/2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>That's it!</p>
          <p>Now Your Journey is About to begin.</p>
          <p className="py-4">Please wait for some Yoho setup magic to happen first.</p>
          <p>And then - you're good to go</p>
        </motion.section>

        <motion.section
          className="w-1/2 relative"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.img
            src={Image}
            alt=""
            className="absolute top-[-110px] left-[100px] h-[220px] w-[300px]"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </motion.section>
      </motion.div>
    </div>
  )
}

export default HomeIntro6
