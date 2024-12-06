import { useEffect, useState } from "react";
import Context from "./Context";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/firebase.init";

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginMailPass = (mail, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, mail, pass);
  };
  const signupMailPass = (mail, pass) => {
    return createUserWithEmailAndPassword(auth, mail, pass);
  };
  const signOutUser = () => {
    setLoading(true)
    setUserData(null)
    return signOut(auth);
  }

  const dataValues = {
    loading,
    userData,
    setUserData,
    loginMailPass,
    signupMailPass,
    signOutUser,
  };

  useEffect(() => {
    const loginCheck = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("currently logged in");
        fetch(`http://localhost:5120/users/${currentUser.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setUserData(data);
          });
        setLoading(false);
      } else {
        setLoading(false);
        console.log("not logged in");
      }
    });

    return () => {
      loginCheck();
    };
  }, []);

  return <Context.Provider value={dataValues}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
