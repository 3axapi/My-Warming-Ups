import React from "react";
import "./Wisielec.css";

function Wisielec () {

    const theword = ["Q", "U", "E", "S", "T", "I", "O", "N"];
    const [count, setCount] = React.useState(0)
    const [correctWORD, setCorretWORD] = React.useState([]);
    const [guessLetter, setGuessLetter] = React.useState("");
    const [WORDIV, setWORDIV] = React.useState(theword.map((letter) => {
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
        setCount(count + 1);
        const GUESSLETTER = theword.filter(letter => guessLetter === letter);
        let corAray = [...correctWORD];
        
        theword.forEach((element, index) => {
            if (element === GUESSLETTER[0]) corAray[index] = element;
            else if (!corAray[index]) corAray[index] = undefined
        });

        for (let index = 0; index < corAray.length; index++) {
            if (!corAray[index]) break;
            else if (index === corAray.length - 1) {
                console.log("win");
                document.write("YOU WIN");
                return;
            }
        }

        if (count > 8) document.write("YOU LOSE");

        setCorretWORD(corAray);

        setWORDIV((WORD) => {
            let WORDIVupdate = [...WORD];
            corAray.map((letter, index) => {
                if (letter) {
                    WORDIVupdate[index] = <span key={Math.random().toString()} className="div-letter"><span>{letter}</span></span>
                }
            });
            return WORDIVupdate;
        });
        console.log(count)
    }

    return (
        <>
            <div className="clearfix">
                <p>question</p>

                <div>{WORDIV}</div>
            </div>

            <div style={{width: 50, height: 50, background: "lightgray", border: "1px solid black", margin: 20}}/>

            <form>
                <input size={1} maxLength={1} onChange={letterHandle} value={guessLetter}/> <br />
                <input type="button" value={"confirm"} onClick={confirmHandle} />
                <input type="button" value={"retry"} />
            </form>
        </>
    );
}

export default Wisielec;