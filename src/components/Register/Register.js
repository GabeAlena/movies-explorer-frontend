import { Link } from 'react-router-dom';
import registerLogo from '../../images/header_logo.svg';

function Register() {
    return ( 
        <div className="register">
            <img className="register__logo" src={registerLogo} alt="логотип сайта" />
            <h1 className="register__signup">Добро пожаловать!</h1>
            <form className="register__form">
                <label className="register__label">Имя</label>
                <input 
                    className="register__input"
                    required
                    placeholder="name"
                    id="name-register-input" 
                    name="name" 
                    type="text"
                    minLength="2"
                    maxLength="40"
                    value="Виталий"
                />
                <label className="register__label">E-mail</label>
                <input 
                    className="register__input"
                    required
                    placeholder="Email"
                    id="email-register-input" 
                    name="email" 
                    type="email"
                    minLength="2"
                    maxLength="40"
                    value="pochta@yandex.ru"
                />
                <label className="register__label">Пароль</label>
                <input
                    className="register__input"
                    required
                    placeholder="Пароль"
                    id="password-register-input" 
                    name="password" 
                    type="password"
                    minLength="2"
                    maxLength="40"
                    value="12345"
                />
                <span className="register__error">Что-то пошло не так...</span>
                
                <button type="submit" className="register__button">Зарегистрироваться</button>
                <div className="register__in">
                    <p>Уже зарегистрированы?</p>
                    <Link to="/signin" className="register__login-link">Войти</Link>
                </div>
            </form>
        </div>
    )
} 

export default Register;