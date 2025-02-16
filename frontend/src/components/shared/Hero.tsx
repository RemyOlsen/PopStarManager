// useLocation is a hook that returns the location object that represents the current URL.
import { useLocation } from 'react-router-dom';

function Hero() {
    const location = useLocation();

    let imagePath;
    let backgroundPosition = "bg-center bg-cover";
    let textStyle = "text center text 8xl";
    let textColor = "text-purple-500";

    switch (location.pathname) {
        case "/":
            imagePath = "/images/hero_popstar.jpg";
            break;
        case "/admin":
            imagePath = "/images/hero_admin.jpg";
            break;
        default:
            imagePath = "/images/not-found.jpg";
            backgroundPosition = "bg-center bg-cover";
            textStyle = "text-center text-8xl";
            textColor = "text-red-500";
    }

    return (
    <div
        className={`${textStyle} ${textColor} h-96 ${backgroundPosition} `}
        style={{ backgroundImage: `url(${imagePath})` }}
    >
      {LocationTextOverlay()}
    </div>
    )
}


function LocationTextOverlay() {
    const location = useLocation();

    switch (location.pathname) {
        case "/":
            return "Pop Star Page";
        case "/admin":
            return "Admin Page";
        default:
            return "Not Found";
    }
}

export default Hero;