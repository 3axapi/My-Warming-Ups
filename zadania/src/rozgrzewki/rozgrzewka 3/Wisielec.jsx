import React from "react";
import "./Wisielec.css";
import wlc0 from "../../images/wlcs/wlc0.png"
import wlc1 from "../../images/wlcs/wlc1.png"
import wlc2 from "../../images/wlcs/wlc2.png"
import wlc3 from "../../images/wlcs/wlc3.png"
import wlc4 from "../../images/wlcs/wlc4.png"
import wlc5 from "../../images/wlcs/wlc5.png"
import wlc6 from "../../images/wlcs/wlc6.png"
import wlc7 from "../../images/wlcs/wlc7.png"
import wlc8 from "../../images/wlcs/wlc8.png"
import wlca from "../../images/wlcs/wlca.png"
import wlcb from "../../images/wlcs/wlcb.png"
import c2 from "../../images/clouds/c2.png"
import c3 from "../../images/clouds/c3.png"
import c4 from "../../images/clouds/c4.png"
import c5 from "../../images/clouds/c5.png"
import c6 from "../../images/clouds/c6.png"

function Wisielec () {

    const THEWORD = ["G", "U", "I", "D", "E"];
    const GUIDE = [wlca, wlc0, wlc1, wlc2, wlc3, wlc4, wlc5, wlc6, wlc7, wlc8, wlcb];
    const [count, setCount] = React.useState(1)
    const [vic, setVic] = React.useState("none");
    const [slain, setSlain] = React.useState(["none", "inline-block"]);
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
        if (guessLetter === "" || guessLetter === " ") return
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
                COUNT = 0;
                setCount(COUNT);
                setSlain(["none", "none"]);
                setVic("victory");
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

        if (COUNT > 9) {
            COUNT = 10;
            setCount(COUNT);
            setVic("lost")
            setSlain(["inline-block", "none"]);
        }
    }

    function retryHandler () {
        setCount(1);
        setVic("");
        setSlain(["none", "inline-block"]);
        setCorretWORD([]);
        setGuessLetter("");
        setWORDIV(THEWORD.map((letter) => {
            return (
                <span key={Math.random().toString()} className="div-letter"><span style={{display: "none"}}>{letter}</span></span>
            )
        }));
    }

    return (
        <div className="window-bg">
            <div className={vic}>
                <div className="clouds" >
                    <div><img id="c1" src={c5} width={200}/></div>
                    <div><img id="c2" src={c2} width={200}/></div>
                    <div><img id="c3" src={c3} width={200}/></div>
                    <div><img id="c4" src={c6} width={200}/></div>
                    <div><img id="c5" src={c2} width={200}/></div>
                    <div><img id="c6" src={c4}/></div>
                    <div><img id="c7" src={c3} width={200}/></div>
                </div>
                
                <div className="container">
                    <div className="clearfix">
                        <p>What Is This Man's Name?</p>

                        <div className="wordiv">{WORDIV}</div>
                    </div>

                    <div className="slain" style={{display: slain[0]}}>
                        You were slain...
                    </div>

                    <img src={GUIDE[count]} alt={`wlc${count}`}/>

                    <form className="control">
                        <div id="i">
                            <input maxLength={1} onChange={letterHandle} value={guessLetter} />
                        </div>
                        <div id="b">
                            <span className="ftn" onClick={confirmHandle} style={{display: slain[1]}}>Confirm</span>
                            <span className="ftn" onClick={retryHandler}>Retry</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Wisielec;