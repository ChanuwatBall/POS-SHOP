import React, { useState } from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { backspace, closeCircle } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import "./css/CalculatorKeypad.css"

interface CalculatorKeypadProps {
    input : Number 
    setInput:(e:any)=> Number | any
    clearInput:()=> void
    backspce:(e:any)=>  any
}
const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({input,setInput,clearInput,backspce}:any) => {
//   const [input, setInput] = useState('');

  const handleClick = (value: string) => {
    return setInput(value);
  };

  const handleBackspace = () => { 
    console.log("input ", typeof input , input)
     const last =  input.slice(0, -1) // setInput((prev:any) =>);
     console.log("last ",last) 
     return  backspce(last) 
  };

  const buttons = [
    ['', '', 'AC'],
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫']
  ];

  const renderButton = (value: string) => {
    if (value === '⌫') {
      return (
      <div  className='calculator-button' > 
        <IonButton expand="block" mode='ios' fill='clear'  onClick={()=>{  handleBackspace()}}>
          <IonIcon icon={backspace} />
        </IonButton>
       </div>
      );
    }
    if (value === '.') {
        return (
        <div  className='calculator-button' > 
          <IonButton disabled expand="block" mode='ios' fill='clear'  >
             {value}
          </IonButton>
         </div>
        );
    }
    if( value === ''){
        return ""
    }
    if (value === 'AC') {
        return (
        <div  className='calculator-button ac' > 
          <IonButton expand="block" mode='ios' color={"light"} fill='clear'  onClick={()=>{return clearInput()}}>
             {value}
          </IonButton>
         </div>
        );
    }
      

    return (
     <div  className='calculator-button' > 
      <IonButton  expand="block" mode='ios' fill='clear' onClick={() => handleClick(value)}>
        {value}
      </IonButton>
      </div>
    );
  };

  return (
    <div style={{ width:"20rem"}}>
      {/* <IonText>
        <h2>Input: {input}</h2>
      </IonText> */}

      <IonGrid>
        {buttons.map((row, rowIndex) => (
          <IonRow key={rowIndex}>
            {row.map((value, colIndex) => (
              <IonCol key={colIndex}>{renderButton(value)}</IonCol>
            ))}
          </IonRow>
        ))}
      </IonGrid>
    </div>
  );
};

export default CalculatorKeypad;
