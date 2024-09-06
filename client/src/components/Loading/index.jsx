import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="h-screen flex items-center gap-3 flex-col justify-center">
      <div>
        <BarLoader color="#3FA2F6" width={180} height={3} />
      </div>
      <div>
        <h1 className="text-xl text-[#3FA2F6]">Loading . . .</h1>
      </div>
    </div>
  );
}
