//individual hazard card component for hazard panel
import '../../styles/HazardPanel.css'
import RiskBar from './RiskBar.jsx'
import { TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'


export default function HazardCard({ hazardName, riskLevel, details, delay }) {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, delay)
        return () => clearTimeout(timer);

    }, [delay]);


    return (
        isVisible ?
            <div className="hazard-card">
                <div className="hazard-card-left">
                    <h3>{hazardName}</h3>
                    <p className="tiny-text">{details}</p>
                </div>
                {riskLevel == null ? <TriangleAlert size={16} className="hazard-loader" /> : <RiskBar riskLevel={riskLevel} /> }
                </div>
                : null
    )
}