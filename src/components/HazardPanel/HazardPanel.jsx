import useStore from '../../store/useStore'
import '../../styles/HazardPanel.css'
import { TriangleAlert } from 'lucide-react'
import HazardCard from './HazardCard.jsx'
// import RiskBar from './RiskBar.jsx'


export default function HazardPanel() {
    const { center } = useStore((s) => s.mapView)
    // const isOpen = useStore((s) => s.mapView.isOpen)
    const [lng, lat] = center ? center : [0, 0]
    const latDir = lat >= 0 ? 'N' : 'S'
    const lngDir = lng >= 0 ? 'E' : 'W'
    const hazards = [
        { type: 'earthquake', riskLevel: '4.2' },
        { type: 'flood', riskLevel: '30' },
        { type: 'volcano', riskLevel: '60' },
    ]



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
                {center ? hazards.map((hazard, index) => (
                    <HazardCard 
                        key={index}
                        hazardName={hazard.type}
                        riskLevel={hazard.riskLevel}
                        delay={index*200} />
                )) : null}
                {/* style={{ animationDelay: `${index * 100}ms` }}  for map*/}

                {center ? <TriangleAlert size={16} className="hazard-loader" /> : null}
            </div>
        </div>

    )
}
