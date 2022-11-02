import { useContext, useEffect } from 'react';
import { ValidationForm } from '../../utils/validationForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, onChangeProfile }) {
    const { currentUser } = useContext(CurrentUserContext);

    const { values, handleChange, isValid, setValues, errors } = ValidationForm();

    console.log(values);
    
    function handleSubmit(e) {
        e.preventDefault();
        onChangeProfile(values);
    }

    useEffect(() => {
        setValues(currentUser);
    }, [currentUser]);

    return (
        <div className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <p className="profile__welcome">{`Привет, ${currentUser.name}!`}</p>
                <div className={`profile__container ${errors.name ? 'profile__container_error' : ''}`}>
                    <label className="profile__label">Имя</label>
                    <input 
                        className="profile__input"
                        required
                        id="name-profile-input" 
                        name="name" 
                        type="text"
                        minLength="2"
                        maxLength="40"
                        value={values.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <span className="profile__error">{errors.name || ''}</span>
                <div className={`profile__container ${errors.email ? 'profile__container_error' : ''}`}>
                    <label className="profile__label">E-mail</label>
                    <input
                        className="profile__input"
                        required
                        id="email-profile-input" 
                        name="email" 
                        type="email"
                        minLength="2"
                        maxLength="40"
                        value={values.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <span className="profile__error">{errors.email || ''}</span>
                <button 
                    type="submit" 
                    className={
                        !isValid || (values.name === currentUser.name && values.email === currentUser.email)
                            ? 'profile__change-btn register__button_disabled'
                            : 'profile__change-btn'
                    }
                    >Редактировать</button>
                <button type="submit" className="profile__exit-btn" onClick={onSignOut}>Выйти из аккаунта</button>
            </form>
        </div>
    )
} 

export default Profile;