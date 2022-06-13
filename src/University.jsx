import React, { setState, useEffect, useState } from 'react'
import axios from "axios";

const University = () => {
    const [data, setData] = useState([]);
    const [statelist, setStatelist] = useState([]);
    const [inputval, setInputval] = useState("")
    const [sugglist, setSugglist] = useState([])
    const [content, setContent] = useState([])
    // const a = 'india';
    const baseUrl = 'http://universities.hipolabs.com/search?country=india';
    React.useEffect(() => {
        axios(baseUrl).then(response => {
            // console.log(response.data);
            setData(response.data);
            setStatelist(response.data.map(item => item['state-province']));
            console.log(statelist);
        })
    }, []);
    function userInput(i) {
        setInputval(i);
        console.log(inputval);
        if (inputval.length >= 1) {
            setSugglist(statelist.filter(item => {
                if (item?.toLowerCase().includes(inputval.toLowerCase())) {
                    return item;
                }
            }))
        }

    }

    //console.log(inputval);
    // const [newdata, setNewdata] = useState([]);
    // function collegeName(){

    // }
    function showContent(i) {
        console.log(i)
        setContent(data.filter(item => {
            if (item['state-province'] == i) {
                return item;
            }
        }))
    }

    return (
        <div>
            <div className='container'>
                <input type="text" onChange={e => userInput(e.target.value)} />
                <br />
                <ul>
                    {
                        sugglist.map(item => (<li onClick={() => showContent(item)}>{item}</li>))
                    }
                </ul>
            </div>
            <div className='container'>
                <table>
                    <tr>
                        <th>College Name</th>
                        <th>College Website</th>
                        <th>Location</th>
                    </tr>
                    {
                        content.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.web_pages[0]}</td>
                                <td>{item['state-province']}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}

export default University;