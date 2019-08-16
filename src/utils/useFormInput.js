import { useState } from "react";

const useFormInput = (init = "") => {
  const [value, setValue] = useState(init);

  function handleChange(e) {
    if (typeof e == "string") setValue(e);
    else setValue(e.target.value);
  }

  function reset() {
    setValue("");
  }

  return {
    value,
    reset,
    onChange: handleChange
  };
};

export default useFormInput;
