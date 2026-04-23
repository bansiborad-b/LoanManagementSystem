const OTPInput = ({
  name,
  value,
  onChange,
}) => {

  const handleChange = (e) => {

    const onlyNums = e.target.value.replace(/\D/g, "");

    if (onlyNums.length <= 6) {

      onChange({
        target: {
          name,
          value: onlyNums,
        },
      });
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={handleChange}
      placeholder="000000"
      className="
        w-full
        px-4
        py-3
        bg-zinc-900
        border
        border-zinc-700
        rounded-xl
        text-white
        text-center
        text-2xl
        tracking-[10px]
        outline-none
        focus:ring-2
        focus:ring-white
      "
    />
  );
};

export default OTPInput;