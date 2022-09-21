import { Link } from 'react-router-dom';
import loginLogo from '../../images/header_logo.svg';

function Login() {
    return (
        <div className="login">
            <img className="login__logo" src={loginLogo} alt="логотип сайта" />
            <h1 className="login__signin">Рады видеть!</h1>
            <form className="login__form">
                <label className="login__label">E-mail</label>
                <input 
                    className="login__input"
                    required
                    id="email-login-input" 
                    name="email" 
                    type="email"
                    minLength="2"
                    maxLength="40"
                />
                <label className="login__label">Пароль</label>
                <input
                    className="login__input"
                    required
                    id="password-login-input" 
                    name="password" 
                    type="password"
                    minLength="2"
                    maxLength="40"
                />
                
                <button type="submit" className="login__button">Войти</button>
                <div className="register__in">
                    <p>Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="login__register-link">Регистрация</Link>
                </div>
            </form>
        </div>
    )
} 

export default Login;