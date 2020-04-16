import React, { Component } from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import { TextField, Checkbox } from '@material-ui/core'

const aftermathTypes = ['Empyrean', 'Mythic', 'Relic']
const wsChoices = ["Blade: Rin", "Blade: Retsu", "Blade: Jin", "Blade: Ten", "Blade: Ku", "Blade: Shun", "Blade: Metsu", "Blade: Kamu", "Blade: Hi"]

export default class Style extends Component {
    render() {
        return (
            <div className='w3-container' style={{padding: '0px'}}>
                <div className='w3-cyan' style={{width: '100%', paddingLeft: '5px'}} >
                    <h4><b style={{color: 'white'}}> {this.props.title}</b></h4>
                </div>
                <div>
                    <div className='w3-section'>
                        <div className='w3-light-grey w3-round-small w3-left-align' style={{padding: '3px'}}>
                            <h5><b>Buffs</b></h5>
                            <div style={{padding: '2px'}}>
                                <Checkbox size="small" id="hasteTotal" label="Haste One" /> <TextField label="Magic Haste" size="small" defaultValue="30" style={{width: '100px'}} /> 
                                <Checkbox size="small" id="hasteSamba" /><TextField label="Haste Samba" size="small" defaultValue="10" style={{width: '100px'}} />
                                <Checkbox size="small" id="embrava" /><TextField label="Embrava Amt." size="small" defaultValue="25.9" style={{width: '100px'}} />
                                <Checkbox size="small" id="kakkaIchi" onChange={console.log('Changed')}/>Kakka: Ichi 
                                <Checkbox size="small" id="sange" onChange={console.log('Changed')}/>Sange
                                <Checkbox size="small" id="innin" onChange={console.log('change')} />Innin (Position Assumed.)
                            </div>
                            <div className='w3-pale-blue w3-round-small' style={{padding: '2px'}}>
                                <TextField label="BRD: Singing Skill" defaultValue="900" style={{width: '150px', marginLeft: '8px'}} size='small'/>
                                <TextField label="March +" defaultValue='7' style={{width: '75px', marginLeft: '5px'}} size='small' /> 
                                <Checkbox size="small" id="soulVoice" />Soul Voice<br />
                                <Checkbox size="small" id="honorMarch" />Honor March <Checkbox size="small" />Victory March <Checkbox size="small" />Advancing March <br />
                            </div>
                            <div style={{padding: '2px'}}>
                                <Checkbox size='small' id='fighterRoll' /><TextField label="Fighter's Roll DA" defaultValue="17" style={{width: '130px'}} />
                                <Checkbox size='small' id='samuraiRoll' /><TextField label="Samurai Roll STP" defaultValue="70" style={{width: '130px'}} />
                            </div>
                            <div className='w3-pale-blue w3-round-small' style={{padding: '2px'}}> 
                                <Checkbox size="small" id="aftermath" />Aftermath (Keep Active)
                                <AutoComplete id='aftermathWs' style={{width: '50%', marginLeft: '8px'}} options={aftermathTypes} renderInput={(params) => <TextField {...params} label="Aftermath WS" size='small' />} />
                                <AutoComplete id='mainWs' style={{width: '50%', marginLeft: '8px'}} options={wsChoices} renderInput={(params) => <TextField {...params} label="Main WS" size='small' />} />
                                <TextField size="small" id="overTpRounds" style={{marginLeft: '8px', width: '200px'}} defaultValue="0.5" label="Over TP Rounds" />
                                <TextField size="small" id="minimumTp" style={{marginLeft: '8px', width: '200px'}} defaultValue="1000" label="Minimum TP to WS" />
                                <TextField size="small" id="saveTp" style={{marginLeft: '8px', width: '200px'}} defaultValue="0" label="Save TP" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
