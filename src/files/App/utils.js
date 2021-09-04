/* eslint-disable import/no-anonymous-default-export */
  
let cursor = 0
let currentChar = ''

const translateInTextarea = initDebounce(2000)

export default {
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
  
  async updateInput(){
    
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
      const ckbox = document.querySelector('#checkWrite')
      const ckboxArea = document.querySelector('.checkbox-area')
      ckbox.checked = false
      ckboxArea.hidden = true
      alert('Finalizado')
    }

    translateInTextarea({text: hiddenTextarea.value})
  }
}


function initDebounce(timeOutin=3000){

  let time
  let processingTranslation = false

  return async (data = {text:'',from:'en',to:'pt'})=>{
    if(!processingTranslation){
      processingTranslation = true
      clearTimeout(time)
      time = setTimeout(async ()=>{
        console.log('Traduziu')
       
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
      console.log('res.body', resJson.translated_text)
  
      processingTranslation = false
      },timeOutin)
    }
  }
}