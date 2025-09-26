import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, TicketPlus } from "lucide-react";
import { assets } from "../assets/assets";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleBookingsClick = () => {
    navigate("/bookings");
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/movies", label: "Movies" },
    { path: "/theaters", label: "Theaters" },
    { path: "/releases", label: "Releases" },
    { path: "/favourite", label: "Favourites" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-16 lg:px-36 py-4 bg-black text-white relative">
      {/* Logo */}
      <Link to="/" onClick={closeMobileMenu}>
        <img src={assets.logo} alt="QuickShow Logo" className="h-10" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 bg-neutral-900 px-4 py-2 rounded-full text-sm">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className="hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search Button */}
        <button 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-white" />
        </button>

        {/* Desktop Login/UserButton */}
        <div className="hidden sm:block">
          {!user ? (
            <SignInButton>
              <button className="bg-primary hover:bg-primary-dull text-white px-5 py-2 rounded-full shadow-md transition font-medium">
                Login
              </button>
            </SignInButton>
          ) : (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverActionButton: "flex items-center gap-2",
                }
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus className="w-4 h-4" />}
                  onClick={handleBookingsClick}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
        </div>

        {/* Mobile Burger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 right-6 left-6 bg-neutral-900 rounded-xl shadow-lg p-6 md:hidden animate-slideDown z-50">
          <ul className="flex flex-col gap-4 text-lg">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  onClick={closeMobileMenu}
                  className="block py-2 hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
            {/* Mobile Login/User Section */}
            <li className="pt-4 border-t border-neutral-700">
              {!user ? (
                <SignInButton>
                  <button
                    onClick={closeMobileMenu}
                    className="w-full bg-primary hover:bg-primary-dull text-white px-5 py-3 rounded-full shadow-md transition font-medium"
                  >
                    Login
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center justify-center">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonPopoverActionButton: "flex items-center gap-2",
                      }
                    }}
                  >
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="My Bookings"
                        labelIcon={<TicketPlus className="w-4 h-4" />}
                        onClick={handleBookingsClick}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;