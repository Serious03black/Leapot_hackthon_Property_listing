import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PreviewIcon from '@mui/icons-material/Preview';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <MicIcon fontSize="large" color="primary" />,
      title: "Voice Input",
      description: "Describe properties naturally using voice commands"
    },
    {
      icon: <PhotoCameraIcon fontSize="large" color="primary" />,
      title: "Photo Integration",
      description: "Automatically attach property photos from your device"
    },
    {
      icon: <PreviewIcon fontSize="large" color="primary" />,
      title: "Instant Preview",
      description: "Review your listing before submission"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
        borderRadius: 2,
        color: 'white',
        mb: 6
      }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Voice-Driven Property Listing
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
          Transform phone conversations into perfect listings instantly
        </Typography>
        <Button 
          component={Link} 
          to="/create-listing" 
          variant="contained" 
          color="secondary" 
          size="large"
          startIcon={<MicIcon />}
          sx={{ 
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600
          }}
        >
          Start New Listing
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" align="center" sx={{ mb: 4, fontWeight: 600 }}>
        How It Works
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: theme.shadows[6]
              }
            }}>
              <CardContent sx={{ 
                flexGrow: 1,
                textAlign: 'center',
                py: 4
              }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box sx={{ 
        textAlign: 'center',
        p: 4,
        backgroundColor: theme.palette.grey[100],
        borderRadius: 2
      }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Ready to revolutionize your workflow?
        </Typography>
        <Button 
          component={Link} 
          to="/create-listing" 
          variant="contained" 
          color="primary" 
          size={isMobile ? 'medium' : 'large'}
          startIcon={<MicIcon />}
          sx={{ mt: 2 }}
        >
          Try It Now
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;