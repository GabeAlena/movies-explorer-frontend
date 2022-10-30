import { Link } from 'react-router-dom';
import { ValidationForm } from '../../utils/validationForm';
import loginLogo from '../../images/header_logo.svg';

function Login({ onLogin }) {
    const { values, handleChange, errors, isValid } = ValidationForm();

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(values);
    }

    return (
        <div className="login">
            <Link to="/" className="login__logo">
                <img src={loginLogo} alt="логотип сайта" />
            </Link>
            <h1 className="login__signin">Рады видеть!</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__label">E-mail</label>
                <input 
                    className={`login__input ${errors.email ? 'login__input_error' : ''}`}
                    required
                    id="email-login-input" 
                    name="email" 
                    type="email"
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    value={values.email || ''}                    
                />
                <span className="login__error">{errors.email || ''}</span>                
                <label className="login__label">Пароль</label>
                <input
                    className={`login__input ${errors.password ? 'login__input_error' : ''}`}
                    required
                    id="password-login-input" 
                    name="password" 
                    type="password"
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    value={values.password || ''} 
                />
                <span className="login__error">{errors.password || ''}</span>                
                
                <button type="submit" className={`login__button ${!isValid ? 'login__button_disabled' : ''}`}>Войти</button>
                <div className="register__in">
                    <p>Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="login__register-link">Регистрация</Link>
                </div>
            </form>
        </div>
    )
} 

export default Login;