import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import { EventForm, PerformerForm, MovementForm, DriverForm, VehicleForm, HotelForm } from "./components/EventManRC"
import { EventList, PerformerList, MovementList, DriverList, VehicleList, HotelList } from "./components/EventManList"
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/create", element: <App />, children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/edit/:id", element: <App />, children: [
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

  {
    path: "/drivers", element: <App />, children: [
      {
        path: "/drivers", element: <DriverList />
      }
    ]
  },
  {
    path: "/drivers/create", element: <App />, children: [
      { path: "/drivers/create", element: <DriverForm /> }
    ]
  },
  {
    path: "/drivers/edit/:id", element: <App />, children: [
      { path: "/drivers/edit/:id", element: <DriverForm /> }
    ]
  },
  {
    path: "/vehicles", element: <App />, children: [
      {
        path: "/vehicles",
        element: <VehicleList />
      }
    ]
  },
  {
    path: "/vehicles/create", element: <App />, children: [
      { path: "/vehicles/create", element: <VehicleForm /> }
    ]
  },
  {
    path: "/vehicles/edit/:id", element: <App />, children: [
      { path: "/vehicles/edit/:id", element: <VehicleForm /> }
    ]
  },
  {
    path: "/hotels", element: <App />, children: [
      {
        path: "/hotels",
        element: <HotelList />
      }
    ]
  },
  {
    path: "/hotels/create", element: <App />, children: [
      { path: "/hotels/create", element: <HotelForm /> }
    ]
  },
  {
    path: "/hotels/edit/:id", element: <App />, children: [
      { path: "/hotels/edit/:id", element: <HotelForm /> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
