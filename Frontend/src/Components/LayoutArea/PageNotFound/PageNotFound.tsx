import "./PageNotFound.css";
import legoImage from "../../../Assets/Images/lego.png"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <h2>404 Page not found</h2>
            <img src={legoImage} />
        </div>
    );
}

export default PageNotFound;
