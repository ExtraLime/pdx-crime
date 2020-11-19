import React from 'react'

export default function Header() {
  return (
    <header>
        <div className="header-grid">
            <div className="header-logo">
                <h1 id='titletext'>PDX-CRIME-MAP</h1>
                
            </div>
            <nav className="main-nav">
                <ul>
                    <li className='nav-li' >
                        <a target="_blank" rel="noopener noreferrer" href="/">Home</a>
                    </li>
                    <li className='nav-li'>
                        <a href="/">About</a>
                    </li>
                    <li className= 'nav-li'>
                        <a href="https://github.com/ExtraLime/pdx-crime-maps" rel="noopener noreferrer" target="_blank">GitRepo</a>
                    </li>
                </ul>
            </nav>
            
        </div>
    </header>
  )
}
