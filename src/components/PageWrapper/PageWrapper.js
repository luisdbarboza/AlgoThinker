import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import classes from "./PageWrapper.module.scss";

const Content = ({ children }) => (
  <div className={classes["page-content"]}>{children}</div>
);

const AdminPageWrapper = ({ children }) => {
  return (
    <div className={classes["page-wrapper"]}>
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
};

export default AdminPageWrapper;
