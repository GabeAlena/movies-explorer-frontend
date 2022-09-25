import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found">
            <h1 className="not-found__error-type">404</h1>
            <p className="not-found__error-message">Страница не найдена</p>
            <Link to="/" className="not-found__link">Назад</Link>
        </div>
    )
}

export default NotFound;