interface GradientOrbProps {
    color: "yellow" | "orange" | "purple" | "blue";
    size?: number;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    animation?: "float" | "float-slow" | "float-reverse";
    className?: string;
}

export function GradientOrb({
    color,
    size = 400,
    top,
    left,
    right,
    bottom,
    animation = "float",
    className = "",
}: GradientOrbProps) {
    const colorClass = `gradient-${color}`;
    const animationClass = `animate-${animation}`;

    const positionStyles = {
        ...(top && { top }),
        ...(left && { left }),
        ...(right && { right }),
        ...(bottom && { bottom }),
    };

    return (
        <div
            className={`gradient-orb ${colorClass} ${animationClass} ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                ...positionStyles,
            }}
            aria-hidden="true"
        />
    );
}
