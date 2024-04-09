import { motion } from "framer-motion";

const JobCard = ({ id, title, company, maxsalary, location, description }) => {
  return (
    <motion.div
      className="flex tab:flex-row flex-col border-2 shadow-md border-secondary w-9/12 max-h-[25rem] tab:max-h-[20rem] py-4 tab:py-8 tab:min-h-56 desk:py-36 tab:text-[1.2rem] desk:items-center rounded-2xl px-4 tab:px-8"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-1 flex-col border-b-2 border-primary tab:border-b-0 pb-4 tab:pb-0 gap-2 just ">
        <h1 className=" text-[1.1rem] tab:text-[1.3rem] font-semibold desk:text-[1.6rem]">
          {title}
        </h1>
        <span className="font-semibold mb-4">{company}</span>
        <span className="text-[1rem] desk:text-[1.2rem]">
          Location: {location}
        </span>
        <span className="text-[1rem]  desk:text-[1.2rem]">
          Salary: £ {maxsalary}
        </span>
      </div>
      <div className="flex flex-1 text-descp overflow-hidden mt-2 tab:mt-0 text-[0.9rem] tab:text-[1rem] desk:text-[1.2rem] border-t-2 pt-4 tab:pt-0 tab:border-0">
        <p className="overflow-y-scroll">{description}</p>
      </div>
    </motion.div>
  );
};

export default JobCard;
