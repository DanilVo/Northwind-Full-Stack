import { Component } from "react";
import "./ClockFc.css";
import notificationService from "../../../Service/NotificationService";

interface ClockProps {
    format: string;
}

interface ClockState {
    time: string,
    color: string
}

// class ClockClass extends Component {
// class ClockClass extends Component<ClockProps> {
// class ClockClass extends Component<{}, ClockState> {
class ClockClass extends Component<ClockProps, ClockState> {
    public intervalId: any;

    public constructor(props: ClockProps) {
        super(props)
        this.state = {
            // time: new Date().toLocaleTimeString(),
            time: this.getTime(),
            color: "blue"
        }

        // this.showTime = this.showTime.bind(this);
    }

    // Component Mounted
    public componentDidMount(): void {
        this.intervalId = setInterval(
            () => {
                // this.setState(prevState => Object.assign({}, prevState, { time: new Date().toLocaleTimeString() }))
                // this.setState({ ...this.state, time: new Date().toLocaleTimeString() })
                this.setState((prevState) => ({ ...prevState, time: this.getTime() }))
            }, 1000)
    }

    // Component willUpdate

    // Component WillUnMount
    public componentWillUnmount(): void {
        clearInterval(this.intervalId);
    }

    public showTime = () => {
        notificationService.success(this.state.time);
    }

    public getTime() {
        const options = { hour12: this.props.format === '12h' }
        return new Date().toLocaleTimeString('en', options);
    }

    // public showTime() {
    //     notificationService.success(this.state.time);
    // }

    public render(): JSX.Element {

        return <div className="ClockFc">
            <span>{this.state.time} &nbsp;</span>
            <button onClick={this.showTime}>⏱</button>
            {/* <button onClick={this.showTime.bind(this)}>⏱</button> */}
        </div>
    }


}

export default ClockClass;