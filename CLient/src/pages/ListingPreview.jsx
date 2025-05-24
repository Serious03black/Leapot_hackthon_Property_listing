import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button, Box, Chip } from '@mui/material';
import { format } from 'date-fns';

const ListingPreview = () => {
  const { state } = useLocation();
  const listing = state?.listing;

  if (!listing) {
    return (
      <Container>
        <Typography variant="h6">No listing data found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Listing Preview
          </Typography>
          
          <Typography variant="h6">{listing.type}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {listing.location.address}, {listing.location.city}, {listing.location.state}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="h5">${listing.price.toLocaleString()}</Typography>
            <Typography>{listing.area} sq ft</Typography>
          </Box>
          
          <Box sx={{ my: 2 }}>
            <Typography variant="body1">{listing.description}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {listing.features.map((feature, index) => (
              <Chip key={index} label={feature} />
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained" color="primary">
              Submit to MLS
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ListingPreview;