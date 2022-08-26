import React from "react";
import { Input } from "./styles";

const CustomInput = (props) => {
  return <Input autoComplete="off" {...props} />;
};

export default CustomInput;
