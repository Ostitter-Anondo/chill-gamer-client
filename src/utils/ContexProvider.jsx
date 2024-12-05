import { useState } from "react";
import Context from "./Context";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const ContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const loginMailPass = (mail, pass) => {
    toast.success(`${mail} attempted login using ${pass}`);
  }
  const signupMailPass = (mail, pass) => {
    toast(`${mail} attempted signup using ${pass}`,
      {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
  }

  const dataValues = {
    currentUser, setCurrentUser,
    loginMailPass, signupMailPass,
  };
  return <Context.Provider value={dataValues}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
