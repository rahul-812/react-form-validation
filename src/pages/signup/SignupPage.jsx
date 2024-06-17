import './SignupPage.css';
import { ReactComponent as RedStar} from '../../vectors/star_red.svg';
import { ReactComponent as BlueStar} from '../../vectors/star_blue.svg';
import { ReactComponent as TopSemiCircle} from '../../vectors/top_semicircle.svg';
import Form from './Form';

/**
 * The component for the signup page.
 * This component is responsible for rendering the signup popup and the form.
 * The form component is passed as a child to this component.
 * The signup popup component contains the image container, stars, and the semi-circle.
 * This component is exported as the default export of the SignupPage.jsx file.
 */
export default function SignUpPopupComponent() {
  return (
    <main id='signup-page'>
      <div id="signup-popup">
          {/* Image container for the image displaying a person riding a bike */}
          <div id="image-container"></div>
          {/* Red star icon */}
          <RedStar id='red-star'/>
          {/* Blue star icon */}
          <BlueStar id='blue-star'/>
          {/* Semi-circle icon */}
          <TopSemiCircle id='semicircle'/>
          {/* The form component */}
          <Form />
      </div>
    </main>
  );
}

