import React from "react";
import { toast } from "react-toastify";

const ToastifyMsg = ({ isOpen, status, message }) => {
  return (
    <>
      {isOpen &&
        (status == "success"
          ? toast.success(message, {
              position: toast.POSITION.TOP_RIGHT,
            })
          : toast.error(message, {
              position: toast.POSITION.TOP_RIGHT,
            }))}
    </>
  );
};

export default ToastifyMsg;
