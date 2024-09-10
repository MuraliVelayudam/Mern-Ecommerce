import { MoonLoader } from "react-spinners";

export default function FormLoader() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden h-[60svh] bg-white">
      <MoonLoader />
    </div>
  );
}
