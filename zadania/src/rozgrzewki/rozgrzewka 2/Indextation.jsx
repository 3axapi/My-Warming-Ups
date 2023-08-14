import React, { useState } from "react";
import "./Indextation.css";
import done from "../../images/done.png";

function Indextation () {

    if (!localStorage.getItem("list_storage") && !localStorage.getItem("finished_storage")) {
        localStorage.setItem("list_storage", JSON.stringify([]));
        localStorage.setItem("finished_storage", JSON.stringify([]));
    }

    const [tresc, setTesc] = useState("");
    const [czas, setCzas] = useState("");
    const [list, setList] = useState(JSON.parse(localStorage.getItem("list_storage")));
    const [finished, setFinished] = useState(JSON.parse(localStorage.getItem("finished_storage")));
    const [edtresc, setEdTresc] = useState("");
    const [edczas, setEdCzas] = useState("");

    function regTresc (event) {
        setTesc(event.target.value);
    }

    function regCzas (event) {
        setCzas(event.target.value);
    }

    function edTresc (event) {
        setEdTresc(event.target.value);
    }

    function edCzas (event) {
        setEdCzas(event.target.value);
    }

    function listGenerate (event) {
        event.preventDefault();
        if (tresc === "") return;
        setList(curr_trecc => {
            const updated_list = [...curr_trecc];
            updated_list.push({
                li_id: Math.random().toString(),
                event: tresc,
                time: czas,
                id: Math.random().toString(),
                event_id: Math.random().toString(),
                time_id: Math.random().toString(),
                edbtn_id: Math.random().toString(),
                donebtn_id: Math.random().toString(),
                ok_id: Math.random().toString(),
                cnl_id: Math.random().toString(),
                er_id: Math.random().toString(),
                clrfinsh: Math.random().toString(),
                dlt_id: Math.random().toString()
            });
            localStorage.setItem("list_storage", JSON.stringify(updated_list));
            return updated_list;
        });

        setTesc("");
    }

    function deleteEvent (elm) {
        setList(curr_event => {
            const updated_list = curr_event.filter(event => event.li_id !== elm.li_id);
            localStorage.setItem("list_storage", JSON.stringify(updated_list));
            return updated_list;
        });
    }

    function editEvent(elm) {
        document.getElementById(elm.event_id).hidden = false;
        document.getElementById(elm.time_id).hidden = false;
        document.getElementById(elm.edbtn_id).hidden = true;
        document.getElementById(elm.donebtn_id).hidden = true;
        document.getElementById(elm.cnl_id).hidden = false;
        document.getElementById(elm.ok_id).hidden = false;
        document.getElementById(elm.dlt_id).hidden = false;
    }

    function saveEvent (elm) {
        document.getElementById(elm.event_id).hidden = true;
        document.getElementById(elm.time_id).hidden = true;
        document.getElementById(elm.edbtn_id).hidden = false;
        document.getElementById(elm.donebtn_id).hidden = false;
        document.getElementById(elm.cnl_id).hidden = true;
        document.getElementById(elm.ok_id).hidden = true;
        document.getElementById(elm.dlt_id).hidden = true;

        setList(curr_item => {
            const updated_list = curr_item.filter(() => (elm.event = edtresc || elm.event, elm.time = edczas || "bez czasu"));
            localStorage.setItem("list_storage", JSON.stringify(updated_list));
            return updated_list;
        })
    }

    function cancelEvent (elm) {
        document.getElementById(elm.event_id).hidden = true;
        document.getElementById(elm.time_id).hidden = true;
        document.getElementById(elm.edbtn_id).hidden = false;
        document.getElementById(elm.donebtn_id).hidden = false;
        document.getElementById(elm.cnl_id).hidden = true;
        document.getElementById(elm.ok_id).hidden = true;
        document.getElementById(elm.er_id).hidden = true;
        document.getElementById(elm.dlt_id).hidden = true;
    }

    function finishEvent (elm) {
        if (finished.length >= 12) {
            document.getElementById("full").hidden = false
            return
        } else {
            document.getElementById("full").hidden = true
        }

        setList(curr_item => {
            const updated_list = curr_item.filter(check => check.li_id !== elm.li_id);
            localStorage.setItem("list_storage", JSON.stringify(updated_list));
            return updated_list;
        })

        setFinished(curr_item => {
            const updated_list = [...curr_item];
            updated_list.push({
                event: elm.event,
                time: elm.time,
                id: Math.random().toString()
            });
            localStorage.setItem("finished_storage", JSON.stringify(updated_list));
            return updated_list;
        })
    }

    function clearFinished () {
        setFinished([]);
        localStorage.setItem("finished_storage", JSON.stringify([]));
        document.getElementById("full").hidden = true
    }

    function deleteFinished (elm) {
        setFinished(curr_item => {
            const updated_list = curr_item.filter(item => item.id !== elm.id);
            localStorage.setItem("finished_storage", JSON.stringify(updated_list));
            return updated_list;
        });
        document.getElementById("full").hidden = true
    }

    let events_list;
    let finished_list;

    if (list.length > 0) {
        events_list = list.map(elemment => {
            return (
                <li id={elemment.li_id} className="lidist">
                    <div className="res">
                        <div className="r-tresc">{elemment.event}
                        <div>
                            <input id={elemment.event_id} type="text" defaultValue={elemment.event} onChange={edTresc} hidden={true} size={10}/>
                        </div></div>
                        <div className="r-czas">{elemment.time || "bez czasu"}
                        <div>
                            <input id={elemment.time_id} type="time" defaultValue={elemment.time || "bez czasu"} onChange={edCzas} hidden={true} />
                        </div>
                        <div id={elemment.er_id} hidden={true}>
                            <small>wpisz czas</small>
                        </div></div>
                    </div>
                    <div className="hdn">
                        <div className="btns">
                            <button id={elemment.edbtn_id} onClick={() => editEvent(elemment)}>EDYTUJ</button>
                            <button id={elemment.ok_id} onClick={() => saveEvent(elemment)} hidden={true}>OK</button>
                            <button id={elemment.dlt_id} onClick={() => deleteEvent(elemment)} hidden={true}>USUŃ</button>
                            <button id={elemment.cnl_id} onClick={() => cancelEvent(elemment)} hidden={true}>CANCEL</button>
                            <button id={elemment.donebtn_id} onClick={() => finishEvent(elemment)}>ZROBIONE</button>
                        </div>
                    </div>
                </li>
            );
        });
    }

    if (finished.length > 0) {
        finished_list = finished.map(elemment => {
            return (
                <li className="lidist">
                    <div className="res">
                        <div className="r-tresc">{elemment.event}<img src={done} width={20} style={{paddingLeft: 7.5}}/></div>
                        <button id={elemment.clrfinsh} onClick={() => deleteFinished(elemment)}>WYCZYŚĆ</button>
                    </div>
                </li>
            )
        })
    }

    return (
        <div id="backgroundim">
            <div className="clearfix">
                <div className="list-div">
                    <div className="text-center">
                        <span>DO ZROBIENIA</span>
                    </div>
                    <ul>
                        {
                            events_list
                        }
                    </ul>
                </div>

                <form className="add-div" onSubmit={listGenerate}>
                    <div className="text-center">
                        <span>DODAJ</span>
                    </div>
                    <div className="dodawac">
                        <div className="tresc">
                            <label>TRĘŚĆ:</label>
                            <textarea value={tresc} onChange={regTresc} rows={5}/>
                        </div>
                        <div className="czas">
                            <label>CZAS:</label>
                            <input type="time" onChange={regCzas}/>
                        </div>
                    </div>
                    <input className="rbtn" type="submit" value={"DODAJ"}/>
                </form>
            </div>

            <div className="silver">
                <div className="show-div">
                    <div className="text-center">
                        <span>ZROBIONE</span>
                    </div>
                    <ul>
                        {
                            finished_list
                        }
                    </ul>
                    <button onClick={clearFinished}>WYCZYŚĆ WSZYSTKO</button>
                </div>

                <br />
                
                <div className="rezult-div">
                    <span>WYKONANO: </span>
                    <span>{finished.length} / 12</span>
                    <small id="full" hidden={true}><i> (BRAK MIEJSCA)</i></small>
                </div>
            </div>

        </div>
    );
}

export default Indextation;