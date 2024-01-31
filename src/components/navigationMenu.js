import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import AuthContext from './userContex'; // Assuming you have an AuthContext

const NavigationMenu = () => {
  const { isLogined, logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Call your logout function or perform logout actions
    logout();
  };

  return (
    <Menu>
      <Menu.Menu position='right'>
        {isLogined ? (
          <>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to='/'>Login</Menu.Item>
        )}
        <Menu.Item as={Link} to='/itemInventory'>View Items</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavigationMenu;