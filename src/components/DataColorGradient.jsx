export const DataColorGradient = ({id = 'line-gradient'}) => {
    return <linearGradient id={id} x1="0%" y1="100%" x2="0%" y2="0%" gradientUnits={'userSpaceOnUse'}>
        {/* Beige/Brown (Negative Values) */}
        <stop offset="7%" style={{ stopColor: '#b35806', stopOpacity: 1 }} />

        {/* Light Beige (Negative Values) */}
        <stop offset="35%" style={{ stopColor: '#e08214', stopOpacity: 1 }} />

        {/* Neutral Gray (Zero Values) */}
        <stop offset="50%" style={{ stopColor: '#a0a0a0', stopOpacity: 1 }} />

        {/* Light Blue (Positive Values) */}
        <stop offset="65%" style={{ stopColor: '#4575b4', stopOpacity: 1 }} />

        {/* Matching Blue (Positive Values) */}
        <stop offset="93%" style={{ stopColor: '#313695', stopOpacity: 1 }} />

    </linearGradient>
}

export const RedGreyBlue = ({id}) => (
    <linearGradient id={id} x1="0%" y1="100%" x2="0%" y2="0%" gradientUnits={'userSpaceOnUse'}>
        {/* Red (Negative Values) */}
        <stop offset="7%" style={{ stopColor: '#d73027', stopOpacity: 1 }} />

        {/* Light Red (Negative Values) */}
        <stop offset="40%" style={{ stopColor: '#f46d43', stopOpacity: 1 }} />

        {/* Middle Gray (Zero Values) */}
        <stop offset="50%" style={{ stopColor: '#777777', stopOpacity: 1 }} />

        {/* Light Blue (Positive Values) */}
        <stop offset="60%" style={{ stopColor: '#66a3d2', stopOpacity: 1 }} />

        {/* Blue (Positive Values) */}
        <stop offset="93%" style={{ stopColor: '#4575b4', stopOpacity: 1 }} />
    </linearGradient>
)