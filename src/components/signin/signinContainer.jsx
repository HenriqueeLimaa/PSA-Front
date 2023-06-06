import './signinContainer.css';

export const SigninContainer = () => {
    return(
        <div className="signin-container">
            <p className='signin-title'>Sign in</p>
            <form type='submit'>
                <div className='input-container'>
                    <label htmlFor="emailInput">Email</label>
                    <input id="emailInput" type="email" className />
                </div>
                <div className='input-container'>
                    <label htmlFor="passwordInput">Password</label>
                    <input id="passwordInput" type="password" />
                </div>
                <button className='signin-button' type='submit'>Sign in</button>
            </form>
        </div>
    );
}