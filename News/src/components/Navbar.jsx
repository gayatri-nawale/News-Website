import React,{useState} from 'react'

const Navbar = ({setcategory}) => {

  return (
    <div>
   <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
   <a className="navbar-brand" href="#">
      <img src="world-news.png" alt="Logo" width="50" height="50" className=" mx-3 d-inline-block align-text-top"/>

    </a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="nav-link active" aria-current="page"  onClick={()=>(setcategory("general"))}>Home</div>
        </li>
        <li className="nav-item">
          <div className="nav-link" onClick={()=>(setcategory("health"))}>Heath</div>
        </li>
       
        <li className="nav-item">
          <div className="nav-link"  onClick={()=>(setcategory("science"))}>Science</div>
        </li>
       
        <li className="nav-item">
          <div className="nav-link"  onClick={()=>(setcategory("sports"))}>Sports</div>
        </li>
       
        <li className="nav-item">
          <div className="nav-link"  onClick={()=>(setcategory("technology"))}>Technology</div>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
