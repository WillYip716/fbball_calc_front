import React, { useState } from 'react';
import { Form,Button } from "react-bootstrap";
//import axios from 'axios';
import { compile } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'

function LeagueCompiler(){

    const [textarea, setText] = useState("");
    const [er, setEr] = useState(false);
    const [ermsg,setErmsg] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    let handleChange = (event) => {    

        setText(event.target.value)
    }

    
    let handleSubmit = (event) => {  
        event.preventDefault(); 
        let arr = [];
        let outarr = [];
        let cleanedtext =  textarea.replace(/\n\s*\n/g, '\n');
        arr = cleanedtext.split("Pos");
        let rePlayers = new RegExp("(?<=\\n)([a-zA-Z .'-]*)(?=[ ](ATL|BKN|BOS|CHA|CHI|CLE|DAL|DEN|DET|GSW|HOU|IND|LAC|LAL|MEM|MIA|MIL|MIN|NOP|NYK|OKC|ORL|PHI|PHX|POR|SAS|SAC|TOR|UTA|WAS))","g");
        let ter = false;

        console.log(arr);

        if(arr.length){
            for(let i = 1; i < arr.length; i++){      
                let teamnamearr = arr[i-1].split("\n");  
                if(arr[i].match(rePlayers) && teamnamearr[teamnamearr.length - 2]){
                    outarr.push({
                        'teamName': teamnamearr[teamnamearr.length - 2].split(" ").slice(0, -1).join(' '),
                        'players': arr[i].match(rePlayers)
                    });
                }
                else{
                    ter = true;
                    setEr(true);
                    setErmsg("rosters failed to compile");
                    break;
                }
            }
            if(!ter){
                const info = {
                    teams: outarr
                };
                dispatch(compile(info));
                history.push("/");
            }
        }
        else{
            setEr(true);
            setErmsg("Invalid Input")
        }
    }


    
    

    return (
      <div className="container">
          <h3 style={{display:"inline-block",marginRight:"auto"}}>Compile League</h3>
          <Form onSubmit={handleSubmit} style={{textAlign:"center", margin:"auto"}}role="form">
              <textarea style={{width: "100%",margin:"auto", height: "400px"}} value={textarea} onChange={handleChange} />
              <br/>
              {(er)?<Alert key="errormsg" variant="danger">{ermsg}</Alert>:<div/>}
              <Button type="submit">Compile</Button>
          </Form>
      </div>
      
    );

  }
  

  export default LeagueCompiler;
  