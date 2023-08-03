import { useState, useEffect } from "react"

// Define the type for the props passed to the wrapped component
interface WithMousePositionProps {
  // Add any props specific to your wrapped component here
}

// Define the type for the mouse position state
interface MousePosition {
  x: number;
  y: number;
}

// Define the type for the WrappedComponent (component passed to withMousePosition)
type WrappedComponentType = React.ComponentType<WithMousePositionProps & { mousePosition: MousePosition | null }>;

// Define the HOC function with TypeScript types
const withMousePosition = (WrappedComponent: WrappedComponentType) => {
  const WithMousePosition: React.FC<WithMousePositionProps> = (props) => {
    const [mousePosition, setMousePosition] = useState<MousePosition | null>({
      x: 0,
      y: 0
    });

    useEffect(() => {
      const handleMousePositionChange = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      };

      window.addEventListener('mousemove', handleMousePositionChange);

      return () => {
        window.removeEventListener('mousemove', handleMousePositionChange);
      };
    }, []);

    return <WrappedComponent {...props} mousePosition={mousePosition} />;
  };

  return WithMousePosition;
};

// Define the props for PanelMouseLogger
interface PanelMouseLoggerProps extends WithMousePositionProps {
  mousePosition: MousePosition | null;
}

const PanelMouseLogger: React.FC<PanelMouseLoggerProps> = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }
  return (
    <p>
      ({mousePosition.x}, {mousePosition.y})
    </p>
  );
};

// Use the withMousePosition HOC to wrap PanelMouseLogger
const PanelMouseTracker = withMousePosition(PanelMouseLogger);

export default PanelMouseTracker;