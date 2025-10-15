import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../hooks/useUsername";

// Mock/Helper Components & Hooks
// =============================================================================
// The following components and hooks are simplified replacements for your
// project's imports (e.g., from lucide-react, @/components, @/hooks).
// This makes the component runnable in this standalone preview environment.

/**
 * Custom Illustration
 * A friendly, monochrome illustration fitting the app's theme.
 */
const WelcomeIllustration = () => (
  <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" className="w-40 h-auto mx-auto mb-4">
    {/* Background bubbles */}
    <circle cx="45" cy="40" r="8" fill="#E0E0E0" opacity="0.5" />
    <circle cx="155" cy="55" r="12" fill="#E0E0E0" opacity="0.5" />
    <circle cx="100" cy="20" r="5" fill="#E0E0E0" opacity="0.5" />

    {/* Character */}
    <g transform="translate(85, 40)">
      <path
        d="M15 40 C 15 55, -15 55, -15 40 S -25 10, 0 10 S 25 10, 15 40 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="2"
      />
      <circle cx="0" cy="22" r="14" fill="#F0F0F0" />
      <path d="M -12 20 a 12 12 0 0 1 24 0" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="-5" cy="20" r="1.5" fill="#000000" />
      <circle cx="5" cy="20" r="1.5" fill="#000000" />
      <path d="M -3 28 Q 0 32, 3 28" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Car front */}
    <g transform="translate(30, 60)">
      <path
        d="M 0 10 C 0 0, 10 0, 20 0 L 60 0 C 70 0, 75 5, 75 15 L 75 40 L 0 40 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="2"
      />
      <path d="M 5 40 V 20 H 25 V 40" fill="none" stroke="#000000" strokeWidth="2" />
      <circle cx="15" cy="10" r="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
      <path d="M 50 10 H 65" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 18 H 65" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

/**
 * Icon: User
 * A simple SVG component to replace the one from lucide-react.
 */
const User = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/**
 * Icon: Car
 * A simple SVG component to replace the one from lucide-react.
 */
const Car = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

/**
 * UI Component: Button
 * A styled button to replace your custom Button component.
 */
const Button = ({ children, className, variant = "default", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-2xl text-base font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border-2 border-gray-200 bg-white text-black hover:bg-gray-100",
  };
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

/**
 * UI Component: Input
 * A styled input to replace your custom Input component.
 */
const Input = ({ className, ...props }) => {
  const baseClasses =
    "flex h-12 w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-2 text-base ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  return <input className={`${baseClasses} ${className}`} {...props} />;
};

/* useUsername: replaced by shared hook from ../hooks/useUsername */

/**
 * Font Loader
 * Injects the "Inter" font into the document's head.
 */
const useFontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
};

// Application Components
// =============================================================================

/**
 * Welcome Component (from your code)
 * This is your original component, adapted to use the mock helpers above
 * and a `Maps` prop for routing.
 */
const Welcome = () => {
  const navigate = useNavigate();
  const { username, saveUsername } = useUsername();
  const [tempUsername, setTempUsername] = useState(username);
  const [showRoleSelection, setShowRoleSelection] = useState(!!username);

  useEffect(() => {
    setTempUsername(username);
    setShowRoleSelection(!!username);
  }, [username]);

  const handleContinue = () => {
    if (tempUsername.trim()) {
      saveUsername(tempUsername.trim());
      setShowRoleSelection(true);
    }
  };

  const handleRoleSelect = (role) => {
    if (role === "rider") {
      navigate("/rider-dashboard");
    } else {
      navigate("/driver-dashboard");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-lg p-8 w-full max-w-md">
        <WelcomeIllustration />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wide text-black mb-2">Welcome</h1>
          <p className="text-gray-500">
            {showRoleSelection ? "Choose your role to get started." : "Pick a username to identify yourself."}
          </p>
          {showRoleSelection && username && (
            <p className="text-sm text-gray-500 mt-2">
              Signed in as <span className="font-semibold text-gray-700">{username}</span>
            </p>
          )}
        </div>

        {!showRoleSelection ? (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="your_username"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && tempUsername.trim() && handleContinue()}
              className="text-center h-14 text-lg"
            />
            <Button onClick={handleContinue} disabled={!tempUsername.trim()} className="w-full h-14 text-lg">
              Continue
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={() => handleRoleSelect("rider")}
              variant="outline"
              className="w-full flex items-center justify-start gap-4 p-6 h-auto text-left"
            >
              <User className="w-8 h-8 text-gray-500" />
              <div>
                <span className="text-lg font-medium">I'm a Rider</span>
                <p className="text-sm text-gray-500">Find a ride to your destination.</p>
              </div>
            </Button>

            <Button
              onClick={() => handleRoleSelect("driver")}
              variant="outline"
              className="w-full flex items-center justify-start gap-4 p-6 h-auto text-left"
            >
              <Car className="w-8 h-8 text-gray-500" />
              <div>
                <span className="text-lg font-medium">I'm a Driver</span>
                <p className="text-sm text-gray-500">Offer a ride and share costs.</p>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
