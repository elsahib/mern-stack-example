import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import { EventForm, PerformerForm, MovementForm } from "./components/EventManRC"
import { EventList, PerformerList, MovementList } from "./components/EventManList"
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/events", element: <App />, children: [
      {
        path: "/events",
        element: <EventList />,
      },
    ],
  },
  {
    path: "/events/create", element: <App />, children: [
      {
        path: "/events/create",
        element: <EventForm />,
      }
    ]
  },
  {
    path: "/events/edit/:id", element: <App />, children: [
      {
        path: "/events/edit/:id",
        element: <EventForm />
      }
    ]
  },
  {
    path: "/performers", element: <App />, children: [
      {
        path: "/performers",
        element: <PerformerList />,
      }
    ]
  },
  {
    path: "/performers/create", element: <App />, children: [
      {
        path: "/performers/create",
        element: <PerformerForm />,
      }
    ]
  },
  {
    path: "/performers/edit/:id", element: <App />, children: [
      {
        path: "/performers/edit/:id", element: <PerformerForm />
      }
    ]
  },
  {
    path: "/movements", element: <App />, children: [
      {
        path: "/movements", element: <MovementList />
      }
    ]
  },
  {
    path: "/movements/create", element: <App />, children: [
      { path: "/movements/create", element: <MovementForm /> }
    ]
  },
  {
    path: "/movements/edit/:id", element: <App />, children: [
      { path: "/movements/edit/:id", element: <MovementForm /> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
