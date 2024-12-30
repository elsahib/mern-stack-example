import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Transportation SVG" className="h-10 inline" src="https://www.svgrepo.com/show/476881/ground-transportation.svg"></img>
        </NavLink>

        <NavLink to="/events">Events</NavLink>
        <NavLink to="/performers">Performers</NavLink>
        <NavLink to="/movements">Transportation</NavLink>

      </nav>
    </div>
  );
}
