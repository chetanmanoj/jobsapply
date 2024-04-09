import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col desk:flex-row border-t-2 border-slate-300 gap-4 desk:gap-0 px-12 py-8">
      <div className="flex flex-1 ">
        <span>© 2024 JobsApply</span>
      </div>
      <div className="flex tab:flex-row flex-wrap flex-col  tab:gap-x-12 gap-2">
        <button className="text-left">About</button>
        <button className="text-left">Accessibility</button>
        <button className="text-left">Help Center</button>
        <button className="text-left">Privacy Policy</button>
        <button className="text-left">Advertising</button>
        <button className="text-left">Ad Choices</button>
      </div>
    </div>
  );
};

export default Footer;
