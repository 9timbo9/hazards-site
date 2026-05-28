//overall risk index
import '../../styles/HazardPanel.css';

export default function RiskBar({ riskLevel }) {
    return (
        <div className="risk-bar" style={{ '--final-p': riskLevel }}>
                {riskLevel}
        </div> 
    )
}