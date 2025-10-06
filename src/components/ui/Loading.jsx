import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 mb-6"
      >
        <div className="w-full h-full rounded-full border-4 border-primary border-t-transparent" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3 w-full max-w-md"
      >
        <div className="h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-card animate-pulse" />
        <div className="h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-card animate-pulse" style={{ animationDelay: "0.1s" }} />
        <div className="h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-card animate-pulse" style={{ animationDelay: "0.2s" }} />
      </motion.div>
      <p className="text-gray-500 text-sm mt-6 animate-pulse">Loading your conversations...</p>
    </div>
  );
};

export default Loading;