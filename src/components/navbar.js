import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        const { setCurrent, activeIndex, save, load } = this.props
        return (
            <div>
                <div className="w3-bar" style={{marginBottom: '16px'}}>
                    <div className="w3-bar-item">
                        <div className={"w3-bar-item nav-div" + (activeIndex === 1 ? ' selected' : '')} id="playerNav" onClick={() => setCurrent(1)}>Player</div>
                        <div className={"w3-bar-item nav-div" + (activeIndex === 2 ? ' selected' : '')} id="styleNav" onClick={() => setCurrent(2)}>Style</div>
                        <div className={"w3-bar-item nav-div" + (activeIndex === 3 ? ' selected' : '')} id="gearNav" onClick={() => setCurrent(3)}>Gear</div>
                        <div className={"w3-bar-item nav-div" + (activeIndex === 4 ? ' selected' : '')} id="dataNav" onClick={() => setCurrent(4)}>Data</div>
                    </div>
                    <div className="w3-bar-item" style={{float: 'right'}}>
                        <button onClick={() => save()} className="w3-button w3-bar-item w3-animate w3-round w3-hover-light-blue" style={{border: '1px solid rgb(41, 128, 185)', margin: '0 6px',fontWeight: '500',height: '39px'}}>Save</button>
                        <input type="file" onClick={(e) => e.target.value = null} onChange={(e) => load(e)} className="w3-input w3-bar-item w3-small w3-animate w3-round w3-hover-light-blue" style={{height: '39px',width: '230px',border: '1px solid rgb(41, 128, 185)', margin: '0 6px',fontWeight: '500'}} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar
