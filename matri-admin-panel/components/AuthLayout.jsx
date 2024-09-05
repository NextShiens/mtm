// components/MainLayout.js
import React from "react";
import { Toaster } from "react-hot-toast";

const AuthLayout = ({ children }) => (
  <div>
    <main>{children}</main>
  </div>
);

export default AuthLayout;
