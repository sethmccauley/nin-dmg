import React from 'react';
const aftermathTypes = ['Empyrean', 'Mythic', 'Relic']

class PlayStyleComp extends React.Component {
    render() {
        const { style, gearSet, update, buff, targets, wsList } = this.props;
        return(
            <div className="w3-container w3-round">
                <div className='w3-container w3-left-align'>

                    <div id="buffs"><h5><b>Buffs/Debuffs</b></h5>
                        <div className='w3-container'>
                            <div className='w3-left-align' style={{padding: '3px'}}>
                                <div className="w3-row-padding w3-light-grey w3-round-small" style={{padding: '4px'}}>
                                    <b>Self</b><br />
                                    <div className="w3-quarter">
                                        <input type="checkbox" className="checkBox" style={{padding:'5px',margin:'3px'}} checked={buff.buffs.self.kakkaIchi} label="Kakka: Ichi" id="self kakkaIchi" onChange={(e) => update(e)}/>Kakka: Ichi <br />
                                        <input type="checkbox" className="checkBox" style={{padding:'5px',margin:'3px'}} checked={buff.buffs.self.sange} label="Sange" id="self sange" onChange={(e) => update(e)}/>Sange <br />
                                        <input type="checkbox" className="checkBox" style={{padding:'5px',margin:'3px'}} checked={buff.buffs.self.innin} label="Innin" id="self innin" onChange={(e) => update(e)}/>Innin
                                    </div>
                                    <div className="w3-quarter">

                                    </div>
                                    <div className="w3-quarter">
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.subJob.berserk} label="Berserk" id="subJob berserk" onChange={(e) => update(e)}/>Berserk<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.subJob.aggressor} label="Aggressor" id="subJob aggressor" onChange={(e) => update(e)}/>Aggressor
                                    </div>
                                    <div className="w3-quarter">
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.subJob.hasteSamba} label="Haste Samba" id="subJob hasteSamba" onChange={(e) => update(e)}/>Haste Samba: <input className="w3-input w3-small" onChange={(e) => update(e)} type="number" id="subJob hasteSambaValue" min="0" max="5" label="Haste Samba" value={buff.buffs.subJob.hasteSambaValue} style={{width:'50px',display:'inline',paddingLeft:'4px'}} />
                                    </div>
                                </div>
                                <div className="w3-row-padding w3-pale-blue w3-round-small w3-border" style={{padding: '4px'}}>
                                    <b>Mage</b><br />
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.mage.hasteOne} label="Haste One" id="mage hasteOne" onChange={(e) => update(e)}/>Haste One<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.mage.hasteTwo} label="Haste Two" id="mage hasteTwo" onChange={(e) => update(e)}/>Haste Two
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.sch.embrava} label="SCH Embrava" id="sch embrava" onChange={(e) => update(e)}/>Embrava: <input className="w3-input w3-small" onChange={(e) => update(e)} type="number" id="sch embravaHaste" max="25.9" min="0" label="Embrava Haste" value={buff.buffs.sch.embravaHaste} style={{width:'60px',display:'inline',paddingLeft:'4px'}}></input>
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.mage.dia} label="Dia" id="mage dia" onChange={(e) => update(e)}/>Dia: <input className="w3-input w3-small" onChange={(e) => update(e)} type="number" id="mage diaValue" max="4" min="0" value={buff.buffs.mage.diaValue} style={{width:'60px',display:'inline',paddingLeft:'4px'}}></input><br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.mage.distract} label="Distract" id="mage distract" onChange={(e) => update(e)}/>Distract<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.mage.distractTwo} label="Distract Two" id="mage distractTwo" onChange={(e) => update(e)}/>Distract Two
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.whm.boostStr} label="Dia" id="whm boostStr" onChange={(e) => update(e)}/>Boost STR <br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.whm.boostDex} label="Dia" id="whm boostDex" onChange={(e) => update(e)}/>Boost DEX<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.whm.boostAgi} label="Dia" id="whm boostAgi" onChange={(e) => update(e)}/>Boost AGI
                                    </div>
                                </div>

                                <div className='w3-row-padding w3-light-grey w3-round-small' style={{padding: '4px'}}>
                                    <b>Bard</b><br />
                                    <div className="w3-quarter">
                                        Singing Skill: <input className="w3-input"  id="brd singingSkill" label="BRD: Singing Skill" type="number" onChange={(e) => update(e)} value={buff.buffs.brd.singingSkill} style={{width: '100px', marginLeft: '8px'}}/>
                                    </div>
                                    <div className="w3-quarter">
                                        Minuet +: <input className="w3-input" id="brd minuetPlus" max="8" min="0" label="Minuet +" value={buff.buffs.brd.minuetPlus}  onChange={(e) => update(e)} style={{width: '50px', marginLeft: '5px'}} size='small' /> 
                                    </div>
                                    <div className="w3-quarter">
                                        March +: <input className="w3-input" id="brd marchPlus" max="7" min="0" label="March +" value={buff.buffs.brd.marchPlus}  onChange={(e) => update(e)} style={{width: '50px', marginLeft: '5px'}} size='small' /> 
                                    </div>
                                    <div className="w3-quarter">
                                        Madrigal +: <input className="w3-input" id="brd madrigalPlus" max="9" min="0" label="Madrigal +" value={buff.buffs.brd.madrigalPlus}  onChange={(e) => update(e)} style={{width: '50px', marginLeft: '5px'}} size='small' /> 
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.soulVoice} id="brd soulVoice" onChange={(e) => update(e)}/>Soul Voice<br />
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.minuetFive} id="brd minuetFive" onChange={(e) => update(e)}/>Valor Minuet V<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.minuetFour} id="brd minuetFour" onChange={(e) => update(e)}/>Valor Minuet IV<br /> 
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.minuetThree} id="brd minuetThree" onChange={(e) => update(e)}/>Valor Minuet III<br /> 
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.honorMarch} id="brd honorMarch" onChange={(e) => update(e)}/>Honor March <br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.victoryMarch} id="brd victoryMarch" onChange={(e) => update(e)}/>Victory March<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.advancingMarch} id="brd advancingMarch" onChange={(e) => update(e)}/>Advancing March
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.bladeMadrigal} id="brd bladeMadrigal" onChange={(e) => update(e)}/>Blade Madrigal<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buff.buffs.brd.swordMadrigal} id="brd swordMadrigal" onChange={(e) => update(e)}/>Sword Madrigal<br />
                                    </div>
                                </div>

                                <div className='w3-row-padding w3-pale-blue w3-round-small w3-border' style={{padding: '4px'}}>
                                    <b>Corsair</b><br />
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor fighterRoll" checked={buff.buffs.cor.fighterRoll} onChange={(e) => update(e)}/>Fighter's<input className="w3-input" id="cor fighterValue" onChange={(e) => update(e)} type="number" value={buff.buffs.cor.fighterValue} style={{width: '90px'}} />
                                        </div>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor rogueRoll" checked={buff.buffs.cor.rogueRoll} onChange={(e) => update(e)}/>Rogue's<input className="w3-input" id="cor rogueValue" onChange={(e) => update(e)} type="number" value={buff.buffs.cor.rogueValue} style={{width: '90px'}} />
                                        </div>
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor samuraiRoll" checked={buff.buffs.cor.samuraiRoll} onChange={(e) => update(e)}/>Samurai's<input className="w3-input" id="cor samuraiValue" onChange={(e) => update(e)} type="number" value={buff.buffs.cor.samuraiValue} style={{width: '90px'}} />
                                        </div>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor alliesRoll" checked={buff.buffs.cor.alliesRoll} onChange={(e) => update(e)}/>Allies'<input className="w3-input" id="cor alliesValue" onChange={(e) => update(e)} type="number" value={buff.buffs.cor.alliesValue} style={{width: '90px'}} />
                                        </div>
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor chaosRoll" checked={buff.buffs.cor.chaosRoll} onChange={(e) => update(e)}/>Chaos<input className="w3-input" id="cor chaosValue" onChange={(e) => update(e)} type="number" value={buff.buffs.cor.chaosValue} style={{width: '90px'}} />
                                        </div>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor hunterRoll" checked={buff.buffs.cor.hunterRoll} onChange={(e) => update(e)}/>Hunter's<input className="w3-input" id="cor hunterValue" onChange={(e) => update(e)} type="number" value={buff.buffs.cor.hunterValue} style={{width: '90px'}} />
                                        </div>
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor tacticianRoll" checked={buff.buffs.cor.tacticianRoll} onChange={(e) => update(e)}/>Tactician's<input className="w3-input" id="cor tacticianValue" onChange={(e) => update(e)} type="number" value={buff.buffs.cor.tacticianValue} style={{width: '90px'}} />
                                        </div>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor miserRoll" checked={buff.buffs.cor.miserRoll} onChange={(e) => update(e)}/>Miser's<input className="w3-input" id="cor miserValue" onChange={(e) => update(e)} type="number" value={buff.buffs.cor.miserValue} style={{width: '90px'}} />
                                        </div>
                                    </div>
                                </div>

                                <div className='w3-row-padding w3-light-grey w3-round-small' style={{padding: '4px'}}>
                                    <b>Geomancer</b><br />
                                    <div className="w3-third" style={{paddingTop: '12px'}}>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="geo bolster" checked={buff.buffs.geo.bolster} onChange={(e) => update(e)}/>Bolster<br />
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="geo blazeOfGlory" checked={buff.buffs.geo.blazeOfGlory} onChange={(e) => update(e)}/>Blaze of Glory<br />
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="geo eclipticAttrition" checked={buff.buffs.geo.eclipticAttrition} onChange={(e) => update(e)}/>Ecliptic Attr.
                                        </div>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="geo haste" checked={buff.buffs.geo.haste} onChange={(e) => update(e)}/>Haste<input className="w3-input" id="geo hasteValue" onChange={(e) => update(e)} type="number" value={buff.buffs.geo.hasteValue} style={{width: '90px'}} />
                                        </div>
                                    </div>
                                    <div className="w3-third" style={{paddingTop: '12px'}}>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="geo frailty" checked={buff.buffs.geo.frailty} onChange={(e) => update(e)}/>Frailty<input className="w3-input" id="geo frailtyValue" onChange={(e) => update(e)} type="number" value={buff.buffs.geo.frailtyValue} style={{width: '90px'}} />
                                        </div>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="geo fury" checked={buff.buffs.geo.fury} onChange={(e) => update(e)}/>Fury<input className="w3-input" id="geo furyValue" onChange={(e) => update(e)} type="number" value={buff.buffs.geo.furyValue} style={{width: '90px'}} />
                                        </div>
                                    </div>
                                    <div className="w3-third" style={{paddingTop: '12px'}}>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="geo torpor" checked={buff.buffs.geo.torpor} onChange={(e) => update(e)}/>Torpor<input className="w3-input" id="geo torporValue" onChange={(e) => update(e)} type="number" value={buff.buffs.geo.torporValue} style={{width: '90px'}} />
                                        </div>
                                        <div className="w3-half">
                                            <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="geo precision" checked={buff.buffs.geo.precision} onChange={(e) => update(e)}/>Precision<input className="w3-input" id="geo precisionValue" onChange={(e) => update(e)} type="number" value={buff.buffs.geo.precisionValue} style={{width: '90px'}} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <br /><h5><b>WS</b></h5>
                        <div className='w3-row-padding w3-light-grey w3-round-small' style={{padding: '4px'}}>
                            <div className="w3-quarter">
                                <input type="checkbox" className="checkBox" value={style.afterMath.keepActive} size="small" id="style afterMath keepActive" onChange={(e) => update(e)}/>Aftermath Active<br />
                                <select className="w3-select" id='style afterMath type' value={style.afterMath.type}onChange={(e) => update(e)} style={{width: '90%', marginLeft: '2px'}}>
                                    <option key='default' value='none'>Aftermath Type</option>
                                    {aftermathTypes.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value}>{value}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="w3-quarter">
                                Main WeaponSkill:
                                <select className="w3-select" id='style mainWs' value={style.mainWs.name ? style.mainWs.name : 'none'} onChange={(e) => update(e)} style={{width: '90%', marginLeft: '2px'}}>
                                    <option key='default' value='none'>Main WeaponSkill</option>
                                    {wsList[(gearSet.ws.gear.mainhand.type ? gearSet.ws.gear.mainhand.type : 'katana')].map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value.name}>{value.name}</option>);
                                    })}
                                </select><br />
                            </div>
                            <div className="w3-quarter">
                            Over TP Rounds:<br />
                                <input className="w3-input" id="style tp overRounds" onChange={(e) => update(e)} style={{marginLeft: '2px', width: '200px'}} type="number" value={style.tp.overRounds} /><br />
                                Minimum TP:<br />
                                <input className="w3-input" id="style tp minimumTp" onChange={(e) => update(e)} style={{marginLeft: '2px', width: '200px'}} type="number" value={style.tp.minimumTp} /><br />
                            </div>
                            <div className="w3-quarter">
                                Save TP:<br />
                                <input className="w3-input" id="style tp saveTp" onChange={(e) => update(e)} style={{marginLeft: '2px', width: '200px'}} type="number" value={style.tp.saveTp} /><br />
                            </div>
                        </div>

                        <h5><b>Target</b></h5>
                        <div className='w3-row-padding w3-pale-blue w3-round-small' style={{padding: '4px'}}>
                            <div className="w3-quarter">
                                <select className="w3-select" id='style target' value={style.target.name} onChange={(e) => update(e)} style={{width: '90%', marginLeft: '2px'}}>
                                    <option key='default' value='none'>None</option>
                                    {targets.map((value, keyIndex) => { 
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

export default PlayStyleComp;