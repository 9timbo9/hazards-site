// src/components/Map/MapView.jsx
import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'

export default function MapView() {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return  // only initialize once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-98.35, 39.5],  // center of US
      zoom: 4
    })
  }, [])

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
}