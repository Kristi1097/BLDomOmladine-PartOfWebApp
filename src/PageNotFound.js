import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            
              <p>Page not found</p>
              <p>
              <Link to="/">Кликни овдје за пријаву!</Link>
              </p>
     
        </>
    );
};

export default PageNotFound;