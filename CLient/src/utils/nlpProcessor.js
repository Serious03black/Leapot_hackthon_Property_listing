// src/utils/nlpProcessor.js
export const processVoiceInput = (text) => {
  const result = {
    propertyData: {},
    missingFields: []
  };

  // Convert to lowercase for easier matching
  const lowerText = text.toLowerCase();

  // Extract property type
  const typeMatch = lowerText.match(/(apartment|flat|condo|house|villa|townhouse)/);
  if (typeMatch) {
    result.propertyData.type = typeMatch[0].charAt(0).toUpperCase() + typeMatch[0].slice(1);
  } else {
    result.missingFields.push('type');
  }

  // Extract price (handles different formats: $1000, 1000 dollars, etc.)
  const priceMatch = text.match(/(\$\s?\d+(?:,\d{3})*(?:\.\d{2})?|\d+\s?(dollars|dollar|usd))/i);
  if (priceMatch) {
    result.propertyData.price = parseFloat(priceMatch[0].replace(/[^\d.]/g, ''));
  } else {
    result.missingFields.push('price');
  }

  // Extract bedrooms
  const bedroomMatch = lowerText.match(/(\d+)\s?(bedroom|bed|br|beds)/);
  if (bedroomMatch) {
    result.propertyData.bedrooms = parseInt(bedroomMatch[1]);
  } else {
    // Default to 1 if not specified but required
    result.propertyData.bedrooms = 1;
  }

  // Extract bathrooms
  const bathroomMatch = lowerText.match(/(\d+)\s?(bathroom|bath|ba|baths)/);
  if (bathroomMatch) {
    result.propertyData.bathrooms = parseInt(bathroomMatch[1]);
  }

  // Extract area (sq ft)
  const areaMatch = text.match(/(\d+)\s?(sq\s?ft|square\s?feet|sq\.?ft\.?)/i);
  if (areaMatch) {
    result.propertyData.area = parseInt(areaMatch[1]);
  }

  // Extract features (furniture, amenities)
  const features = [];
  if (lowerText.includes('furniture') || lowerText.includes('furnished')) {
    features.push('Furnished');
  }
  if (lowerText.includes('parking') || lowerText.includes('garage')) {
    features.push('Parking');
  }
  if (lowerText.includes('balcony') || lowerText.includes('terrace')) {
    features.push('Balcony');
  }
  result.propertyData.features = features;

  // Use full description
  result.propertyData.description = text;

  return result;
};