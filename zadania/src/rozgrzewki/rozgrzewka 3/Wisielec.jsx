import React from "react";
import "./Wisielec.css";
import wlc0 from "../../images/wlc0.png"
import wlc1 from "../../images/wlc1.png"
import wlc2 from "../../images/wlc2.png"
import wlc3 from "../../images/wlc3.png"
import wlc4 from "../../images/wlc4.png"
import wlc5 from "../../images/wlc5.png"
import wlc6 from "../../images/wlc6.png"
import wlc7 from "../../images/wlc7.png"
import wlc8 from "../../images/wlc8.png"

function Wisielec () {

    const THEWORD = ["G", "U", "I", "D", "E"];
    const GUIDE = [wlc0, wlc1, wlc2, wlc3, wlc4, wlc5, wlc6, wlc7, wlc8];
    const [count, setCount] = React.useState(0)
    const [correctWORD, setCorretWORD] = React.useState([]);
    const [guessLetter, setGuessLetter] = React.useState("");
    const [WORDIV, setWORDIV] = React.useState(THEWORD.map((letter) => {
        return (
            <span key={Math.random().toString()} className="div-letter"><span style={{display: "none"}}>{letter}</span></span>
        )
    }));

    function letterHandle (event) {
        setGuessLetter(event.target.value.toUpperCase());
    }

    function confirmHandle () {
        if (guessLetter === "") return
        setGuessLetter("");

        let COUNT = count;
        const GUESSLETTER = THEWORD.filter(letter => guessLetter === letter);
        let corAray = [...correctWORD];

        if (GUESSLETTER[0] === undefined) {
            setCount(++COUNT);
        }
        
        THEWORD.forEach((element, index) => {
            if (element === GUESSLETTER[0]) corAray[index] = element;
            else if (!corAray[index]) corAray[index] = undefined
        });

        for (let index = 0; index < corAray.length; index++) {
            if (!corAray[index]) break;
            else if (index === corAray.length - 1) {
                console.log("win");
                document.write("YOU WIN");
                COUNT = 0;
                return;
            }
        }

        setCorretWORD(corAray);

        setWORDIV((WORD) => {
            let WORDIVupdate = [...WORD];
            corAray.map((letter, index) => {
                if (letter) {
                    WORDIVupdate[index] = <span key={Math.random().toString()} className="div-letter"><span>{letter}</span></span>
                }
                return undefined;
            });
            return WORDIVupdate;
        });

        if (COUNT > 8) {
            console.log(COUNT);
            document.write("YOU LOSE");
        }
    }

    function retryHandler () {
        setCount(0);
        setCorretWORD([]);
        setWORDIV(THEWORD.map((letter) => {
            return (
                <span key={Math.random().toString()} className="div-letter"><span style={{display: "none"}}>{letter}</span></span>
            )
        }));
        
    }

    return (
        <>
            <div className="clearfix">
                <p>What Is This Man's Name?</p>

                <div>{WORDIV}</div>
            </div>

            <img src={GUIDE[count]} alt={`wlc${count}`}/>

            <form>
                <input size={1} maxLength={1} onChange={letterHandle} value={guessLetter}/> <br />
                <input type="button" value={"confirm"} onClick={confirmHandle} />
                <input type="button" value={"retry"} onClick={retryHandler} />
            </form>
        </>
    );
}

export default Wisielec;