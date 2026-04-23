export const redirectByRole = (
  role,
  navigate
) => {

  if (role === "Admin") {

    navigate("/admin");

  } else if (
    role === "Manager"
  ) {

    navigate("/manager");

  } else {

    navigate("/schemes");
  }
};