import React from "react";

type Props = {
  text: string;
  title?: string;
};

export default function PlaceholderText({ text, title }: Props) {
  return (
    <div className="sticky">
      {title != null && <h3 className="placeholder-title">{title}</h3>}
      <h4 className="placeholder-text">{text}</h4>
    </div>
  );
}
