// import { useState } from 'react';
import { PanelRightOpen, PanelRightClose, TriangleAlert } from 'lucide-react'
import MapView from './components/Map/MapView'
import './App.css'
import useStore from './store/useStore'

function App() {
  // const [isOpen, setIsOpen] = useState(false) // set it true and keep it true when you set a spot on the map
  const isOpen = useStore((s) => s.mapView.isOpen)
  const openPanel = useStore((s) => s.openPanel)
  const closePanel = useStore((s) => s.closePanel)


  return (
    <div className="app">
      <header className="app-header">
        <TriangleAlert size={20} />
        <h1 style={{ marginLeft: '8px' }}>Geologic Hazards Explorer</h1>
      </header>
      <div className='app-body'>
        <div className='map-container'>
          <MapView />

        </div>
        <button
          className={`toggle-btn ${isOpen ? '' : 'closed'}`}
          onClick={() => isOpen ? closePanel() : openPanel()}
        >
          {isOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}

        </button>
        <div className={isOpen ? "sidebar" : "sidebar closed"}>
          <div className='hazard-panel'></div>
        </div>

      </div>
    </div>
  )
}

export default App
