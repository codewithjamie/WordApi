import React, { useEffect, useState } from 'react'
import './assets/list.css'
import { RiDeleteBinFill } from 'react-icons/ri'
import axios from 'axios'

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, SetFavorites] = useState(null);

  const url = 'http://localhost:8000/api/'
  
  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const { data: response } = await axios.get(`${url}get-favorites`);
        SetFavorites(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    const deleteData = async () => {
      setLoading(true)
      try {
        const { data: response } = await axios.delete(`${url}delete-favorite`);
        SetFavorites(response.data)
      }
      catch(error)
      {
        console.log(error)
      }
    }

    fetchData();
    deleteData();
  }, [])
  

  return (
    <div>      
      {
        localStorage.getItem('user') ?
        <>
          {loading && <div>Loading data ...</div>}
          {!loading && (
            <div className="list-group w-auto">
              {favorites.map(item => (
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                      <h6 className="mb-0">{item.title}</h6>
                      <p className="mb-0 opacity-75">{item.content}</p>
                    </div>
                    <a href='javascript:;' key={item.id} className="opacity-50 text-nowrap">
                      <RiDeleteBinFill size={30} style={{ color: "red"}}/>
                    </a>
                  </div>
                </div> 
              ))}
                
            </div>
          )}  
        </>
          :
        <>
          <p>Not Logged In</p>
        </>
      }              
    </div>
  )
}

export default Favorites
