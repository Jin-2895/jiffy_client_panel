import React from "react";

export default function Headings(props) {
  return (
    <>
      <h1 className={props.style}>{props.heading}</h1>
    </>
  );
}
