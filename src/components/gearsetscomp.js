import React from 'react'
import Heading from './heading'
import { TextField } from '@material-ui/core'
import AutoComplete from '@material-ui/lab/Autocomplete'
import gear from './datafiles/gear.json'

class GearSetsComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            options: gear,
        }
        this.weaponsList = require('./datafiles/weapons.json')
    }

    getOptions(slot) {
        if(!this.state.options[slot]) return []
        return this.state.options[slot]
    }

    render() {
        return(
            <div className="w3-container w3-round App-gearsets">
                <Heading heading="Gear Sets"/>
                <div className='w3-container w3-left-align'>
                    <div className='w3-cyan w3-round-small' style={{width: '100%', paddingLeft: '5px'}} >
                        <h4><b style={{color: 'white'}}> Set #1 </b></h4>
                    </div>
                    <div className="w3-row" id="set1">
                        <div className="w3-quarter">
                            <AutoComplete id='mainHand' 
                                style={{width: '99%'}} 
                                options={this.weaponsList}  
                                getOptionSelected={(option, value) => option.name === value.name} 
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="MainHand Weapon" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='offHand' 
                                style={{width: '99%'}} 
                                options={this.weaponsList} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="OffHand Weapon" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='ranged' 
                                style={{width: '99%'}} 
                                options={[]} 
                                getOptionSelected={(option, value) => option.name === value.name} 
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Ranged" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='ammo' name='ammo' 
                                style={{width: '99%'}} 
                                options={this.getOptions('ammo')}
                                getOptionSelected={(option, value) => option.name === value.name} 
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Ammunition" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='head' 
                                style={{width: '99%'}} 
                                options={this.getOptions('head')} 
                                getOptionSelected={(option, value) => option.name === value.name} 
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Head" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='neck' 
                                style={{width: '99%'}} 
                                options={this.getOptions('neck')} 
                                getOptionSelected={(option, value) => option.name === value.name} 
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Neck" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='ear1' 
                                style={{width: '99%'}} 
                                options={this.getOptions('earrings')} 
                                getOptionSelected={(option, value) => option.name === value.name} 
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Left Ear" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='ear2' 
                                style={{width: '99%'}}  
                                options={this.getOptions('earrings')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Right Ear" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='body' 
                                style={{width: '99%'}}  
                                options={this.getOptions('body')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Body" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='hands' 
                                style={{width: '99%'}}  
                                options={this.getOptions('hands')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Hands" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='ring1' 
                                style={{width: '99%'}} 
                                options={this.getOptions('rings')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Left Ring" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='ring2' 
                                style={{width: '99%'}} 
                                options={this.getOptions('rings')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Right Ring" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='back' 
                                style={{width: '99%'}} 
                                options={this.getOptions('back')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} renderInput={(params) => <TextField {...params} label="Back" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='waist' 
                                style={{width: '99%'}} 
                                options={this.getOptions('waist')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Waist" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='legs' 
                                style={{width: '99%'}} 
                                options={this.getOptions('legs')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Legs" size='small' />} />
                        </div>
                        <div className="w3-quarter">
                            <AutoComplete id='feet' 
                                style={{width: '99%'}} 
                                options={this.getOptions('feet')} 
                                getOptionSelected={(option, value) => option.name === value.name}  
                                getOptionLabel={(option => option.name)} 
                                renderInput={(params) => <TextField {...params} label="Feet" size='small' />} />
                        </div>
                    </div>

                    <div className='w3-cyan w3-round-small' style={{width: '100%', paddingLeft: '5px'}} >
                        <h4><b style={{color: 'white'}}> Set #2 </b></h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default GearSetsComp;