import React, { Component } from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import * as foods from './datafiles/food.json'
import * as targets from './datafiles/mobs.json'

export default class Style extends Component {
    render() {

        console.log(foods.default)
        return (
            <div>
                <h4><b>{this.props.title}</b></h4>
                <div className='w3-container'>
                    <div className='w3-half'>
                        <div className='w3-padding'>
                            <AutoComplete
                                size='small' 
                                options={foods.default} 
                                getOptionLabel={(food) => food.name}
                                style={{width: '100%'}}
                                openOnFocus={false}
                                renderInput={(params) => <TextField {...params} label='Food' />} 
                            />
                        </div>
                    </div>
                    <div className='w3-half'>
                        <div className='w3-padding'>
                            <AutoComplete
                                size='small' 
                                options={targets.default} 
                                getOptionLabel={(target) => target.name}
                                style={{width: '100%'}}
                                openOnFocus={false}
                                renderInput={(params) => <TextField {...params} label='Target' />} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
