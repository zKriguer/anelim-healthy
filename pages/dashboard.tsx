import React, { useState } from "react";
import Header from "../components/Header";
import RenderIf from "../components/RenderIf";
import MealForm from "../components/MealForm";

function dashboard() {
  return (
    <>
      <Header />
      <RenderIf condition={true}>
        <MealForm />
      </RenderIf>
    </>
  );
}

export default dashboard;
