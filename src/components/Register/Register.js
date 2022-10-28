import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ValidationForm } from '../../utils/validationForm';
import registerLogo from '../../images/header_logo.svg';

function Register({ onRegister }) {
    const { values, handleChange, errors, isValid, resetForm } = ValidationForm();

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(values);
        //onRegister(values.name, values.email, values.password);
    }

    return ( 
        <div className="register">
            <Link to="/" className="register__logo">
                <img src={registerLogo} alt="логотип сайта" />
            </Link>
            <h1 className="register__signup">Добро пожаловать!</h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__label">Имя</label>
                <input 
                    className={`register__input ${errors.name ? 'register__input_error' : ''}`}
                    required
                    placeholder=""
                    id="name-register-input" 
                    name="name" 
                    type="text"
                    minLength="2"
                    maxLength="40"
                    value={values.name || ''}
                    onChange={handleChange}
                />
                <span className="register__error">{errors.name || ''}</span>
                <label className="register__label">E-mail</label>
                <input 
                    className={`register__input ${errors.email ? 'register__input_error' : ''}`}
                    required
                    placeholder=""
                    id="email-register-input" 
                    name="email" 
                    type="email"
                    minLength="2"
                    maxLength="40"
                    value={values.email || ''}
                    onChange={handleChange}
                />
                <span className="register__error">{errors.email || ''}</span>
                <label className="register__label">Пароль</label>
                <input
                    className={`register__input ${errors.password ? 'register__input_error' : ''}`}
                    required
                    placeholder=""
                    id="password-register-input" 
                    name="password" 
                    type="password"
                    minLength="2"
                    maxLength="40"
                    value={values.password || ''}
                    onChange={handleChange}
                />
                <span className="register__error">{errors.password || ''}</span>
                
                <button type="submit" className={`register__button ${!isValid ? 'register__button_disabled' : ''}`}>Зарегистрироваться</button>
                <div className="register__in">
                    <p>Уже зарегистрированы?</p>
                    <Link to="/signin" className="register__login-link">Войти</Link>
                </div>
            </form>
        </div>
    )
} 

export default Register;