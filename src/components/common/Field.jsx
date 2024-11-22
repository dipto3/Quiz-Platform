import React from "react";

export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildId(children);
  function getChildId(children) {
    const child = React.Children.only(children);
    if ("id" in child?.props) {
      return child.props.id;
    }
  }
  return (
    <>
      <div>
        <label htmlFor={id}>{label}</label>
        {children}
        {!!error && (
          <div role="alert" className="text-red-500">
            {error.message}
          </div>
        )}
      </div>
    </>
  );
}
