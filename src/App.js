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

  let cursor = 0
  let currentChar = ''

  function updateInput(){

    const hiddenTextarea =document.querySelector('#typing-textarea')
    const baseTextarea = document.querySelector('.base-textarea')

    try{
      
      const spanChar = document.querySelector(`#char_${cursor}`)
      spanChar.classList.remove('bg-green')
      spanChar.classList.remove('bg-red')
      spanChar.classList.remove('bg-grey')

      cursor = hiddenTextarea.value.length === -1 ? 0 : hiddenTextarea.value.length 
      let currentHiddenChar = hiddenTextarea.value[hiddenTextarea.value.length -1] 
      console.log(cursor,  currentChar, currentHiddenChar)
      if(currentChar === currentHiddenChar){
        console.log('verde')
        spanChar.classList.add('bg-green')
      }else{
        console.log('vermelho')
        spanChar.classList.add('bg-red')
      }
      currentChar = baseTextarea.textContent[cursor]

      const nextSpanChar = document.querySelector(`#char_${cursor+1}`)
      if(nextSpanChar !== null){
        nextSpanChar.classList.remove('bg-green')
        nextSpanChar.classList.remove('bg-red')
        nextSpanChar.classList.remove('bg-grey')
      }

      if(cursor-1 !== 0){
        const prevSpanChar = document.querySelector(`#char_${cursor-1}`)
        
        if (prevSpanChar !== null){
          prevSpanChar.classList.remove('bg-grey')
        }
      }
      const currentSpanChar = document.querySelector(`#char_${cursor}`)
      currentSpanChar.classList.add('bg-grey')
    }catch{
      const ckbox = document.querySelector('#checkWrite')
      const ckboxArea = document.querySelector('.checkbox-area')
      ckbox.checked = false
      ckboxArea.hidden = true
      alert('Finalizado')
    }
  }

  useEffect(()=>{
    updateInput()
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
      console.table({
        currentChar , 
        cursor
       
      })
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