import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GroupsPage from "@/components/pages/GroupsPage";
import React from "react";
import ConversationsPage from "@/components/pages/ConversationsPage";
import ChatPage from "@/components/pages/ChatPage";
import Layout from "@/components/organisms/Layout";
function App() {
  return (
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light" />
  );
}

export default App;