import React, { useState, useEffect } from "react";
import { LoadingMask } from "./LoadingMask";

let fd = new FormData();

export const Form = (props) => {
  const [response, setResponse] = useState({});
  const [value, setValue] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  let name = props.name;
  const [upload, setUpload] = useState(false);

  function ValidateEmail() {
    if (document.getElementById("email").validity.valid) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  useEffect(() => {
    ValidateEmail();
  }, [value]);

  useEffect(() => {
    if (upload) {
      fetch("/api/hotels/subscribe", {
        method: "POST",
        /* mode: "cors", */
        /*   headers: {
          "Content-Type": "multipart/form-data",
        }, */
        body: JSON.stringify(fd),
      })
        .then((response) => {
          setResponse(response);
          return response.json();
        })
        .then((resp) => {
          if (resp.success) {
            document.getElementById("form").innerHTML = "Subscribed";
          } else {
            document.getElementById("form").innerHTML = "Failed";
          }
        })
        .then(setUpload(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        .then((fd = new FormData()));
    }
  }, [upload]);

  const uploadFunc = () => {
    fd.append("email", value);
    fd.append("hotel", name);
    for (let pair of fd.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    setUpload(true);
    document.getElementById("form").innerHTML = "Loading...";
  };

  /*   useEffect(() => {
    mySubmitFunction();
  }, [data]); */

  return (
    <div>
      <form
        style={{ margin: "1rem auto" }}
        id="form"
        onSubmit={(e) => e.preventDefault()}>
        <h4>Request more info about {props.name}</h4>
        <input
          required
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button disabled={!validEmail} type="submit" onClick={() => uploadFunc()}>
          Submit
        </button>
      </form>
    </div>
  );
};
