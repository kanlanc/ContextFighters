import "./polyfills";
import "./index.css";
import "@animxyz/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { ThorinGlobalStyles, darkTheme, lightTheme } from "@ensdomains/thorin";
import ClientProvider from "./contexts/ClientContext.tsx";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { findConversation } from "./model/conversations";
import ConversationViewWithLoader from "./views/ConversationViewWithLoader.tsx";
import NewConversationView from "./views/NewConversationView.tsx";
import Homepage from "./views/Homepage.jsx";
import WalletConnect from "./views/WalletConnect.jsx";
import SocialConnect from "./views/SocialConnect.jsx";
import WalletContext from "./contexts/WalletContext.tsx";
import SelfIntroduction from "./views/SelfIntroduction.jsx";
import CuratedMeet from "./views/CuratedMeet.jsx";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import UserProfile from "./views/UserProfile.tsx";

async function conversationLoader({ params }: any) {
  const conversation = await findConversation(params.conversationTopic);
  return { conversation };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "messages",
        element: <App />,
      },
      {
        path: "c/:conversationTopic",
        element: <ConversationViewWithLoader />,
        loader: conversationLoader,
      },
      {
        path: "new",
        element: <NewConversationView />,
      },
      {
        path: "walletconnect",
        element: <WalletConnect />,
      },
      {
        path: "selfintroduction",
        element: <SelfIntroduction />,
      },
      {
        path: "curatedmeet",
        element: <CuratedMeet />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <ClientProvider>
        <WalletContext>
          <RouterProvider router={router} />
        </WalletContext>
      </ClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
