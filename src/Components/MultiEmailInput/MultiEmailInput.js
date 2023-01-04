import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./MultiEmailInput.css";

const MultiEmailInput = ({emailList, setEmailList}) => {
  
  const [value, setvalue] = useState("");
  const [error, seterror] = useState(null);
  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var newValue = value.trim();

      if (newValue && isValid(newValue)) {
        setEmailList([...emailList, newValue]);
        setvalue("");
      }
    }
  };
  const handleChange = (evt) => {
    setvalue(evt.target.value);
    seterror(null);
  };
  console.log(value);
  const handleDelete = (item) => {
    setEmailList(emailList.filter((i) => i !== item));
  };
  const handlePaste = (evt) => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter((email) => !isInemailList(email));
      setEmailList([...this.emailList, ...toBeAdded]);
    }
  };
  const isValid = (email) => {
    let error = null;

    // if (isInemailList(email)) {
    //   error = `${email} has already been added.`;
    // }

    // if (!isEmail(email)) {
    //   error = `${email} is not a valid email address.`;
    // }

    // if (error) {
    //   seterror({ error });
    //   return false;
    // }

    return true;
  };
  const isInemailList = (email) => {
    return emailList.includes(email);
  };

  const isEmail = (email) => {
    // return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    return true;
  };

  return (
    <>
      {emailList.map((item) => (
        <div className="tag-item" key={item}>
          {item}
          <button
            type="button"
            className="button"
            onClick={() => handleDelete(item)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        className={"input " + (error && " has-error")}
        value={value}
        placeholder="Add Attendies Email and press `Enter`..."
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onPaste={handlePaste}
      />

      {error && <p className="error">{error}</p>}
    </>
  );
};

export default MultiEmailInput;
