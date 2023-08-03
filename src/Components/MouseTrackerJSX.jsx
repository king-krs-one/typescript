import { useState, useEffect } from "react"

const withMousePosition = (WrappedComponent) => {
  return (props) => {
    const [mousePosition, setMousePosition] = useState({
      x: 0,
      y: 0
    })
    useEffect(() => {
      const handleMousePositionChange = (e) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        })
      }
      window.addEventListener("mousemove", handleMousePositionChange)

      return () => {
        window.removeEventListener("mousemove", handleMousePositionChange)
      }
    }, [])

    return <WrappedComponent {...props} mousePosition={mousePosition} />
  }
}

const PanelMouseLogger = ({ mousePosition }) => {
  if (!mousePosition) {
    return null
  }
  return (
    <p>
      ({mousePosition.x}, {mousePosition.y})
    </p>
  )
}

// Use the withMousePosition HOC to wrap PanelMouseLogger
const PanelMouseTracker = withMousePosition(PanelMouseLogger);

export default PanelMouseTracker
