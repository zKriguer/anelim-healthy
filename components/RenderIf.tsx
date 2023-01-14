import React from "react";

type Props = { children: React.ReactNode; condition: boolean | undefined };

function RenderIf({ children, condition }: Props) {
  if (condition) return <div>{children}</div>;
  else return <></>;
}

export default RenderIf;
