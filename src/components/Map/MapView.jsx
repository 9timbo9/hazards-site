// src/components/Map/MapView.jsx
import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import useStore from '../../store/useStore'

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
      useStore.getState().openPanel()       // just opens the sidebar

      const { lng, lat } = e.lngLat

      useStore.getState().setCenter(lng, lat)  //storing state
      console.log('Clicked at:', lng, lat)

      markerRef.current = new maplibregl.Marker({ color: 'red', draggable: true })
        .setLngLat([lng, lat])
        .addTo(map.current)
      markerRef.current.on('dragend', () => {
        const { lng, lat } = markerRef.current.getLngLat()
        useStore.getState().setCenter(lng, lat) //storing state
        console.log('Marker dragged to:', lng, lat)
        map.current.flyTo({
          center: [lng, lat],
          zoom: 8,
          essential: true
        })
      })
      map.current.flyTo({
        center: [lng, lat],
        zoom: 8,
        essential: true
      })

    })
    map.current.on('load', () => {
      const zoom = map.current.getZoom()
      const bounds = map.current.getBounds()

      useStore.getState().setMapView(
        zoom,
        bounds.toArray()
      )
    })

    map.current.on('moveend', () => {
      const center = map.current.getCenter()
      const zoom = map.current.getZoom()
      const bounds = map.current.getBounds()

      console.log('Map settled at:', center, 'zoom:', zoom, 'bounds:', bounds)

      useStore.getState().setMapView(
        zoom,
        bounds.toArray())

    })

  }, []) 

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
}

