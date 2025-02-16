import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
      <footer className="bg-music-black text-white text-center p-4 mt-8">
        <div className="container mx-auto">
          <p className="text-lg font-semibold">Pop Star Manager</p>
          <p className="text-sm">A place to explore and manage your favorite pop stars</p>
  
          <div className="mt-2">
            <a
              href="http://localhost:5282/documentation.html"
              className="text-music-green hover:underline"
            >
              View API Documentation
            </a>
          </div>
  
          <div className="mt-2">
            <p className="text-gray-400 text-sm">
                <FontAwesomeIcon className="text-music-green" icon={faMusic} />
                &nbsp; Keep the music alive! &nbsp;
                <FontAwesomeIcon className="text-music-green" icon={faMusic} />
                 </p>
                 <p className="text-sm mt-2">
                    Candidate Number: 7
                 </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  