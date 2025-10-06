import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full p-8 text-center"
    >
      <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-200">
        <ApperIcon name="AlertCircle" size={40} className="text-error" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Oops!</h2>
      <p className="text-gray-600 mb-8 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" className="gap-2">
          <ApperIcon name="RefreshCw" size={18} />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;