import NavMenu from "../NavMenu";
import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { auth, db, logout } from "../../scripts/firebase";
import { ref, get,set,getDatabase, child,update } from "firebase/database";
import { Link, Router } from "react-router-dom";
import "../Login.css";

export default function CorpInform() {
    const [boss, setBoss] = useState("");
    const [boss_contact, setBosscontact] = useState("");
    const [capital_size, setCapitalsize] = useState("");
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");
    const [scale, setScale] = useState("");
    const [nickname, setNickname] = useState("");
    
    

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
        var snapshot = await get(ref(db, 'users/' + user.uid));
        var data = snapshot.val();
        setName(data.name);
        } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/corporation/main', {replace: true});
        fetchUserName();
    }, [user, loading]);

    const postcorp =async()=>{
      update(ref(db, 'users/' + user.uid), {
          auth:"ROLE_CORP",
          ROLE_CORP:{
            Info:{
                boss:boss,
                boss_contact:boss_contact,
                capital_size:capital_size,
                contact:contact,
                category:category,
                name:nickname,
                scale:scale,
                name:nickname},
            count:0
          }}
      )
      navigate('/corporation/main', {replace:true})
      }

    return (
      <>
      {/*<NavMenu name={name}/>*/}
      <div className="login">
          <img style={{height: 908,width: 1024}} src="main.png"/>
          <div className="login__container">
            <div style={{alignContent:"flex-end"}}>
            <img style={{width:101, height:75.75}} src="logo.png"/></div>
      
        <text>?????? ????????????</text>
        <text className="corptext">?????? ??????</text>
        <div className="login__Box">
            <text className="login__Text">?????????</text>
            <input
              type="text"
              className="login__textBox2"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="??????"
            />
        </div>

        <text className="corptext">????????? ??????</text>

        <div className="login__Box">
            <text className="login__Text">??????</text>
            <input
              type="text"
              className="login__textBox2"
              value={boss}
              onChange={(e) => setBoss(e.target.value)}
              placeholder="????????? ?????? ??????"
            />
        </div>

        <div className="login__Box">
            <text className="login__Text">?????????</text>
            <input
              type="text"
              className="login__textBox2"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="????????? ???????????? ??????"
            />
        </div>

        <div className="login__Box">
            <text className="login__Text">?????? ?????????</text>
            <input
              type="text"
              className="login__textBox2"
              value={boss_contact}
              onChange={(e) => setBosscontact(e.target.value)}
              placeholder="?????? ????????? ??????"
            />
        </div>
        <text className="corptext">?????? ??????</text>
        <div className="login__Box">
            <text className="login__Text">?????? ?????????</text>
            <input
              type="text"
              className="login__textBox2"
              value={scale}  
              onChange={(e) => setScale(e.target.value)}
              placeholder="?????? ????????? ??????"
            />
        </div>

        <div className="login__Box">
            <text className="login__Text">?????? ?????? ??????</text>
            <input
              type="text"
              className="login__textBox2"
              vvalue={capital_size}
              onChange={(e) => setCapitalsize(e.target.value)}
              placeholder="?????? ?????? ?????? ??????"
            />
        </div>


        <div className="login__Box">
              <text className="login__Text">?????? ??????</text>
              <select className="login__Box" placeholder="?????? ?????? ??????" name="fieldoption" 
                    value={category}  onChange={(e) => setCategory(e.target.value)}>
                      <text className="login__Text">?????????</text>
                    <optgroup label='????????? ???????????????'>
                    <option value=' '></option>
                    <option value='it'>IT/?????????</option>
                    <option value='marketing'>?????????</option>
                    <option value='finance'>??????</option>
                    <option value='game'>??????</option>
                    <option value='culture'>??????/??????</option>
                    <option value='beauty'>??????</option>
                    <option value='sports'>?????????/??????</option>
                    <option value='foods'>??????</option>
                    <option value='trip'>??????</option>
                    <option value='medical'>??????</option>
                    <option value='fashion'>????????????</option>
                    <option value='environment'>??????</option>
                    <option value='etc'>??????</option>
                    </optgroup>
              </select>
            </div>

        
        <button className="login__btn login__google" onClick={(e)=>postcorp()}>
          ??????
        </button>
    
        
        </div>
        </div>
        </>
    )
}