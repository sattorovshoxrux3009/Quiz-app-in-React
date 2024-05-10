import './Main.css'
import {  useRef, useState } from 'react';
import { data } from '../data/data.js';

function Main() {

  let [index,setindex]=useState(0)
  let [question,setquestion]=useState(data[index])
  let [lock,setlock]=useState(false)
  let [score,setscore]=useState(0)
  
  const [modalShow,setmodalShow]=useState(false)

  let Option1=useRef(null)
  let Option2=useRef(null)
  let Option3=useRef(null)
  let Option4=useRef(null)

  let option_array=[Option1,Option2,Option3,Option4];

  function checkAns(e,ans){
    if(lock===false){
      if(question.ans===ans){
        e.target.classList.add('correct');
        setscore(++score);
        setlock(true)
      }
      else{
        e.target.classList.add('uncorrect')
        option_array[question.ans-1].current.classList.add('correct');
        setlock(true)
      }
    }
  }


  function next(){
    if(lock){
      if(index===data.length-1){
        setmodalShow(true);
      }else{
        setindex(++index);
        setquestion(data[index]);
        setlock(false);
        option_array.map((option)=>{
          option.current.classList.remove('correct')
          option.current.classList.remove('uncorrect')
          return 0;
        })
      }      
    }
  }

  function restart(){
    setmodalShow(false)
    setindex(0);
    setlock(false)
    setscore(0)
    option_array.map((option)=>{
      option.current.classList.remove('correct')
      option.current.classList.remove('uncorrect')
      return 0;
    })
  }

  return (
    <>
    <div className='container'>
        <div className="wrapper">
          <h1 className="title" id="question">{index+1}.{question.question}</h1>
          <ul className="list">
            <li ref={Option1} onClick={(e)=>{checkAns(e,1)}} className="item">{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e,2)}} className="item">{question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e,3)}} className="item">{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e,4)}} className="item">{question.option4}</li>
          </ul>
          <p className="text"> {index+1}/{data.length} </p>
          <button onClick={next} className="button">Next</button>
        </div>
    </div>
    {modalShow && <div className='modal'>
        <div className="container">
          <h1 className="modal-title">You answered {score} question correctly</h1>
          <button onClick={restart} className="button">Restart</button>
        </div>
    </div>}
    </>
  )
}

export  default Main