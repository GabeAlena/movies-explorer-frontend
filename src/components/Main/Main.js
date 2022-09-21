import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main() {
    return (
        <main className="content">
            <section className="promo">
                <Promo />
            </section>
            <section className="navtab">
                <NavTab />
            </section>
            <section className="about-project">
                <AboutProject />
            </section>
            <section className="techs">
                <Techs />
            </section>
            <section className="about-me">
                <AboutMe />
            </section>
            <section className="portfolio">
                <Portfolio />
            </section>
        </main>    
    )
}

export default Main;