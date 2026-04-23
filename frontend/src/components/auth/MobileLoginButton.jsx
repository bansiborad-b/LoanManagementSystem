import { IoCallOutline } from "react-icons/io5";

const MobileLoginButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex    
        w-full
        py-3 px-4
        text-sm font-medium text-white
        bg-zinc-900
        border border-zinc-800 rounded-xl
        transition-all
        items-center justify-center gap-3 hover:bg-zinc-800 hover:border-zinc-700 active:scale-[0.98] duration-200
      "
    >
      <IoCallOutline className="
          text-xl
        "/>

      <span>Continue with Mobile</span>
    </button>
  );
};

export default MobileLoginButton;
