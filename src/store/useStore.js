import { create } from 'zustand'

const useStore = create((set) => ({
  markerPosition: null,
  setMarkerPosition: (position) => set({ markerPosition: position }),
}))

export default useStore