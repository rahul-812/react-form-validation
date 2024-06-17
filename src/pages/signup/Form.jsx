import './Form.css';

import { ReactComponent as GoogleIcon } from '../../icons/google.svg';
import { ReactComponent as AppleIcon } from '../../icons/apple.svg';
import { ReactComponent as FacebookIcon } from '../../icons/facebook.svg';
import { ReactComponent as XIcon } from '../../icons/x.svg';
import { useContext, useEffect, useState } from 'react';
import { ClientDataContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { GrFormView, GrFormViewHide } from "react-icons/gr";

/**
 * Component for rendering the signup form.
 * It includes two forms: the first signup form and the additional form.
 * The first form is displayed by default and the user can click the "Next" button to display the additional form.
 */
export default function Form() {
    // State to keep track of whether the first form is shown or not
    const [activeAuthForm, setActiveAuthForm] = useState(true);

    /**
     * Function called when the "Next" button is clicked in the first form.
     * It sets the state to hide the first form and display the additional form.
     */
    function onNextButtonClick(e) {
        setActiveAuthForm(false);
    }

    return (
        <form className="form">
            {/* Title of the form */}
            <h1 className="form-title">Sign Up</h1>
            {/* Render the first form if it is shown, otherwise render the additional form */}
            {activeAuthForm === true
                ? <FirstForm onNext={onNextButtonClick} />
                : <AdditionalForm/>}
        </form>
    );
}

function hasEmtpyString(obj) {
    return Object.values(obj).some((value) => value === '');
}

/**
 * Component for rendering the first signup form.
 */
function FirstForm({ onNext }) {
    // State to store user authentication data
    const [authdata, setAuthdata] = useState({ username: '', email: '', password: '' });
    // State to store error messages for invalid fields
    const [errors, setErrors] = useState({});
    // State to disable the submit button if form fields are empty
    const [disabled, setDisabled] = useState(true);
    // Context object to store client data
    const clientData = useContext(ClientDataContext);
    // Boolean state for obscure password field or not
    const [obscurePassword, setObscurePassword] = useState(true);

    function validate() {
        // validating fields
        const err = {
            uname: authdata.username.match(/^[a-zA-Z]{3}[^s@-_.]{1,17}$/) ? '' : 'Username must start with atleast 3 alphabets but less than 20 characters',
            email: authdata.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? '' : 'Invalid email format (must be like user@example.com)',
            pass: authdata.password.length > 15
                ? 'Password must be less than 16 characters': authdata.password.length < 6? 'Password must be more than 6 characters': ''
        };

        return Object.values(err).every(value => !value) ? null : err;
    }

    function onChange(e) {
        setAuthdata({ ...authdata, [e.target.id]: e.target.value });
    }

    useEffect(() => {
        const hasEmptyField = hasEmtpyString(authdata);

        if (disabled && !hasEmptyField) {
            setDisabled(false);
        } else if (!disabled && hasEmptyField) {
            setDisabled(true);
        }
    }, [authdata]);

    return (
        <div className="first-form">

            <div className="form-input">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder='johndoe45' value={authdata.username} onChange={onChange} />
                {errors.uname && <p className="error-msg">{errors.uname}</p>}
            </div>

            <div className="form-input">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder='johndoe45@gmail.com' value={authdata.email} onChange={onChange} />
                {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>

            <div className="form-input">
                <label htmlFor="password">Password</label>
                <input type={obscurePassword ? "password" : "text"} id="password" value={authdata.password} onChange={onChange} />
                <div id="trailing-icon" onClick={() => setObscurePassword(!obscurePassword)}>
                    {obscurePassword ? <GrFormView /> : <GrFormViewHide />}
                </div>
                {errors.pass && <p className="error-msg">{errors.pass}</p>}
            </div>

            {/* Other signup method icons */}
            <span id='or-divider' >Or signup with</span>
            <div id="other-methods">
                <OtherAuthMethod><GoogleIcon /></OtherAuthMethod>
                <OtherAuthMethod><FacebookIcon /></OtherAuthMethod>
                <OtherAuthMethod><AppleIcon /></OtherAuthMethod>
                <OtherAuthMethod><XIcon /></OtherAuthMethod>
            </div>

            <button className={`form-button ${disabled ? 'disabled' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    const err = validate();
                    if (err == null) {
                        authdata.email = authdata.email.toLowerCase();
                        // adding information to main data object.
                        clientData.authData = authdata;
                        // go to next form
                        onNext();
                    } else {
                        setErrors(err);
                    }
                }}
                disabled={disabled}>Next</button>
        </div>
    );
}

// List of cities to display in the city dropdown
    const cities = ["Kolkata", "Durgapur", "Mumbai", "Chennai", "Bengaluru", "Delhi", "Pune", "Hyderabad", "Kochi", "Chandigarh", "Jaipur", "Noida"];

/**
 * Component for rendering the additional form after the first signup form.
 */
function AdditionalForm() {
    // State to store user data
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        phone: '+91 ',
        country: 'India',
        city: cities[0],
        pan: '',
        aadhar: '',
    });
    // State to store error messages for invalid fields
    const [errors, setErrors] = useState({});
    // State to disable the submit button if form fields are empty
    const [disabled, setDisabled] = useState(true);
    // Context object to store client data
    const clientData = useContext(ClientDataContext);
    // Navigate function to navigate to different pages
    const navigate = useNavigate();

    /**
     * Function to handle changes in form fields.
     */
    function onChange(e) {
        // Spread the existing userData state into a new object
        // and update the specific property with the new value
        setUserData({ 
            ...userData, 
            [e.target.id]: e.target.value 
        });
    }
    
    useEffect(() => {
        const hasEmptyField = hasEmtpyString(userData);

        if (disabled && !hasEmptyField) {
            setDisabled(false);
        } else if (!disabled && hasEmptyField) {
            setDisabled(true);
        }
    }, [userData]);

    function validate() {
        // Object to store error messages for invalid fields
        const err = {
            fname: userData.firstname.match(/^[a-zA-Z]+$/) ? '' : 'Only alphabets are allowed', // Check if first name contains only alphabets
            lname: userData.lastname.match(/^[a-zA-Z]+$/) ? '' : 'Only alphabets are allowed', // Check if last name contains only alphabets
            phone: userData.phone.match(/^[+]?[(]?[0-9]{0,2}[)]?[-\s.]?[0-9]{5}[-\s.]?[0-9]{5,7}$/) ? '' : 'Please enter a valid phone number', // Check if phone number is valid
            pan: userData.pan.match(/^[A-Za-z]{3}[ACFHPTacfhpt]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}$/) ? '' : 'Please enter a valid PAN number', // Check if PAN number is valid
            aadhar: userData.aadhar.match(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/) ? '' : 'Please enter a valid Aadhar number' // Check if Aadhar number is valid
        };

        // Check if all fields are valid, return null if they are, otherwise return the error object
        return Object.values(err).every((value) => value === '') ? null : err;
    }

    function handleSignup(e) {
        e.preventDefault();

        // Validate form fields
        const err = validate();

        // If there are no validation errors, proceed with the registration process
        if (err == null) {
            // Prompt user for confirmation
            const confirmed = window.confirm('Do you want to proceed with the registration?');

            // If user confirms, format user data and update main data object
            if (confirmed) {
                // Format first name
                let name = userData.firstname;
                userData.firstname = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

                // Format last name
                name = userData.lastname;
                userData.lastname = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

                // Format PAN number
                userData.pan = userData.pan.toUpperCase();

                // Update main data object
                clientData.userData = userData;

                // Navigate to home page
                navigate('/home', { state: clientData });
            }
        } else {
            // If there are validation errors, display error messages
            setErrors(err);
        }
    }

    return (
        <div className="additional-form">

            {/* Render first name input field */}
            <div id="first-name" className="form-input">
                <label htmlFor="firstname">Frist Name</label>
                <input type="text" id="firstname" placeholder='John' value={userData.firstname} onChange={onChange} />
                {errors.fname && <p className="error-msg">{errors.fname}</p>}
            </div>

            {/* Render last name input field */}
            <div id="last-name" className="form-input">
                <label htmlFor="lastname">Last name</label>
                <input type="text" id="lastname" placeholder='Doe' value={userData.lastname} onChange={onChange} />
                {errors.lname && <p className="error-msg">{errors.lname}</p>}
            </div>

            {/* Render phone number input field */}
            <div className="form-input">
                <label htmlFor="phone">Phone number</label>
                <input type="text" id="phone" value={userData.phone} onChange={onChange} />
                {errors.phone && <p className="error-msg">{errors.phone}</p>}
            </div>

            {/* Render country dropdown */}
            <div className="form-input">
                <label htmlFor="country">Country</label>
                <select id="country" value={userData.country} onChange={onChange}>
                    <option>India</option>
                </select>
            </div>

            {/* Render city dropdown */}
            <div className="form-input">
                <label htmlFor="city">City</label>
                <select id="city" value={userData.city} onChange={onChange}>
                    {cities.map((city) => <option key={city}>{city}</option>)}
                </select>
            </div>

            {/* Render PAN number input field */}
            <div id="pan-number" className="form-input">
                <label htmlFor="pan">PAN number</label>
                <input type="text" id="pan" value={userData.pan} onChange={onChange} />
                {errors.pan && <p className="error-msg">{errors.pan}</p>}
            </div>

            {/* Render Aadhar number input field */}
            <div id="aadhar-number" className="form-input">
                <label htmlFor="aadhar">Aadhar number</label>
                <input type="text" id="aadhar" value={userData.aadhar} onChange={onChange} />
                {errors.aadhar && <p className="error-msg">{errors.aadhar}</p>}
            </div>

            {/* Render the signup button */}
            <button
                id='signup-btn'
                type='submit'
                className={`form-button ${disabled ? 'disabled' : ''}`}
                disabled={disabled}
                onClick={handleSignup}>Create account</button>
        </div>
    );
}

/**
 * Component for rendering other authentication methods.
 */
function OtherAuthMethod({ children }) {
    // Render the child components inside an icon container.
    return (
        <div className="icon-container">
            {/* Render the child components */}
            {children}
        </div>
    );
}
