/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect } from 'react';
import './App.css'

// const refText = `It seems like the world is growing more and more interested in Juliette Freire, an anonymous woman who has been gaining lots of attention.`
const refText = `It seems like.`
function changeStringToArray(refText = ''){
    const arrayRefText =[]
    for(let char of refText){
        arrayRefText.push(char)
    }
    return arrayRefText
}

const mainTextarray = changeStringToArray(refText)

function createSpan(char='' , index=''){
  const id = `char_${index}`
  return (<span id={id} className='span-char'>{char}</span>)
}

// ###############################
export default () =>{

  let currentCursor = -1
  // let lastCursor = -1
  let currentCharacter
  let tempNextCharacter = refText[0]
  let realNextCharacter = refText[0]

  function updateInput(){
    
    const textarea = document.querySelector('#typing-textarea')
    const lenIndex = textarea.value.length -1

    if(lenIndex <= refText.length-1){
      currentCharacter = textarea.value[lenIndex]
      tempNextCharacter = lenIndex === -1? refText[0] : refText[currentCursor+1] 
      realNextCharacter = refText[currentCursor+2]
      currentCursor = lenIndex === -1?  0 : lenIndex
      // lastCursor= currentCursor
  
      const spanChar = document.querySelector(`#char_${currentCursor}`)
      spanChar.classList.remove('bg-green')
      spanChar.classList.remove('bg-red')

      if(currentCharacter === tempNextCharacter){
        spanChar.classList.add('bg-green')
      }else{
        spanChar.classList.add('bg-red')
      }
      console.log(lenIndex, currentCharacter , tempNextCharacter , currentCharacter === tempNextCharacter)
    }else{
      alert('Concluido')
    }
  }

  useEffect(()=>{
    const ckbox = document.querySelector('#checkWrite')

    document.addEventListener('keydown',()=>{
      const tinput= document.querySelector('#typing-textarea')
      tinput.focus()
    })

    document.addEventListener('click',()=>{
      const tinput= document.querySelector('#typing-textarea')
      if (ckbox.checked){
        tinput.focus()
      }
      console.table({'lastkey': currentCharacter , 'tempnextkey': tempNextCharacter , 'realnextkey':realNextCharacter })
    })
    
  },[])

  return (
    <>
      <div>
        Header
      </div>
      <div className='main'>
        <div className='base-textarea'>
          {mainTextarray.map((char,index)=> createSpan(char,index))}
        </div>
        <div className='checkbox-area'>
          <input type='checkbox' id='checkWrite' defaultChecked/> Digitar
          <textarea id='typing-textarea' onChange={updateInput}/>
        </div>
  
      </div>
    </>
  )
}