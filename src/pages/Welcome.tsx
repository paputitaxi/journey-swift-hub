import React, { useState, createContext, useContext } from "react";
import { User, Car } from "lucide-react";

// --- Start of Fixes ---

// Minimalist styling for the components
const componentStyles = `
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    font-weight: 600;
    transition: background-color 0.2s;
    padding: 1rem 1.5rem;
    width: 100%;
    font-size: 1rem;
    gap: 0.75rem;
  }
  .btn-primary {
    background-color: #000;
    color: #fff;
  }
  .btn-primary:hover {
    background-color: #333;
  }
  .btn-primary:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .btn-outline {
    background-color: transparent;
    border: 1px solid #e5e7eb;
    color: #000;
  }
  .btn-outline:hover {
    background-color: #f3f4f6;
  }
  .input-field {
    width: 100%;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 1.5rem;
    text-align: center;
    font-size: 1rem;
    background-color: #fff;
  }
  .input-field:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 0 0 2px #00000033;
  }
`;

// 1. Re-implementing UI components locally
const Button = ({ onClick, disabled, className, children, variant }) => {
  const styleClass = variant === "outline" ? "btn btn-outline" : "btn btn-primary";
  return (
    <button onClick={onClick} disabled={disabled} className={`${styleClass} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-field ${className}`}
    />
  );
};

// 2. Re-implementing custom hooks locally
const useUsername = () => {
  const [username, setUsername] = useState(() => {
    try {
      const item = window.localStorage.getItem("username");
      return item ? JSON.parse(item) : "";
    } catch (error) {
      console.error(error);
      return "";
    }
  });

  const saveUsername = (name) => {
    try {
      window.localStorage.setItem("username", JSON.stringify(name));
      setUsername(name);
    } catch (error) {
      console.error(error);
    }
  };

  return { username, saveUsername };
};

const useLanguage = () => {
  const t = (key) => key; // Mock translation function
  return { t };
};

// --- End of Fixes ---

const Welcome = () => {
  const { username, saveUsername } = useUsername();
  const { t } = useLanguage();
  const [tempUsername, setTempUsername] = useState(username);
  const [showRoleSelection, setShowRoleSelection] = useState(!!username);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (tempUsername.trim()) {
      saveUsername(tempUsername.trim());
      setShowRoleSelection(true);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  // Display a confirmation screen after role selection
  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <style>{componentStyles}</style>
        <div className="bg-white backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-black mb-2">Welcome, {username}!</h1>
          <p className="text-gray-600">
            You have selected the <span className="font-bold">{selectedRole}</span> role.
          </p>
          <p className="text-gray-500 mt-4">
            In a full application, you would be redirected to the {selectedRole} dashboard.
          </p>
          <Button onClick={() => setSelectedRole(null)} className="mt-6">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <style>{componentStyles}</style>
      <div className="bg-white backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Welcome</h1>
          <p className="text-gray-600">
            {showRoleSelection
              ? "Choose your role to get started. Find rides or offer a spot in your car."
              : "Pick a unique username to identify you in rides."}
          </p>
          {showRoleSelection && username && <p className="text-sm text-gray-500 mt-2">Signed in as {username}</p>}
        </div>

        {!showRoleSelection ? (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="your_username"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
            />
            <Button onClick={handleContinue} disabled={!tempUsername.trim()}>
              Continue
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button onClick={() => handleRoleSelect("rider")} variant="outline">
              <User className="w-6 h-6" />
              <span>I'm a Rider</span>
            </Button>

            <Button onClick={() => handleRoleSelect("driver")} variant="outline">
              <Car className="w-6 h-6" />
              <span>I'm a Driver</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
