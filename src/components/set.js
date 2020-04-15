import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import AutoComplete from '@material-ui/lab/Autocomplete'
import * as weapons from './datafiles/weapons.json';

const weaponsList = []
for(let [key, values] of Object.entries(weapons.default)){
    weaponsList.push(key)
}

export default class set extends Component {
    render() {
        return (
            <div>
                This is an equipment Set.
                <AutoComplete
                        size='small' 
                        options={weaponsList} 
                        style={{width: '200px'}} 
                        openOnFocus={false}
                        renderInput={(params) => <TextField {...params} label='Main Hand' />} 
                    />
            </div>
        )
    }
}
