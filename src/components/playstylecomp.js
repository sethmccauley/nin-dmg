import React from 'react';

const aftermathTypes = ['Empyrean', 'Mythic', 'Relic']
const wsChoices = ["Blade: Rin", "Blade: Retsu", "Blade: Jin", "Blade: Ten", "Blade: Ku", "Blade: Shun", "Blade: Metsu", "Blade: Kamu", "Blade: Hi"]

class PlayStyleComp extends React.Component {
    render() {
        const { style, update, buffs, targets } = this.props;
        return(
            <div className="w3-container w3-round">
                <div className='w3-container w3-left-align'>

                    <div id="buffs"><h5><b>Buffs</b></h5>
                        <div className='w3-container'>
                            <div className='w3-left-align' style={{padding: '3px'}}>
                                <div className="w3-row-padding w3-light-grey w3-round-small" style={{padding: '4px'}}>
                                    <b>Self</b><br />
                                    <div className="w3-quarter">
                                        <input type="checkbox" className="checkBox" style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.self.kakkaIchi} label="Kakka: Ichi" id="self kakkaIchi" onChange={(e) => update(e)}/>Kakka: Ichi <br />
                                        <input type="checkbox" className="checkBox" style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.self.sange} label="Sange" id="self sange" onChange={(e) => update(e)}/>Sange <br />
                                        <input type="checkbox" className="checkBox" style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.self.innin} label="Innin" id="self innin" onChange={(e) => update(e)}/>Innin
                                    </div>
                                    <div className="w3-quarter">

                                    </div>
                                    <div className="w3-quarter">
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.subJob.berserk} label="Berserk" id="subJob berserk" onChange={(e) => update(e)}/>Berserk<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.subJob.aggressor} label="Aggressor" id="subJob aggressor" onChange={(e) => update(e)}/>Aggressor
                                    </div>
                                    <div className="w3-quarter">
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.subJob.hasteSamba} label="Haste Samba" id="subJob hasteSamba" onChange={(e) => update(e)}/>Haste Samba: <input className="w3-input w3-small" onChange={(e) => update(e)} type="number" id="subJob hasteSambaValue" min="0" max="5" label="Haste Samba" defaultValue={buffs.buffs.subJob.hasteSambaValue} style={{width:'50px',display:'inline',paddingLeft:'4px'}} />
                                    </div>
                                </div>
                                <div className="w3-row-padding w3-pale-blue w3-round-small w3-border" style={{padding: '4px'}}>
                                    <b>Mage</b><br />
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.mage.hasteOne} label="Haste One" id="mage hasteOne" onChange={(e) => update(e)}/>Haste One
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.mage.hasteTwo} label="Haste Two" id="mage hasteTwo" onChange={(e) => update(e)}/>Haste Two
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.mage.dia} label="Dia" id="mage dia" onChange={(e) => update(e)}/>Dia: <input className="w3-input w3-small" onChange={(e) => update(e)} type="number" id="mage diaValue" max="4" min="0" label="Dia Value" defaultValue={buffs.buffs.mage.diaValue} style={{width:'60px',display:'inline',paddingLeft:'4px'}} />
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.sch.embrava} label="SCH Embrava" id="sch embrava" onChange={(e) => update(e)}/>Embrava: <input className="w3-input w3-small" onChange={(e) => update(e)} type="number" id="sch embravaHaste" max="25.9" min="0" label="Embrava Haste" defaultValue={buffs.buffs.sch.embravaHaste} style={{width:'60px',display:'inline',paddingLeft:'4px'}} />
                                    </div>
                                </div>
                                <div className='w3-row-padding w3-light-grey w3-round-small' style={{padding: '4px'}}>
                                    <b>Bard</b><br />
                                    <div className="w3-quarter">
                                        Singing Skill: <input className="w3-input"  id="brd singingSkill" label="BRD: Singing Skill" type="number" defaultValue={buffs.buffs.brd.singingSkill} style={{width: '100px', marginLeft: '8px'}}/>
                                    </div>
                                    <div className="w3-quarter">
                                        Minuet +: <input className="w3-input" id="brd minuetPlus" max="8" min="0" label="Minuet +" defaultValue={buffs.buffs.brd.minuetPlus} style={{width: '50px', marginLeft: '5px'}} size='small' /> 
                                    </div>
                                    <div className="w3-quarter">
                                        March +: <input className="w3-input" id="brd marchPlus" max="7" min="0" label="March +" defaultValue={buffs.buffs.brd.marchPlus} style={{width: '50px', marginLeft: '5px'}} size='small' /> 
                                    </div>
                                    <div className="w3-quarter">
                                        Madrigal +: <input className="w3-input" id="brd madrigalPlus" max="9" min="0" label="Madrigal +" defaultValue={buffs.buffs.brd.madrigalPlus} style={{width: '50px', marginLeft: '5px'}} size='small' /> 
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.soulVoice} id="brd soulVoice" onChange={(e) => update(e)}/>Soul Voice<br />
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.minuetFive} id="brd minuetFive" onChange={(e) => update(e)}/>Valor Minuet V<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.minuetFour} id="brd minuetFour" onChange={(e) => update(e)}/>Valor Minuet IV<br /> 
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.minuetThree} id="brd minuetThree" onChange={(e) => update(e)}/>Valor Minuet III<br /> 
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.honorMarch} id="brd honorMarch" onChange={(e) => update(e)}/>Honor March <br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.victoryMarch} id="brd victoryMarch" onChange={(e) => update(e)}/>Victory March<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.advancingMarch} id="brd advancingMarch" onChange={(e) => update(e)}/>Advancing March
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.bladeMadrigal} id="brd bladeMadrigal" onChange={(e) => update(e)}/>Blade Madrigal<br />
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} checked={buffs.buffs.brd.swordMadrigal} id="brd swordMadrigal" onChange={(e) => update(e)}/>Sword Madrigal<br />
                                    </div>
                                </div>
                                <div className='w3-row-padding w3-pale-blue w3-round-small w3-border' style={{padding: '4px'}}>
                                    <b>COR</b><br />
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor fighterRoll" checked={buffs.buffs.cor.fighterRoll} onChange={(e) => update(e)}/>Fighter's<input className="w3-input" id="cor fighterValue" onChange={(e) => update(e)} type="number" defaultValue={buffs.buffs.cor.fighterValue} style={{width: '100px'}} />
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor samuraiRoll" checked={buffs.buffs.cor.samuraiRoll} onChange={(e) => update(e)}/>Samurai's<input className="w3-input" id="cor samuraiValue" onChange={(e) => update(e)} type="number" defaultValue={buffs.buffs.cor.samuraiValue} style={{width: '100px'}} />
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor chaosRoll" checked={buffs.buffs.cor.chaosRoll} onChange={(e) => update(e)}/>Chaos<input className="w3-input" id="cor chaosValue" onChange={(e) => update(e)} type="number" defaultValue={buffs.buffs.cor.chaosValue} style={{width: '100px'}} />
                                    </div>
                                    <div className="w3-quarter" style={{paddingTop: '12px'}}>
                                        <input type="checkbox" className="checkBox"  style={{padding:'5px',margin:'3px'}} id="cor hunterRoll" checked={buffs.buffs.cor.hunterRoll} onChange={(e) => update(e)}/>Hunter's<input className="w3-input" id="cor hunterValue" onChange={(e) => update(e)} type="number" defaultValue={buffs.buffs.cor.hunterValue} style={{width: '100px'}} />
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
                                <select className="w3-select" id='style mainWs' value={style.mainWs} onChange={(e) => update(e)} style={{width: '90%', marginLeft: '2px'}}>
                                    <option key='default' value='none'>Main WeaponSkill</option>
                                    {wsChoices.map((value, keyIndex) => { 
                                        return(<option key={keyIndex} value={value}>{value}</option>);
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