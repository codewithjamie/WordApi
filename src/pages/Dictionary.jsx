import React, { useState, useEffect } from 'react'
import axios from "axios";

const Dictionary = () => {
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState(" ")
  const [value, setValue] = useState(" ")
  const user = JSON.stringify(localStorage.getItem('user'))

  const searchWord = async (e) => {
    e.preventDefault()    

    document.getElementById("showQuery").style.display = "block";

    let result = await fetch(`https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`, {
      method: "get",
      headers: {
        'X-RapidAPI-Key': 'dae002af71mshed54135171177cep109471jsn8b6b688c53bd',
        'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
      },            
    })
    result = await result.json()

    setValue(result);

    console.log(value);
  }

  return (
    <>
      <div className="px-3 py-2 border-bottom mb-3">
        <div className="container d-flex flex-wrap justify-content-center">
          <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
            <input type="search" className="form-control " name='word' onChange={(e) => setWord(e.target.value)} placeholder="Search..." aria-label="Search" />
          </form>

          <div className="text-center">
            <button type="button" className="btn btn-success text-white me-2" onClick={searchWord}>Go</button>
          </div>
        </div>
      </div>

         
      <div className='container' id='showQuery' style={{display: "none"}}>
        <div className="list-group w-auto">              
          <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">{value.word}</h6>
                <p className="mb-0 opacity-75">{value.definition}</p>
              </div>
              {
                localStorage.getItem('user') ?
              <>    
                <a href='javascript:;' key={user.id} className="opacity-50 text-nowrap">
                  Add as Favorite
                  { user.id }
                </a>
                </>
                  :
                <>
                  {/* <p>Search for Word </p> */}
                </>
              }
            </div>
          </div>                             
        </div>
      </div>
    </>
  )
}

export default Dictionary