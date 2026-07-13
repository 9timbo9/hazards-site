// RiskBar.jsx
import '../../styles/HazardPanel.css';

export default function RiskBar({ riskLevel }) {
    return (
        <div
            className="risk-bar"
            style={{ '--final-p': riskLevel }}
            data-score={`Risk score: ${riskLevel == -1 ? '0' : Math.round(riskLevel)}`}
        >
        </div>
    );
}