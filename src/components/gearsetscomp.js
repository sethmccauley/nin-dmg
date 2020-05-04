import React from 'react'
import Heading from './heading'

class GearSetsComp extends React.Component {
    render() {
        const { weapons, gearList, update, config } = this.props;
        return(
            <div className="w3-container w3-round App-gearsets">
                <Heading heading="Gear Sets"/>
                <div className='w3-container w3-left-align'>
                    <hr style={{border: '1px dashed teal'}}/>
                    <div className="w3-row" id="set1">
                        <div id="tp1"><b>TP</b><br />
                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.mainhand.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='mainhand set1 tp'>
                                    <option key='default' value='none'>Mainhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue={config.tp.gear.offhand.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='offhand set1 tp'>
                                        <option key='default' value='none'>Offhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue={config.tp.gear.ranged.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ranged set1 tp'>
                                <option key='0' value=''>None</option>
                            </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue={config.tp.gear.ammo.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ammo set1 tp'>
                                    <option key='default' value='none'>Ammo</option>
                                    {gearList.ammo.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                            <select defaultValue={config.tp.gear.head.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='head set1 tp'>
                                    <option key='default' value='none'>Head</option>
                                    {gearList.head.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue={config.tp.gear.neck.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='neck set1 tp'>
                                    <option key='default' value='none'>Neck</option>
                                    {gearList.neck.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue={config.tp.gear.ear1.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear1 set1 tp'>
                                    <option key='default' value='none'>Left Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                            <select defaultValue={config.tp.gear.ear2.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear2 set1 tp'>
                                    <option key='default' value='none'>Right Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.body.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='body set1 tp'>
                                    <option key='default' value='none'>Body</option>
                                    {gearList.body.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.hands.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='hands set1 tp'>
                                    <option key='default' value='none'>Hands</option>
                                    {gearList.hands.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.ring1.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring1 set1 tp'>
                                    <option key='default' value='none'>Left Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.ring2.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring2 set1 tp'>
                                    <option key='default' value='none'>Right Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.back.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='back set1 tp'>
                                    <option key='default' value='none'>Back</option>
                                    {gearList.back.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.waist.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='waist set1 tp'>
                                    <option key='default' value='none'>Waist</option>
                                    {gearList.waist.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.legs.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='legs set1 tp'>
                                    <option key='default' value='none'>Legs</option>
                                    {gearList.legs.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.tp.gear.feet.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='feet set1 tp'>
                                    <option key='default' value='none'>Feet</option>
                                    {gearList.feet.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                        </div>
                        <br />
                        <div id="ws1"><b>WS</b><br />
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.mainhand.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='mainhand set1 ws'>
                                    <option key='default' value='none'>Mainhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.offhand.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='offhand set1 ws'>
                                    <option key='default' value='none'>Offhand</option>
                                    {weapons.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.ranged.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ranged set1 ws'>
                                <option key='0' value='None'>None</option>
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.ammo.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ammo set1 ws'>
                                    <option key='default' value='none'>Ammo</option>
                                    {gearList.ammo.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.head.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='head set1 ws'>
                                    <option key='default' value='none'>Head</option>
                                    {gearList.head.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.neck.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='neck set1 ws'>
                                    <option key='default' value='none'>Neck</option>
                                    {gearList.neck.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.ear1.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear1 set1 ws'>
                                    <option key='default' value='none'>Left Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.ear2.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ear2 set1 ws'>
                                    <option key='default' value='none'>Right Ear</option>
                                    {gearList.earrings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.body.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='body set1 ws'>
                                    <option key='default' value='none'>Body</option>
                                    {gearList.body.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.hands.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='hands set1 ws'>
                                    <option key='default' value='none'>Hands</option>
                                    {gearList.hands.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.ring1.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring1 set1 ws'>
                                    <option key='default' value='none'>Left Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.ring2.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='ring2 set1 ws'>
                                    <option key='default' value='none'>Right Ring</option>
                                    {gearList.rings.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>

                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.back.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='back set1 ws'>
                                    <option key='default' value='none'>Back</option>
                                    {gearList.back.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.waist.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='waist set1 ws1'>
                                    <option key='default' value='none'>Waist</option>
                                    {gearList.waist.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.legs.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='legs set1 ws'>
                                    <option key='default' value='none'>Legs</option>
                                    {gearList.legs.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                <select defaultValue={config.ws.gear.feet.name} style={{width: '99%'}} className='w3-select'
                                    onChange={(e) => update(e)} id='feet set1 ws'>
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