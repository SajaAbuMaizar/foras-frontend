"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      containerClassName="mt-4"
      toastOptions={{
        className: "",
        style: {
          marginTop: "4rem",
        },
      }}
    />
  );
};
