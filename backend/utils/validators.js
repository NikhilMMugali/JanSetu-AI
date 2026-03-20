/**
 * Validation Utilities
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateImageBase64 = (imageBase64) => {
  return typeof imageBase64 === 'string' && imageBase64.length > 0;
};

export const validateCoordinates = (lat, lng) => {
  return typeof lat === 'number' && typeof lng === 'number' && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

export const validateUsername = (username) => {
  return typeof username === 'string' && username.length >= 3 && username.length <= 20;
};
