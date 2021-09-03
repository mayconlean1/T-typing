/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect } from 'react';
import './App.css'
import utils from './utils'
const {
    changeStringToArray,
    createSpan,
    updateInput
  } = utils

const refText = `It seems like.`
const mainTextarray = changeStringToArray(refText)

// ###############################
export default () =>{

  useEffect(()=>{
    updateInput()
    const ckbox = document.querySelector('#checkWrite')

    document.addEventListener('keydown',()=>{
      const tinput= document.querySelector('#typing-textarea')
      if (ckbox.checked){
        tinput.focus()
      }
    })

    document.addEventListener('click',()=>{
      const tinput= document.querySelector('#typing-textarea')
      if (ckbox.checked){
        tinput.focus()
      }
    })
  })

  return (
    <>
      <div className='header'>
        <div className='header-content'>
          <h1>
            T typing
          </h1>
          <div className='checkbox-area'>
            <input type='checkbox' id='checkWrite' defaultChecked/>Ativar digitação
            <textarea  id='typing-textarea' onChange={updateInput}  />
          </div>
        </div>
      </div>
      <div className='main'>

        <div className='translate-area'>
          It seems like the world is growing more and more interested in Juliette Freire, an anonymous woman who has been gaining lots of attention.It seems like the world is growing more and more interested in Juliette Freire, an anonymous woman who has been gaining lots of attention.It seems like the world is growing more and more interested in Juliette Freire, an anonymous woman who has been gaining lots of attention.
        </div>

        <div className='base-textarea'>
          {mainTextarray.map((char,index)=> createSpan(char,index))}
        </div>
         
      </div>
    </>
  )
}