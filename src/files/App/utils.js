/* eslint-disable import/no-anonymous-default-export */

let cursor = 0
let currentChar = ''

const translateInTextarea = initDebounce()

const translatedOptions = initTranslateOptions()

const utils = {
  changeStringToArray(refText = ''){
      const arrayRefText =[]
      for(let char of refText){
          arrayRefText.push(char)
      }
      return arrayRefText
  },
  
  createSpan(char='' , index=''){
      const id = `char_${index}`
      return (<span id={id} className='span-char'>{char}</span>)
  },
  
  async updateInput(handleBool){
    
    const hiddenTextarea =document.querySelector('#typing-textarea')
    const baseTextarea = document.querySelector('.base-textarea')

    try{
      
      const spanChar = document.querySelector(`#char_${cursor}`)
      spanChar.classList.remove('bg-green')
      spanChar.classList.remove('bg-red')
      spanChar.classList.remove('bg-grey')

      cursor = hiddenTextarea.value.length === -1 ? 0 : hiddenTextarea.value.length 
      let currentHiddenChar = hiddenTextarea.value[hiddenTextarea.value.length -1] 
      
      if(currentChar === currentHiddenChar){
        
        spanChar.classList.add('bg-green')
      }else{
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
      
      utils.toggleCheckbox(handleBool, true)
      // alert('Finalizado')
    }
    const translateConf = {...translatedOptions.get(), text: hiddenTextarea.value}

    // console.log(translateConf)
    await translateInTextarea(translateConf, 
      // translateInTextarea
      )
  },

  toggleCheckbox(handleBool, hiddenCheckboxArea = false){
    
    if(handleBool !== undefined){

      const [,ckboxArea] = handleBool.handleBoolCheckboxArea
      if(hiddenCheckboxArea){
        ckboxArea( true )
      }else{
        ckboxArea( false )
      }

      const [boolCheckbox, setBoolcheckbox] = handleBool.handleBoolCheckbox
      setBoolcheckbox(!boolCheckbox)
    }
  },

  resetTextCursor(handleBool){

    resetCursor()
    clearHiddenTextarea()
    resetCursorColors()
    utils.toggleCheckbox(handleBool)

    function resetCursor(){
      cursor = 0
      currentChar = ''
    }

    function clearHiddenTextarea(){
      const hiddenTextarea = document.querySelector('#typing-textarea')
      hiddenTextarea.value = ''
    }

    function resetCursorColors(){
      const spans = document.querySelectorAll('span')
      spans.forEach(span=>{
      span.classList.remove('bg-green')
      span.classList.remove('bg-red')
      span.classList.remove('bg-grey')
    })
    }
  },

  setTranslateConfig(){

    const indexTo = document.querySelector('.translateTo').selectedIndex
    const valueTo = document.querySelector('.translateTo')[indexTo].value

    const indexFrom = document.querySelector('.translateFrom').selectedIndex
    const valueFrom = document.querySelector('.translateFrom')[indexFrom].value

    // config={'from':'en', 'to':'pt'}
    const config = {'from' : valueFrom, 'to': valueTo}

    translatedOptions.set(config)
  }
  
}

function initDebounce( timeout=200 ){

  let processedText
  let currentText
  let time
  let processingTranslation = false

  return async (data = {text:'',from:'en',to:'pt'} )=>{
    currentText = data.text
    clearTimeout(time)

    if(!processingTranslation && processedText !== currentText){
      processedText = currentText
      processingTranslation = true
      
       
      const res =  await fetch('http://localhost:8080/',{
        method: "POST",
        body: JSON.stringify(data),
        headers: { 
            "Content-Type": "application/json",
        },
      })
      const resJson = await res.json()
      const translatedText = resJson.translated_text

      document.querySelector('.translate-area').innerHTML = translatedText
    
      time = setTimeout( async ()=>{
        if(processedText !== currentText){
          const rData = {...data, text: currentText}
          await translateInTextarea(rData)
        }
        
      },timeout)

      processingTranslation = false
      
    }
  }
}

function initTranslateOptions(){
  const option = {
    'from' : 'en',
    'to': 'pt'
  }
  return{
    get(){
      return option
    },
    set(opt={from:'', to: ''}){
      option['from'] = opt['from']
      option['to'] = opt['to']
    }
  }
}

export default utils