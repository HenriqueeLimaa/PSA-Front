/* eslint-disable react/prop-types */
import { SigninContainer } from "../../components/signin/signinContainer";
import "./signinPage.css";

export const SigninPage = (props) => {
    document.title = 'Refund Dashboard Login'
    return(
        <div className="signin-page-container">
            <SigninContainer onLogin={props.onLogin} />
        </div>
    );
}