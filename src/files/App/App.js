/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect , useState} from 'react';
import './App.css'
import '../../baseStyles.css'

import Wrapper from '../../components/Wrapper/Wrapper';

import utils from './utils'
const {
    changeStringToArray,
    createSpan,
    updateInput,
    resetTextCursor,
    setTranslateConfig
    // toggleCheckbox
  } = utils

// const refText = `It seems like.`
// const mainTextarray = changeStringToArray(refText)

// ###############################
export default () =>{

  // const handleCursor = {
  //   cursor : useState(0),
  //   currentChar : useState('')
  // }
   
  const [wrapper , setWrapper] = useState(false)

  // const [refText , setRefText] = useState(`It seems like the world is growing more and more interested in Juliette Freire.`)
  const [refText , setRefText] = useState(``)

  const handleBoolCheckbox = useState(true)
  const [boolCheckbox, setBoolCheckbox] = handleBoolCheckbox

  const handleBoolCheckboxArea = useState(false)
  const [boolCheckboxArea] = handleBoolCheckboxArea

  let handleBool = { handleBoolCheckbox,handleBoolCheckboxArea}
  
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

  function changeText(){
    
    handleBool = {
      handleBoolCheckbox,handleBoolCheckboxArea
    }

    resetTextCursor(handleBool)
    
    const textWrapper = document.querySelector('.textarea-wrapper').value
    setRefText(textWrapper)

    setTranslateConfig()
    
    toggleWrapper()
  }

  function closerUpdateInput (){
    handleBool = {
      handleBoolCheckbox,handleBoolCheckboxArea
    }
    return updateInput(handleBool)
  }

  function closerToggleChackbox(){
    setBoolCheckbox(!boolCheckbox)
  }

  function toggleWrapper(){
    !wrapper? setBoolCheckbox(false) : setBoolCheckbox(true)
    setWrapper ( !wrapper)
  }

  return (
    <>
      <div className='header'>
        <div className='header-content'>
          <h1>
            T typing
          </h1>
          <div className='checkbox-area' hidden= {boolCheckboxArea}>
            <input type='checkbox' id='checkWrite' onClick={closerToggleChackbox} checked = {boolCheckbox}/>Ativar digitação
            <textarea  id='typing-textarea' onChange={closerUpdateInput} />
          </div>
        </div>
      </div>
      <div className='main'>

        <div className='translate-area'>
          {/* It seems like the world is growing more and more interested in Juliette Freire, an anonymous woman who has been gaining lots of attention.It seems like the world is growing more and more interested in Juliette Freire, an anonymous woman who has been gaining lots of attention.It seems like the world is growing more and more interested in Juliette Freire, an anonymous woman who has been gaining lots of attention. */}
        </div>

        <div className='base-textarea'>
          {refText.length > 0 ? changeStringToArray(refText).map((char,index)=> createSpan(char,index)):<div/>}
        </div>
        <div className='btn-add-text' onClick={toggleWrapper}>
          Add Text
        </div>
      
      </div>
        {wrapper? 
        <Wrapper toggleWrapper = {toggleWrapper} changeText= {changeText}/> : <div/>}
    </>
  )
}