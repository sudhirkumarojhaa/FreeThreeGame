/* eslint-disable react/style-prop-object */
import React , {useState,useEffect} from 'react';
import './App.css';
import win from './win.png';
import lose from './lose.png';

const App=()=> {
  const [value,setValue]=useState(1);
  const [id, setId] = useState('');
  const [item,setItem]=useState([]);
  const [betValue,setBetValue]=useState('');
  const [toggle,setToggle]= useState(true);
  const [sum,setSum]=useState(0);
  const [btnStatus,setBtnStatus]= useState(true);

  useEffect(() => {
    if (item.length === 3) {
      var add = item.reduce(function (a, b) {
        return a + b;
      }, 0);
      setSum(add);
    }
  }, [item, sum])

  const random = ()=> {
    var ranNum = Math.floor(1 + Math.random() * 6);
    setValue(ranNum);
  }

  const handleBetValue=()=>{
    setToggle(false);
  }

  const startBet=()=>{
    var handle = setInterval(() => {
      random()
    }, 1);
    setId(handle)
    setBtnStatus(!btnStatus)
  }

  const stopBet=()=>{
    const arr = [...item,value];
    setItem(arr);
    setBtnStatus(!btnStatus)
    clearInterval(id);
  }

  return (
    <div className="app vh-100 d-flex justify-content-center align-items-center flex-column">
        {toggle ?
          <div className="d-flex justify-content-center align-items-center flex-column my-5 box" >
            <p className="text-dark font-weight-bold text-center py-3">Enter your Bet Sum</p>
          <input type="number" value={betValue} onChange={e => setBetValue(parseInt(e.target.value))}  />
          <button className="px-4 my-3 py-2 bg-primary text-white font-weight-bold" disabled={betValue === '' || betValue >= 19}
              onClick={() => handleBetValue()}>Submit Bet Amount</button>
              <div>
          <li className="small font-weight-bold text-dark"> Choose any number between 1-18.</li>
          <li className="small font-weight-bold text-dark"> You will get three attempts to roll the dice.</li>
          <li className="small font-weight-bold text-dark"> Number would start from 1-9 .</li>
          <li className="small font-weight-bold text-dark"> At the end of third attempt sum of the three rolls would be calculated</li>
          <li className="small font-weight-bold text-dark"> If it matches your bet you win otherwise you lose.</li>
          </div>
          </div> :
          <div className="d-flex justify-content-center align-items-center flex-column">

          {item.length !== 3 ?
            <div className="box">
              <h3 className="font-weight-bold my-4 font">{value}</h3>
              <div className="py-3">
                {btnStatus  ?
                  <button className="px-4 py-2 bg-primary text-white font-weight-bold " onClick={() => startBet()}>Roll Dice</button> :
                  <button className="px-4 py-2 bg-primary text-white font-weight-bold" onClick={() => stopBet()}>Stop</button>
              }
              </div>
            </div>
            : null }
            <div className="d-flex justify-content-center align-items-center box">
              {item.length !== 0 ?
                item.map((item,index) =>
                  <div className="m-2 d-flex justify-content-center align-items-center"  key={index}>
                      <h2 className="text-dark font-weight-bold">{item} </h2>
                  </div>
                ) : null }
           </div>
           {sum !== 0 ? sum === betValue ?
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h5 className="font-weight-bold font">You Win !!</h5>
              <img src={win} alt="winner" /> <button className="px-4 py-2 bg-primary text-white font-weight-bold " onClick={() => window.location.reload()}>Play Again</button></div> :
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h5 className="font-weight-bold font"> Unlucky {betValue} !!</h5>
              <img src={lose} alt="loser" /><button className="px-4 py-2 bg-primary text-white font-weight-bold " onClick={() => window.location.reload()}>Try Again</button></div>
                :  null}
         </div>
        }
    </div>
  )
}

export default App;