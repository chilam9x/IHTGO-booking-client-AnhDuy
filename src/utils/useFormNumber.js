import { useState } from "react";

const useFormNumber = (init = "") => {
  const [value, setValue] = useState(init);

  function handleChange(e) {
    if (typeof e == "string") {
      if (!/[a-z]/.test(e.toLowerCase())) setValue(e);
    } else {
      if (!/[a-z]/.test(e.target.value.toLowerCase())) setValue(e.target.value);
    }
  }

  return {
    value,
    setValue,
    onChange: handleChange
  };
};

export default useFormNumber;
