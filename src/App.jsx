import { useState } from 'react';
import { PanelRightOpen, PanelRightClose, TriangleAlert } from 'lucide-react'
import MapView from './components/Map/MapView'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false) // set it true and keep it true when you set a spot on the map

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
          onClick={() => setIsOpen(!isOpen)}
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