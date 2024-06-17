import { useLocation } from "react-router-dom";

/**
 * HomePage component is the main component for the home page.
 * It renders the user registration data provided by the signup form.
 */
export default function HomePage() {
    // Get the location object from react-router-dom which contains the state
    // object which contains the user registration data.
    let {state} = useLocation();

    return (
        // The main container for the home page.
        <main>
            {/* Title of the page */}
            <h1>User Registration Data</h1>
            {/* Display the user registration data in a preformatted text block. */}
            <p style={{color: '#6a6aff', fontSize: '20px'}}>
                {/* The preformatted text block displays the user registration data. */}
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </p>
        </main>
    );
}
