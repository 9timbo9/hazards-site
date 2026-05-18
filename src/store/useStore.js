import { create } from 'zustand'
import createMapSlice from './mapSlice'
const useStore = create((set, get) => ({
  ...createMapSlice(set, get),
}))

export default useStore