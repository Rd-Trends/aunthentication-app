import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface BtnProps {
  tag?: React.ElementType;
  className?: string;
  id: string;
  label: string;
  [x: string]: any;
}

const Input = React.forwardRef(
  (
    { children, tag, label, className = "", id, ...restProps }: BtnProps,
    ref
  ) => {
    let Tag = tag ? tag : "input";

    return (
      <div>
        <label
          htmlFor={id}
          className="block capitalize text-[#4F4F4F] text-sm font-medium mb-1"
        >
          {label}
        </label>
        <Tag
          {...restProps}
          className={` border border-[#828282] rounded-xl py-4 px-4 text-[#BDBDBD] outline-none ${
            className ? className : ""
          }`}
          ref={ref}
          id={id}
        ></Tag>
      </div>
    );
  }
);

Input.displayName = "Button";

export default Input;
