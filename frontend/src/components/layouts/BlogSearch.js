import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogSearch(){

    const navigate =useNavigate()

    const [keyword,setKeyword] =useState("")

    const searchHandler=(e)=>{
        e.preventDefault();
        navigate(`/search/${keyword}`)
        setKeyword("")
        
    }
    return(
        <form onSubmit={searchHandler}>
    <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Blog title..."
            onChange={(e)=>{setKeyword(e.target.value)}}
            value={keyword}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        </form>
        )
}