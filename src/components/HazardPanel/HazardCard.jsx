//individual hazard card component for hazard panel

export const HazardCard = ({ hazardType, description }) => {
    return (
        <div className="hazard-card">
            <h3>{hazardType}</h3>
            <p>{description}</p>
        </div>
    )
}