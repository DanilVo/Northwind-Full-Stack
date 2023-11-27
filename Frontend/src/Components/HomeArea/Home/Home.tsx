import { useEffect, useState } from "react";
import products1 from "../../../Assets/Images/Food-products1.webp";
import products2 from "../../../Assets/Images/Food_products2.jpg";
import "./Home.css";
import notificationService from "../../../Service/NotificationService";
import ClockFc from "../ClockFc/ClockFc";
import ClockClass from "../ClockFc/ClockClass";



function Home(): JSX.Element {
    // console.log("Home rendered");
    // let randomNumber = 1;

    const [randomNumber, setRandomNumber] = useState<number>();

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 2) + 1);
    }, []);


    const desserts = [
        { id: 1, name: "Apple pie", price: 15 },
        { id: 2, name: "Ice cream", price: 10 },
        { id: 3, name: "Brownie", price: 5 },
        { id: 4, name: "Pancakes", price: 20 },
    ];

    // [string, function]
    const arr = useState<string>("Test");
    let message = arr[0];
    const setMessage = arr[1];

    // [string, function]
    const [message2, setMessage2] = useState<string>("Test");

    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState<string>(now);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            console.log("Testing interval");
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function displaySale(): void {
        notificationService.success("All our products are now in 50%");
    }

    function displaySale2(): void {
        setMessage("Sale in the desserts department - 20%");
    }
    function displaySale3(): void {
        setMessage2("Sale in Aroma - 15%");
    }

    function showAvg() {
        const numbers = [11, 22, 33, 44, 55];
        let sum = 0;
        for (let i = 0; i < numbers.length - 1; i++) {
            sum += numbers[i];
        }
        const avg = sum / numbers.length;
        notificationService.error("Avg is: " + avg)
    }

    return (
        <div className="Home">
            <h2>Welcome to Northwind Traders website</h2>

            <ClockFc format="12h" />
            <ClockClass format="24h" />

            {/* Conditional rendering */}
            {/* {randomNumber === 1 ? <img src={products1} /> : <img src={products2} />} */}

            {/* 2 */}
            {/* <img src={randomNumber === 1 ? products1 : products2} /> */}

            {/*Short circuit  */}
            {randomNumber === 1 && <img src={products1} />}
            {randomNumber === 2 && <img src={products2} />}


            <p>Our deserts: </p>
            {desserts.map((item, index) => <span key={item.id}>{item.name} - {item.price} 🍡</span>)}
            <br />
            <button onClick={displaySale}>Sale</button>
            <hr />
            <button onClick={displaySale2}>Sale2</button>
            <p>{message}</p>
            <hr />
            <button onClick={displaySale3}>Sale3</button>
            <p>{message2}</p>

            <button onClick={showAvg}>Show Avg</button>

        </div>
    );
}

export default Home;
