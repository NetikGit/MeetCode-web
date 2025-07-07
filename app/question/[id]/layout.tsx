import { Children } from "react";
import CodeEditor from "@/app/components/CodeEditor";

export default function QuestionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return(
<div>
<div className=" flex min-h-screen pt-8 bg-stone-800">
      <div className="w-1/2 h-screen overflow-y-scroll pt-4 bg-stone-900 border border-6 border-stone-700 ">
      {children}
      </div>
      <div className="w-1/2 h-screen bg-stone-900 border border-6 border-stone-700 ">
      <div className="text-xl pl-4 text-stone-300 font-semibold bg-stone-700 mb-4 "> Code</div>
      <div className="">
      <CodeEditor />
      </div>
      </div>
</div>     
</div>
    )
}