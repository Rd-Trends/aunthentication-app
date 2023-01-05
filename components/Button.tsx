import classNames from "classnames";
import React from "react";

interface BtnProps {
  tag?: React.ElementType;
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  color: "primary" | "secondary" | "danger";
  className: string;
  width?: string;
  loading: boolean;
  [x: string]: any;
}

const Button = React.forwardRef(
  (
    {
      children,
      tag,
      color = "primary",
      className = "",
      size = "md",
      loading,
      ...restProps
    }: BtnProps,
    ref
  ) => {
    let Tag = tag ? tag : "button";

    const btnClassName = classNames(
      `flex items-center justify-center outline-none disabled:opacity-70 disabled:cursor-not-allowed rounded-lg ${className}`,
      {
        "bg-[#2F80ED] text-white": color === "primary",
        "bg-transparent border-[#828282]": color === "secondary",
        "py-2 px-4": size === "md",
      }
    );

    return (
      <Tag {...restProps} className={btnClassName} ref={ref}>
        {loading && (
          <>
            <span className=" w-5 h-5 border-4 border-gray-200 border-b-transparent rounded-full animate-spin"></span>
            <span className="pl-4"> Processing...</span>
          </>
        )}
        {!loading && children}
      </Tag>
    );
  }
);

Button.displayName = "Button";

export default Button;
