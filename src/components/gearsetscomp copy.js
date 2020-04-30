import React from 'react'
import Heading from './heading'

class GearSetsComp extends React.Component {
    render() {
        const { weapons, gearList, update } = this.props;
        return(
            <div className="w3-container w3-round App-gearsets">
                <Heading heading="Gear Sets"/>
                <div className='w3-container w3-left-align'>
                    <div className='w3-cyan w3-round-small' style={{width: '100%', paddingLeft: '5px'}} >
                        <h4><b style={{color: 'white'}}> Set #1 </b></h4>
                    </div>
                    <div className="w3-row" id="set1">
                        <div id="tp1"><b>TP</b><br />
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='mainhand set1 tp'>
                                    <option key='default' value='none'>Mainhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='offhand set1 tp'>
                                        <option key='default' value='none'>Offhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ranged set1 tp'>
                                <option key='0' value='None'>None</option>
                            </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ammo set1 tp'>
                                    <option key='default' value='none'>Ammo</option>
                                    {gearList.ammo.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='head set1 tp'>
                                    <option key='default' value='none'>Head</option>
                                    {gearList.head.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='neck set1 tp'>
                                    <option key='default' value='none'>Neck</option>
                                    {gearList.neck.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear1 set1 tp'>
                                    <option key='default' value='none'>Left Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear2 set1 tp'>
                                    <option key='default' value='none'>Right Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='body set1 tp'>
                                    <option key='default' value='none'>Body</option>
                                    {gearList.body.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='hands set1 tp'>
                                    <option key='default' value='none'>Hands</option>
                                    {gearList.hands.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring1 set1 tp'>
                                    <option key='default' value='none'>Left Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring2 set1 tp'>
                                    <option key='default' value='none'>Right Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='back set1 tp'>
                                    <option key='default' value='none'>Back</option>
                                    {gearList.back.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='waist set1 tp'>
                                    <option key='default' value='none'>Waist</option>
                                    {gearList.waist.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='legs set1 tp'>
                                    <option key='default' value='none'>Legs</option>
                                    {gearList.legs.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='feet set1 tp'>
                                    <option key='default' value='none'>Feet</option>
                                    {gearList.feet.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                        </div>
                        <div id="ws1"><b>WS</b><br />
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='mainhand set1 ws'>
                                    <option key='default' value='none'>Mainhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='offhand set1 ws'>
                                    <option key='default' value='none'>Offhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ranged set1 ws'>
                                <option key='0' value='None'>None</option>
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ammo set1 ws'>
                                    <option key='default' value='none'>Ammo</option>
                                    {gearList.ammo.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='head set1 ws'>
                                    <option key='default' value='none'>Head</option>
                                    {gearList.head.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='neck set1 ws'>
                                    <option key='default' value='none'>Neck</option>
                                    {gearList.neck.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear1 set1 ws'>
                                    <option key='default' value='none'>Left Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear2 set1 ws'>
                                    <option key='default' value='none'>Right Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='body set1 ws'>
                                    <option key='default' value='none'>Body</option>
                                    {gearList.body.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='hands set1 ws'>
                                    <option key='default' value='none'>Hands</option>
                                    {gearList.hands.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring1 set1 ws'>
                                    <option key='default' value='none'>Left Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring2 set1 ws'>
                                    <option key='default' value='none'>Right Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='back set1 ws'>
                                    <option key='default' value='none'>Back</option>
                                    {gearList.back.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='waist set1 ws1'>
                                    <option key='default' value='none'>Waist</option>
                                    {gearList.waist.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='legs set1 ws'>
                                    <option key='default' value='none'>Legs</option>
                                    {gearList.legs.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='feet set1 ws'>
                                    <option key='default' value='none'>Feet</option>
                                    {gearList.feet.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='w3-cyan w3-round-small' style={{width: '100%', paddingLeft: '5px'}} >
                        <h4><b style={{color: 'white'}}> Set #2 </b></h4>
                    </div>
                    <div className="w3-row" id="set2">
                        <div id="tp2"><b>TP</b><br />
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='mainhand set2 tp'>
                                    <option key='default' value='none'>Mainhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='offhand set2 tp'>
                                        <option key='default' value='none'>Offhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ranged set2 tp'>
                                <option key='0' value='None'>None</option>
                            </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ammo set2 tp'>
                                    <option key='default' value='none'>Ammo</option>
                                    {gearList.ammo.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='head set2 tp'>
                                    <option key='default' value='none'>Head</option>
                                    {gearList.head.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='neck set2 tp'>
                                    <option key='default' value='none'>Neck</option>
                                    {gearList.neck.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear1 set2 tp'>
                                    <option key='default' value='none'>Left Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear2 set2 tp'>
                                    <option key='default' value='none'>Right Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='body set2 tp'>
                                    <option key='default' value='none'>Body</option>
                                    {gearList.body.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='hands set2 tp'>
                                    <option key='default' value='none'>Hands</option>
                                    {gearList.hands.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring1 set2 tp'>
                                    <option key='default' value='none'>Left Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring2 set2 tp'>
                                    <option key='default' value='none'>Right Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='back set2 tp'>
                                    <option key='default' value='none'>Back</option>
                                    {gearList.back.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='waist set2 tp'>
                                    <option key='default' value='none'>Waist</option>
                                    {gearList.waist.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='legs set2 tp'>
                                    <option key='default' value='none'>Legs</option>
                                    {gearList.legs.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='feet set2 tp'>
                                    <option key='default' value='none'>Feet</option>
                                    {gearList.feet.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                        </div>
                        <div id="ws2"><b>WS</b><br />
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='mainhand set2 ws'>
                                        <option key='default' value='none'>Mainhand</option>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='offhand set2 ws'>
                                        <option key='default' value='none'>Offhand</option>
                                        {weapons.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='ranged set2 ws'>
                                    <option key='0' value='None'>None</option>
                                </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='ammo set2 ws'>
                                        <option key='default' value='none'>Ammo</option>
                                        {gearList.ammo.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>

                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='head set2 ws'>
                                        <option key='default' value='none'>Head</option>
                                        {gearList.head.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='neck set2 ws'>
                                        <option key='default' value='none'>Neck</option>
                                        {gearList.neck.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='ear1 set2 ws'>
                                        <option key='default' value='none'>Left Ear</option>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='ear2 set2 ws'>
                                        <option key='default' value='none'>Right Ear</option>
                                        {gearList.earrings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>

                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='body set2 ws'>
                                        <option key='default' value='none'>Body</option>
                                        {gearList.body.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='hands set2 ws'>
                                        <option key='default' value='none'>Hands</option>
                                        {gearList.hands.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='ring1 set2 ws'>
                                        <option key='default' value='none'>Left Ring</option>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='ring2 set2 ws'>
                                        <option key='default' value='none'>Right Ring</option>
                                        {gearList.rings.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>

                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='back set2 ws'>
                                        <option key='default' value='none'>Back</option>
                                        {gearList.back.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='waist set2 ws1'>
                                        <option key='default' value='none'>Waist</option>
                                        {gearList.waist.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='legs set2 ws'>
                                        <option key='default' value='none'>Legs</option>
                                        {gearList.legs.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                                <div className="w3-quarter">
                                    <select defaultValue='' style={{width: '99%'}} className='w3-select'
                                        onChange={(e) => update(e)} id='feet set2 ws'>
                                        <option key='default' value='none'>Feet</option>
                                        {gearList.feet.map((value, keyIndex) => { 
                                            return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                        })}
                                    </select>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GearSetsComp;