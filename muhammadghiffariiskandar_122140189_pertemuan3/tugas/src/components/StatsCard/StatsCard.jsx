import PropTypes from 'prop-types'
import './StatsCard.css'

function StatsCard({ title, value, percentage, color }) {
  return (
    <div className="stats-card" style={{ borderTopColor: color }}>
      <h3>{title}</h3>
      <div className="stats-value">{value}</div>
      {percentage !== undefined && (
        <div className="stats-percentage">
          <div 
            className="percentage-bar"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color
            }}
          ></div>
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  )
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  percentage: PropTypes.number,
  color: PropTypes.string.isRequired
}

export default StatsCard