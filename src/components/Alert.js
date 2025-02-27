import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Alert = (props) => {
  const { alert } = props;

  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  useEffect(() => {
    if (alert) {
      Swal.fire({
        icon: alert.type === "danger" ? "error" : alert.type,
        title: capitalize(alert.type),
        text: alert.msg,
        timer: 3000,
        showConfirmButton: false,
        willClose: () => {
          props.clearAlert && props.clearAlert();
        },
      });
    }
  }, [alert, props]); // Trigger when the alert prop changes

  return <></>;
};

export default Alert;
