import React from 'react';
import Heading from './heading';
import * as weapons from './datafiles/weapons.json';
import Set from '../components/set.js'

const weaponsList = []
for(let [key, values] of Object.entries(weapons.default)){
    weaponsList.push(key)
}

class GearSetsComp extends React.Component {
    

    render() {
        console.log(this.props)
        const gearCards = this.props.style.length > 0 ? this.props.style.map((gearset, i) => {
            return (
                <Set 
                    key={i} 
                    set={gearset}
                />
            )
        }) : ''
        return(
            <div className="w3-container w3-round App-gearsets">
                <Heading heading="4. Gear Sets"/>
                <div className='w3-container w3-left-align'>
                    <p>If no gearsets display, please generate a PlayStyle first.</p>
                    <hr style={{border: '1px dashed teal'}}/>
                    {gearCards}
                </div>
            </div>
        )
    }
}

export default GearSetsComp;