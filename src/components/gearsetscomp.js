import React from 'react';
import Heading from './heading';
import TextField from '@material-ui/core/TextField'
import AutoComplete from '@material-ui/lab/Autocomplete'
import * as weapons from './datafiles/weapons.json';

const weaponsList = []
for(let [key, values] of Object.entries(weapons.default)){
    weaponsList.push(key)
}

class GearSetsComp extends React.Component {


    render() {
        return(
            <div className="w3-container w3-round App-gearsets">
                <Heading heading="4. Gear Sets"/>
                <div className='w3-container w3-left-align'>
                    <h4>Generate a new gear set named: <TextField /></h4>
                    
                    
                    <AutoComplete
                        options={weaponsList} 
                        style={{width: '300px'}} 
                        openOnFocus={false}
                        renderInput={(params) => <TextField {...params} label='Main Hand' />} 
                    />
                    
                </div>
            </div>
        )
    }
}

export default GearSetsComp;