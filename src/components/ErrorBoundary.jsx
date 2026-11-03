// ==================================================
// REACT
// ==================================================

import {
  Component
} from 'react';


// ==================================================
// ERROR BOUNDARY
// ==================================================

class ErrorBoundary extends Component {

  // If there is no error,
  // show the normal application.

  state = {
    hasError: false
  };


  // ==================================================
  // CATCH RENDER ERROR
  // ==================================================

  /*
    React calls this automatically
    when a child component crashes.

    We change hasError to true
    so the fallback UI is shown.
  */

  static getDerivedStateFromError() {

    return {
      hasError: true
    };

  }


  // ==================================================
  // RENDER
  // ==================================================

  render() {

    // If something crashed,
    // show a friendly message.

    if (this.state.hasError) {

      return (

        <main className="errorPage">

          <h1>
            Something went wrong
          </h1>

          <p>
            The application could not be displayed.
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
          >
            Reload page
          </button>

        </main>

      );

    }


    // No error:
    // show the normal app.

    return this.props.children;

  }

}


export default ErrorBoundary;