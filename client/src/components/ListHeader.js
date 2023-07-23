import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.ts";
import logoImg from '../assets/LOGO.png';
import Modal from "./Modal";
import Profile from "./Profile"; 
import { useAuth } from "../hooks/useAuth.ts";
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Menu, MenuItem } from '@mui/material';


function ListHeader({ fetchTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // New state variable
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);


  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleProfileOpen = () => {
    setIsProfileModalOpen(true);
    setAnchorEl(null);  
  };

  const handleProfileClose = () => {
    setIsProfileModalOpen(false); 
  };
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); 
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null); 
  };


  return (
    <div className="list-header">
      <div className="col-12 d-flex justify-content-between align-item-center">
        <div>
          <FilterListIcon/>
        </div>
        <div>
          <img className="logoImg" src={logoImg} alt="Login img" />
        </div>
        <div className="user-btn">
          <PersonPinIcon onClick={handleMenuOpen} />
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        
        </div>
      </div>

      <div className="col-12 d-flex justify-content-between align-items-center">
        <h3 className="fw-bold">Your Tasks</h3>
        <div className="button-container">
          <button className="add" onClick={() => setIsModalOpen(true)}>Add New task</button>
          {/* <button className="logout" onClick={() => handleLogout()}>Logout</button> */}
        </div>
      </div>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} mode={"create"} fetchTasks={fetchTasks} />}
      {isProfileModalOpen && (
        <Profile setIsProfileModalOpen={handleProfileClose} mode={"custom"}>
        </Profile>
      )}
    </div>
  );
}

export default ListHeader;
