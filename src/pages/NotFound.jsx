// useNavigate lets us go back
// to the previous page.
import { useNavigate } from 'react-router-dom';


function NotFound() {
  // Create navigate function.
  const navigate = useNavigate();


  return (
    <main className="notFoundPage">

      <div className="notFoundContent">

        <h1>
          404
        </h1>


        <h2>
          Page Not Found
        </h2>


        <p>
          The page you are looking for does not exist.
        </p>


        <button
          className="backButton"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>

      </div>

    </main>
  );
}


export default NotFound;