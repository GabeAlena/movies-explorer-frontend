function Profile() {
    return (
        <div className="profile">
            <form className="profile__form">
                <p className="profile__welcome"> Привет, Виталий!</p>
                <div className="profile__container">
                    <label className="profile__label">Имя</label>
                    <input 
                        className="profile__input"
                        required
                        placeholder="Имя"
                        id="name-profile-input" 
                        name="name" 
                        type="text"
                        minLength="2"
                        maxLength="40"
                        value="Виталий"
                    />
                </div>
                <div className="profile__container">
                    <label className="profile__label">E-mail</label>
                    <input
                        className="profile__input"
                        required
                        placeholder="email"
                        id="email-profile-input" 
                        name="email" 
                        type="email"
                        minLength="2"
                        maxLength="40"
                        value="pochta@yandex.ru"
                    />
                </div>
                <button type="submit" className="profile__change-btn">Редактировать</button>
                <button type="submit" className="profile__exit-btn">Выйти из аккаунта</button>
            </form>
        </div>
    )
} 

export default Profile;