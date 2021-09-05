/* eslint-disable import/no-anonymous-default-export */

import React from 'react'
import './Wrapper.css'
import '../../baseStyles.css'

export default ( {toggleWrapper, changeText} )=>{

    // if(!hidden){
    

        return(
            <div className='wrapper'>
                <div className='translation-options-area'>
                    <div className='translation-option'>
                        Traduzir para:
                        <br/>
                        <select className='select-lang'>
                            <option>Inglês</option>
                            <option selected>Português</option>
                        </select>
                    </div>
                    <div className='translation-option'>
                        Texto em: 
                        <br/>
                        <select className='select-lang'>
                            <option>Inglês</option>
                            <option>Português</option>
                        </select>
                    </div>
                    
                </div> 
                <textarea className='textarea-wrapper'/>
                <div className='wrapper-btns'>
                    <div className='wrapper-btn' onClick={changeText}>Confirmar</div>
                    <div className='wrapper-btn' onClick={toggleWrapper}>Sair</div>
                </div>
            </div>
        )
    // }else{
    //     return(<div/>)
    // }
}