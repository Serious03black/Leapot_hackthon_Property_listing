// src/components/NavBar.jsx
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

function NavBar() {
  const location = useLocation();
  
  return (
    <nav>
      <Button 
        component={Link} 
        to="/"
      >
        Home
      </Button>
      <Button 
        component={Link} 
        to="/create-listing"
      >
        Create Listing
      </Button>
    </nav>
  );
}

export default NavBar;