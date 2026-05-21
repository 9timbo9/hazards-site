import useStore from '../../store/useStore'
import '../../styles/HazardPanel.css'
import {TriangleAlert } from 'lucide-react'


export default function HazardPanel() {
    const { center } = useStore((s) => s.mapView)
    const [lng, lat] = center
    const latDir = lat >= 0 ? 'N' : 'S'
    const lngDir = lng >= 0 ? 'E' : 'W'



    return (
        <div className='hazard-panel-container'>
            <div className="lat-long">
                <h2>Selected Location</h2>
                <hr></hr>
                <div className="entry">
                    <span className="label">Latitude:</span>
                    <span className="value">{Math.abs(lat).toFixed(4)}° {latDir}</span>
                </div>
                <div className="entry">
                    <span className="label">Longitude:</span>
                    <span className="value">{Math.abs(lng).toFixed(4)}° {lngDir}</span>
                </div>
                <div className="entry">
                    <p className="tiny-text">{lat.toFixed(8)}</p>
                    <p className="tiny-text">{lng.toFixed(8)}</p>
                </div>
            </div>
            <hr></hr>
            <div className='hazard-cards'>
                <h2>Hazard Information</h2>

                <TriangleAlert size={16} className="hazard-loader" />
            </div>
        </div>

    )
}
