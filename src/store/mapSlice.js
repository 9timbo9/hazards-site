const createMapSlice = (set, get) => ({
    mapView: {
        isOpen: false,
        center: null,
        zoom: 4,
        bounds: null,
        minZoomForFetch: 7,
        // selectedLocation: null,
    },
    openPanel: () => set((state) => ({
        mapView: { ...state.mapView, isOpen: true }
    })),
    closePanel: () => set((state) => ({
        mapView: { ...state.mapView, isOpen: false }
    })),
    setCenter: (lng, lat) => set((state) => ({
        mapView: {
            ...state.mapView,
            center: [lng, lat],
            // selectedLocation: [lng, lat]
        }
    })),
    setMapView: ( zoom, bounds) => set((state) => ({
        mapView: {
            ...state.mapView,
            zoom,
            bounds,
            // selectedLocation: state.mapView.selectedLocation
        }
    })),
    getMapView: () => get().mapView,
})

export default createMapSlice
