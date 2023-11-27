import "./Spinner.css";
import loaderImage from "../../Assets/Images/Ellipsis-1s-200px.gif"

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img src={loaderImage}/>
        </div>
    );
}

export default Spinner;
