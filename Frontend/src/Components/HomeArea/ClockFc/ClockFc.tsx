import { useEffect, useState } from "react";
import "./ClockFc.css";
import notificationService from "../../../Service/NotificationService";

interface ClockProps {
    format: string;
}

function ClockFc(props: ClockProps): JSX.Element {

    const [time, setTime] = useState<string>(getTime());
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getTime());
        }, 1000)

        return () => clearInterval(intervalId);
    }, []);

    function showTime() {
        notificationService.success(time);
    }

    function getTime() {
        const options = { hour12: props.format === '12h' }
        return new Date().toLocaleTimeString('en', options);
    }


    return (
        <div className="ClockFc">
            <span>{time} &nbsp;</span>
            <button onClick={showTime}>⏱</button>
        </div>
    );
}

export default ClockFc;
