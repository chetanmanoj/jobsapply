const JobCard = ({ id, title, company, location, description }) => {
  return (
    <div className="flex flex-row bg-slate-200 w-9/12 h-36 items-center rounded-2xl px-8">

      <h1>{title}</h1>
      <div className="flex flex-col">
      {company}
      {location}
      </div>

      <p>{description}</p>
    </div>
  );
};

export default JobCard;
