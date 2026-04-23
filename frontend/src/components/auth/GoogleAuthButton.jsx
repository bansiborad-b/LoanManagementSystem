import { FcGoogle } from "react-icons/fc";

import useGoogleAuth from "../../hooks/useGoogleAuth";

const GoogleAuthButton = () => {
  const googleLogin = useGoogleAuth();

  return (
    <button
      type="button"
      onClick={() => googleLogin()}
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
      {/* Google Icon */}
      <FcGoogle
        className="
          text-xl
        "
      />

      {/* Text */}
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleAuthButton;
