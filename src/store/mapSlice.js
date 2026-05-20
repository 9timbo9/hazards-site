const createMapSlice = (set, get) => ({
    mapView: {
        isOpen: false,
        center: [-98.35, 39.5], //set to u.s
        zoom: 4,
        bounds: null,
        minZoomForFetch: 7,
    },
    openPanel: () => set((state) => ({
        mapView: { ...state.mapView, isOpen: true }
    })),
    closePanel: () => set((state) => ({
        mapView: { ...state.mapView, isOpen: false }
    })),
    setMapView: (center, zoom, bounds) => set((state) => ({
        mapView: {
            ...state.mapView,
            center,
            zoom,
            bounds,
        }
    })),
    getMapView: () => get().mapView,
})

export default createMapSlice
