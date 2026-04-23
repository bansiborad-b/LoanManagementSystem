import { useGoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

import { saveAuth }
from "../utils/authStorage";

import { redirectByRole }
from "../utils/redirectByRole";

const useGoogleAuth = () => {

  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({

    flow: "implicit",

    onSuccess: async (
      tokenResponse
    ) => {

      try {

        const res = await API.post(
          "/auth/google",
          {
            access_token:
              tokenResponse.access_token,
          }
        );

        saveAuth(
          res.data.accessToken,
          res.data.user
        );

        toast.success(
          "Google Login Successful"
        );

        redirectByRole(
          res.data.user.role,
          navigate
        );

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
          "Google Login Failed"
        );
      }
    },

    onError: () => {

      toast.error(
        "Google Login Failed"
      );
    },
  });

  return googleLogin;
};

export default useGoogleAuth;