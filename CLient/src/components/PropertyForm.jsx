// src/components/PropertyForm.jsx
import React from 'react';
import { TextField, Grid, Typography, Chip, Stack, InputAdornment } from '@mui/material';

const PropertyForm = ({ data, setData, missingFields }) => {
  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} md={6}>
        <TextField
          label="Property Type"
          value={data.type}
          onChange={(e) => handleChange('type', e.target.value)}
          fullWidth
          error={missingFields.includes('type')}
          helperText={missingFields.includes('type') && 'Required field'}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          label="Price"
          type="number"
          value={data.price}
          onChange={(e) => handleChange('price', parseFloat(e.target.value))}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={missingFields.includes('price')}
          helperText={missingFields.includes('price') && 'Required field'}
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          label="Bedrooms"
          type="number"
          value={data.bedrooms}
          onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))}
          fullWidth
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          label="Bathrooms"
          type="number"
          value={data.bathrooms}
          onChange={(e) => handleChange('bathrooms', parseInt(e.target.value))}
          fullWidth
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          label="Area (sq ft)"
          type="number"
          value={data.area}
          onChange={(e) => handleChange('area', parseFloat(e.target.value))}
          fullWidth
        />
      </Grid>
      
      {data.features.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>Features:</Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {data.features.map((feature, index) => (
              <Chip key={index} label={feature} />
            ))}
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default PropertyForm;