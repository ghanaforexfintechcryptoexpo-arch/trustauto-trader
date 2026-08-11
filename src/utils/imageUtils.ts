import React from 'react';

export const DEFAULT_VEHICLE_IMAGE = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80';

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = DEFAULT_VEHICLE_IMAGE;
};
