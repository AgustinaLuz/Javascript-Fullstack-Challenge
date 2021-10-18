import "./header.css";

const Header = () => {
    return (
        <header >
            <span className="logo">WALLET</span>
            <nav>
                <ul className="nav_links">
                    <li><a href="#amount">Amount</a></li>
                    <li><a href="activity">Activity</a></li>
                    <li><a href="About">About</a></li>
                </ul>
            </nav>
            <a className="header-account"><button>ADD</button></a>
        </header>
    );
};

export default Header;