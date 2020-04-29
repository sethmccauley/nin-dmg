import React from 'react'
import Heading from './heading'
import { Select, InputLabel, FormControl } from '@material-ui/core'

class GearSetsComp extends React.Component {
    constructor(props) {
        super(props)
    }

    async getOptions(slot) {

    }

    render() {
        const { weapons, gearList } = this.props;
        return(
            <div className="w3-container w3-round App-gearsets">
                <Heading heading="Gear Sets"/>
                <div className='w3-container w3-left-align'>
                    <div className='w3-cyan w3-round-small' style={{width: '100%', paddingLeft: '5px'}} >
                        <h4><b style={{color: 'white'}}> Set #1 </b></h4>
                    </div>
                    <div className="w3-row" id="set1">
                        <div id="tp"><b>TP</b><br />
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='mainhand set1 tp'>Mainhand</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='mainhand set1 tp' displayEmpty>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='offhand set1 tp'>Offhand</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='offhand set1 tp'>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ranged set1 tp'>Ranged</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ranged set1 tp'>
                                        <option key='0' value=''>Empty</option>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ammo set1 tp'>Ammo</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ammo set1 tp'>
                                        {gearList.ammo.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='head set1 tp'>Head</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='head set1 tp'>
                                        {gearList.head.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='neck set1 tp'>Neck</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='neck set1 tp'>
                                        {gearList.neck.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ear1 set1 tp'>Left Ear</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ear1 set1 tp'>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ear2 set1 tp'>Right Ear</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ear2 set1 tp'>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='body set1 tp'>Body</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='body set1 tp'>
                                        {gearList.body.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='hands set1 tp'>Hands</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='hands set1 tp'>
                                        {gearList.hands.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ring1 set1 tp'>Left Ring</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ring2 set1 tp'>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ring2 set1 tp'>Right Ring</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ring2 set1 tp'>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='back set1 tp'>Back</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='back set1 tp'>
                                        {gearList.back.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='waist set1 tp'>Waist</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='waist set1 tp'>
                                        {gearList.waist.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='legs set1 tp'>Legs</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='legs set1 tp'>
                                        {gearList.legs.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='feet set1 tp'>Feet</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='feet set1 tp'>
                                        {gearList.feet.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div id="ws"><b>WS</b><br />
                        <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='mainhand set1 tp'>Mainhand</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='mainhand set1 tp' displayEmpty>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='offhand set1 tp'>Offhand</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='offhand set1 tp'>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ranged set1 tp'>Ranged</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ranged set1 tp'>
                                        <option key='0' value=''>Empty</option>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ammo set1 tp'>Ammo</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ammo set1 tp'>
                                        {gearList.ammo.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='head set1 tp'>Head</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='head set1 tp'>
                                        {gearList.head.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='neck set1 tp'>Neck</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='neck set1 tp'>
                                        {gearList.neck.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ear1 set1 tp'>Left Ear</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ear1 set1 tp'>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ear2 set1 tp'>Right Ear</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ear2 set1 tp'>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='body set1 tp'>Body</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='body set1 tp'>
                                        {gearList.body.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='hands set1 tp'>Hands</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='hands set1 tp'>
                                        {gearList.hands.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ring1 set1 tp'>Left Ring</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ring2 set1 tp'>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ring2 set1 tp'>Right Ring</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ring2 set1 tp'>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='back set1 tp'>Back</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='back set1 tp'>
                                        {gearList.back.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='waist set1 tp'>Waist</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='waist set1 tp'>
                                        {gearList.waist.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='legs set1 tp'>Legs</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='legs set1 tp'>
                                        {gearList.legs.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='feet set1 tp'>Feet</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='feet set1 tp'>
                                        {gearList.feet.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className='w3-cyan w3-round-small' style={{width: '100%', paddingLeft: '5px'}} >
                        <h4><b style={{color: 'white'}}> Set #2 </b></h4>
                    </div>
                    <div id="tp"><b>TP</b><br />
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='mainhand set1 tp'>Mainhand</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='mainhand set1 tp' displayEmpty>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='offhand set1 tp'>Offhand</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='offhand set1 tp'>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ranged set1 tp'>Ranged</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ranged set1 tp'>
                                        <option key='0' value=''>Empty</option>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ammo set1 tp'>Ammo</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ammo set1 tp'>
                                        {gearList.ammo.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='head set1 tp'>Head</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='head set1 tp'>
                                        {gearList.head.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='neck set1 tp'>Neck</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='neck set1 tp'>
                                        {gearList.neck.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ear1 set1 tp'>Left Ear</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ear1 set1 tp'>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ear2 set1 tp'>Right Ear</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ear2 set1 tp'>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='body set1 tp'>Body</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='body set1 tp'>
                                        {gearList.body.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='hands set1 tp'>Hands</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='hands set1 tp'>
                                        {gearList.hands.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ring1 set1 tp'>Left Ring</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ring2 set1 tp'>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ring2 set1 tp'>Right Ring</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ring2 set1 tp'>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='back set1 tp'>Back</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='back set1 tp'>
                                        {gearList.back.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='waist set1 tp'>Waist</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='waist set1 tp'>
                                        {gearList.waist.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='legs set1 tp'>Legs</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='legs set1 tp'>
                                        {gearList.legs.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='feet set1 tp'>Feet</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='feet set1 tp'>
                                        {gearList.feet.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div id="ws"><b>WS</b><br />
                        <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='mainhand set1 tp'>Mainhand</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='mainhand set1 tp' displayEmpty>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='offhand set1 tp'>Offhand</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='offhand set1 tp'>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ranged set1 tp'>Ranged</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ranged set1 tp'>
                                        <option key='0' value=''>Empty</option>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ammo set1 tp'>Ammo</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ammo set1 tp'>
                                        {gearList.ammo.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='head set1 tp'>Head</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='head set1 tp'>
                                        {gearList.head.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='neck set1 tp'>Neck</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='neck set1 tp'>
                                        {gearList.neck.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ear1 set1 tp'>Left Ear</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ear1 set1 tp'>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ear2 set1 tp'>Right Ear</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ear2 set1 tp'>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='body set1 tp'>Body</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='body set1 tp'>
                                        {gearList.body.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='hands set1 tp'>Hands</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='hands set1 tp'>
                                        {gearList.hands.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ring1 set1 tp'>Left Ring</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ring2 set1 tp'>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='ring2 set1 tp'>Right Ring</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='ring2 set1 tp'>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='back set1 tp'>Back</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='back set1 tp'>
                                        {gearList.back.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='waist set1 tp'>Waist</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='waist set1 tp'>
                                        {gearList.waist.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='legs set1 tp'>Legs</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='legs set1 tp'>
                                        {gearList.legs.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w3-quarter">
                                <FormControl style={{width: '99%'}}>
                                    <InputLabel id='feet set1 tp'>Feet</InputLabel>
                                    <Select defaultValue='' onChange={(e) => console.log(e.target.value)} style={{width: '99%'}} labelId='feet set1 tp'>
                                        {gearList.feet.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value}>{value.name}</option>);
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default GearSetsComp;