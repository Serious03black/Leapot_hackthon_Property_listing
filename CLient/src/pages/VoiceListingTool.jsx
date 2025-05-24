import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Container, Typography, Button, Card, CardContent, Box, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import PhotoUpload from '../components/PhotoUpload';
import PropertyForm from '../components/PropertyForm';
import { useNavigate } from 'react-router-dom';
import { processVoiceInput } from '../utils/nlpProcessor';

const VoiceListingTool = () => {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
    type: '',
    location: { address: '', city: '', state: '', zip: '' },
    price: 0,
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    description: '',
    features: [],
    images: []
  });
  const [missingFields, setMissingFields] = useState([]);
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const navigate = useNavigate();

  useEffect(() => {
    if (transcript && transcript.length > 0) {
      const processedData = processVoiceInput(transcript);
      setPropertyData(prev => ({ ...prev, ...processedData.propertyData }));
      setMissingFields(processedData.missingFields || []);
    }
  }, [transcript]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData)
      });
      const data = await response.json();
      navigate('/preview', { state: { listing: data } });
    } catch (error) {
      console.error('Error submitting listing:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Voice Property Listing Tool
          </Typography>

          {step === 1 && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" paragraph>
                {isListening ? 'Speak now...' : 'Click the microphone and describe the property'}
              </Typography>
              
              <Button
                variant="contained"
                color={isListening ? 'secondary' : 'primary'}
                startIcon={isListening ? <CircularProgress size={24} color="inherit" /> : <MicIcon />}
                onClick={isListening ? stopListening : startListening}
                sx={{ mb: 3 }}
              >
                {isListening ? 'Stop Recording' : 'Start Recording'}
              </Button>

              {transcript && (
                <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2">{transcript}</Typography>
                </Box>
              )}

              <PropertyForm 
                data={propertyData} 
                setData={setPropertyData} 
                missingFields={missingFields}
              />

              <Button
                variant="contained"
                onClick={() => setStep(2)}
                disabled={!propertyData.type || !propertyData.price}
                sx={{ mt: 2 }}
              >
                Next: Add Photos
              </Button>
            </Box>
          )}

          {step === 2 && (
            <PhotoUpload 
              images={propertyData.images}
              setImages={(images) => setPropertyData({ ...propertyData, images })}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default VoiceListingTool;