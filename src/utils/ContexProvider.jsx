import Context from "./Context";
import PropTypes from "prop-types";

const ContextProvider = ({ children }) => {
  const dataValues = {};
  return <Context.Provider value={dataValues}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
