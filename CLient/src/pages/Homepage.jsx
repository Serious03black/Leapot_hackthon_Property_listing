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
import ImageIcon from '@mui/icons-material/Image';
import PreviewIcon from '@mui/icons-material/Preview';
import WaveBackground from '../components/WaveBackground';

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
      icon: <ImageIcon fontSize="large" color="primary" />,
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
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <WaveBackground />
      
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative' }}>
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          mb: 8,
          borderRadius: 4,
          position: 'relative',
          zIndex: 1
        }}>
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              color: theme.palette.primary.dark,
              mb: 2
            }}
          >
            Transform Conversations into Listings
          </Typography>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            component="h2" 
            sx={{ 
              mb: 4,
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            The fastest way to create property listings using just your voice
          </Typography>
          <Button 
            component={Link} 
            to="/create-listing" 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<MicIcon />}
            sx={{ 
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 50,
              boxShadow: theme.shadows[4],
              '&:hover': {
                boxShadow: theme.shadows[8]
              }
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ 
          backgroundColor: 'background.paper',
          borderRadius: 4,
          p: 4,
          boxShadow: theme.shadows[2],
          mb: 8
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 6, 
              fontWeight: 700,
              color: theme.palette.primary.main
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: 'none',
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <CardContent sx={{ 
                    flexGrow: 1,
                    textAlign: 'center',
                    px: 0,
                    py: 0
                  }}>
                    <Box sx={{ 
                      mb: 3,
                      display: 'inline-flex',
                      p: 2,
                      backgroundColor: theme.palette.primary.light,
                      borderRadius: '50%',
                      color: 'white'
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        color: theme.palette.text.primary
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        maxWidth: '300px',
                        mx: 'auto'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ 
          textAlign: 'center',
          p: 6,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 4,
          color: 'white'
        }}>
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            component="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              mb: 3
            }}
          >
            Ready to revolutionize your workflow?
          </Typography>
          <Button 
            component={Link} 
            to="/create-listing" 
            variant="contained" 
            color="secondary" 
            size={isMobile ? 'medium' : 'large'}
            startIcon={<MicIcon />}
            sx={{ 
              mt: 2,
              px: 6,
              borderRadius: 50,
              fontWeight: 600,
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}
          >
            Try It Now - It's Free
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;