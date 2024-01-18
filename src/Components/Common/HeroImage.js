import React from "react";

export default function HeroImage(props) {
  return (
    <div className="img-responsive">
      <img
        className={props.heroImage}
        src={props.image}
        alt="Grocery Shop design are put here"
      />
    </div>
  );
}
