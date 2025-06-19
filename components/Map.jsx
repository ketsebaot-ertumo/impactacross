"use client";

import React from 'react'

export default function Map() {
  return (
    <div className="w-full h-80">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: '0' }}
        src="https://www.google.com/maps/embed/v1/place?q=Roadmap+Building+Lem+Hotel+Bole+Sub+city+Addis+Ababa+Ethiopia&key=YOUR_GOOGLE_MAPS_API_KEY"
        allowFullScreen
      ></iframe>

      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: '0', marginTop: '20px' }}
        src="https://www.google.com/maps/embed/v1/place?q=9+Vintage+47+Falcon+Street+D&apos;Urbanvalle+Cape+Town+South+Africa&key=YOUR_GOOGLE_MAPS_API_KEY"
        allowFullScreen
      ></iframe>
    </div>
  )
}
