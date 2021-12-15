import './navbar.css';

export function Navbar(){

    return(
        <nav className="navbar container" id="navbar">
            <div className="d-flex">
                <div className="menu" id="menu">
                    <i className="fa fa-user"></i>
                </div>
            </div>
        </nav>
    )
}