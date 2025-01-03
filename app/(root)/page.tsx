"use client";

import LangflowComponent from "@/components/LangflowComponent";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const Home  = () =>  {
  const words = [
    {
      text: "Get",
      className: "text-white",
    },
    {
      text: "detailed",
      className: "text-white",
    },
    {
      text: "insights",
      className: "text-white",
    },
    {
      text: "of",
      className: "text-white",
    },
    {
      text: "social media.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex mt-60 flex-col items-center justify-center h-[40rem] bg-gray-900 h-screen  ">
      <p className="text-slate-300 dark:text-slate-200 text-xs sm:text-base  ">
        The real analysis starts here.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex w-full flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <LangflowComponent/>
      </div>
    </div>
  );
}


export default Home;