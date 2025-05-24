import React, { useState } from 'react';
import { Button, Box, Typography, Grid, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PhotoUpload = ({ images, setImages, onBack, onSubmit }) => {
  const [previewImages, setPreviewImages] = useState(images);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...previewImages];
    newImages.splice(index, 1);
    setPreviewImages(newImages);
  };

  const handleSubmit = () => {
    setImages(previewImages);
    onSubmit();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Upload Property Photos
      </Typography>
      
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 3 }}
      >
        Upload Photos
        <VisuallyHiddenInput 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </Button>
      
      <Grid container spacing={2}>
        {previewImages.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ position: 'relative', paddingTop: '100%' }}>
              <img
                src={img}
                alt={`Property ${index + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Listing
        </Button>
      </Box>
    </Box>
  );
};

export default PhotoUpload;