import React, { useState } from "react";
/* import Subscription from "./Subscription"; */
import { Form } from "./Subscription";

export const Hotel = (props) => {
  const [show, setShow] = useState(false);
  const [showSub, setShowSub] = useState(false);
  /* const [loading, setLoading] = useState(true); */

  return (
    <div>
      <div style={{ border: "1px solid black", margin: "1rem auto", width: "90%" }}>
        <p>{props.data.name}</p>
        <button onClick={() => setShow(!show)}>{show ? "show less" : "show more"}</button>
        {show && (
          <div>
            <p>
              {props.data.city}: ({props.data.stars}*)
            </p>
            <button onClick={() => setShowSub(!showSub)}>
              Request more info about {props.data.name}
            </button>
            {showSub && <Form name={props.data.name} />}
          </div>
        )}
      </div>
    </div>
  );
};
