import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.ts";
import { useUser } from "../hooks/useUser.ts";
import { withRouter } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Profile({ history, setIsProfileModalOpen }) {
  const { user, setUser } = useContext(AuthContext);
  const { addUser } = useUser();
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  

  useEffect(() => {
    // Set the component state with user data when it's available
    if (user) {
      setName(user.name || "");
      setDateOfBirth(user.dateOfBirth || "");
    }
  }, [user]);

  const handleUpdateProfile = () => {
    const updatedUser = { ...user, name, dateOfBirth };
    addUser(updatedUser);
    setUser(updatedUser);

    if (!name || !dateOfBirth) {
      setErrorMessage("Name and Date of Birth cannot be empty.");
      setSuccess("");
      return;
    }else{
      setSuccess("User Data has been Stored");
      setErrorMessage("");
    }
    
  };

  const handleBack = () => {
    setIsProfileModalOpen(false); // Close the profile modal
  };

  return (
    <div className="overlay">
      <div className="modal">
      <div className="profile-container">
      <div className="modal-header">
      <h2>Profile Page</h2>
      <XMarkIcon className="cross-icon" onClick={handleBack} />
      </div>
      
      <form>
        <div className="mt-4">
          <label className="col-4">Name:</label>
          <input className="col-8"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="col-4">Date of Birth:</label>
          <input className="col-8"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className="border-bottom col-12 pb-4">
        <button className="submit w-100" type="button" onClick={handleUpdateProfile}>
          Save Profile
        </button>
        </div>
        {success && <p className="success">{success}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>

      </div>
    </div>
    
    
  );
}

export default withRouter(Profile);
