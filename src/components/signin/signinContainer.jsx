/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./signinContainer.css";
import axios from 'axios';

export const SigninContainer = (props) => {
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.emailInput.value;
    const password = event.target.elements.passwordInput.value;

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      // Armazene o token JWT no localStorage ou em um estado do React
      localStorage.setItem('token', token);
      
      props.onLogin(); // Chame a função onLogin passada como prop para atualizar o estado de autenticação
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };
  
  return (
    <div className="signin-container">
      <p className="signin-title">Sign in</p>
      <form type="submit">
        <div className="input-container">
          <label htmlFor="emailInput">Email</label>
          <input id="emailInput" type="text" />
        </div>
        <div className="input-container">
          <label htmlFor="passwordInput">Password</label>
          <input id="passwordInput" type="password" />
        </div>
        <button className="signin-button" type="submit" onClick={props.onLogin}>
          Sign in
        </button>
      </form>
    </div>
  );
};
