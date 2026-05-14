// src/components/Map/MapView.jsx
import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function MapView() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (map.current) return  // only initialize once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-98.35, 39.5],  // center of US
      zoom: 4,

    })
    map.current.on('click', (e) => {
      if (markerRef.current) {
        markerRef.current.remove()
      }
      const { lng, lat } = e.lngLat
      console.log('Clicked at:', lng, lat)

      markerRef.current = new maplibregl.Marker({ color: 'red', draggable: true })
        .setLngLat([lng, lat])
        .addTo(map.current)
      markerRef.current.on('dragend', () => {
        const { lng, lat } = markerRef.current.getLngLat()
        console.log('Marker dragged to:', lng, lat)
      })
    })
  }, [])

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
}
