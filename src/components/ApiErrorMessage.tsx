import React from "react";

interface ApiErrorMessageProps {
  message?: string;
}

const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({ message }) =>
  message ? <div className="error">{message}</div> : null;

export default ApiErrorMessage;
