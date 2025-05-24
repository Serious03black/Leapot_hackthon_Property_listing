import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  useScrollTrigger,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const NavBar = () => {
  return (
    <ElevationScroll>
      <AppBar color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
              Voice
            </Box>
            <Box component="span" sx={{ fontWeight: 500 }}>
              Listings
            </Box>
          </Typography>
          <Button 
            component={Link} 
            to="/create-listing" 
            variant="contained" 
            color="primary" 
            startIcon={<MicIcon />}
            size="small"
          >
            New Listing
          </Button>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default NavBar;