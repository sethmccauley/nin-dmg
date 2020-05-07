import React from 'react';

class PlayerComp extends React.Component {
    render() {
        const { config, update } = this.props
        return(
            <div className="w3-content w3-round">
                <div className='w3-row'>
                    <div className='w3-content w3-half w3-left-align w3-padding'>
                        
                        <div className='w3-third'>
                            <label> <b>Race: </b></label>
                            <select className='w3-select' name='race' id='race' defaultValue={config.race} onChange={(e) => update(e)}>
                                <option value='hume'>Hume</option>
                                <option value='mithra'>Mithra</option>
                                <option value='galka'>Galka</option>
                                <option value='tarutaru'>Tarutaru</option>
                                <option value='elvaan'>Elvaan</option>
                            </select>
                            <br />
                        </div>
                        <div className='w3-third'>
                            <label><b>Level:</b> </label>
                            <input type='number' style={{marginTop: '3px'}} className='w3-input w3-animate-input' max='99' min='1' defaultValue={config.level} id='level' onChange={(e) => update(e)}></input>
                        </div>
                        <div className='w3-third'>
                            <label><b>SubJob:</b> </label><select className='w3-select' id='subJob' name='subJob' defaultValue={config.subJob} onChange={(e) => update(e)}>
                                <option value='warrior'>Warrior</option>
                            </select>
                        </div>

                        <b>Merits:</b> <br />
                        <div className='w3-row-padding'>
                            <div className='w3-quarter'>
                                <label><b>STR:</b> </label><input type='number' className='w3-input' max='15' min='0' id='strMerits' defaultValue={config.strMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>DEX:</b> </label><input type='number' className='w3-input' max='15' min='0' id='dexMerits' defaultValue={config.dexMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>AGI:</b> </label><input type='number' className='w3-input' max='15' min='0' id='agiMerits' defaultValue={config.agiMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>VIT:</b> </label><input type='number' className='w3-input' max='15' min='0' id='vitMerits' defaultValue={config.vitMerits} onChange={(e) => update(e)}></input>
                            </div>
                        </div>
                        <div className='w3-row-padding'>
                            <div className='w3-quarter'>
                                <label><b>MND:</b> </label><input type='number' className='w3-input' max='15' min='0' id='mndMerits' defaultValue={config.mndMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>CHR:</b> </label><input type='number' className='w3-input' max='15' min='0' id='chrMerits' defaultValue={config.chrMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>INT:</b> </label><input type='number' className='w3-input' max='15' min='0' id='intMerits' defaultValue={config.intMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Crit %:</b> </label><input type='number' className='w3-input' max='5' min='0' id='critMerits' defaultValue={config.critMerits} onChange={(e) => update(e)}></input>
                            </div>
                        </div>
                        <div className='w3-row-padding'>
                            <div className='w3-quarter'>
                                <label><b>Throwing:</b> </label><input type='number' className='w3-input' max='16' min='0' id='throwingSkillMerits' defaultValue={config.throwingSkillMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Katana:</b> </label><input type='number' className='w3-input' max='16' min='0' id='katanaSkillMerits' defaultValue={config.katanaSkillMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Dagger:</b> </label><input type='number' className='w3-input' max='16' min='0' id='daggerSkillMerits' defaultValue={config.daggerSkillMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Sword:</b> </label><input type='number' className='w3-input' max='16' min='0' id='swordSkillMerits' defaultValue={config.swordSkillMerits} onChange={(e) => update(e)}></input>
                            </div>
                        </div>
                        <div className='w3-row-padding'>
                            <div className='w3-quarter'>
                                <label><b>Sange:</b> </label><input id='sangeMerits' type='number' className='w3-input' max='5' min='0' defaultValue={config.sangeMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Innin:</b> </label><input id='inninMerits' type='number' className='w3-input' max='5' min='0' defaultValue={config.inninMerits < 6 ? config.inninMerits : 5} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Blade: Shun</b> </label><input id='bladeShunMerits' type='number' className='w3-input' max='5' min='0' defaultValue={config.bladeShunMerits < 6 ? config.bladeShunMerits: 5} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Job Points:</b> </label><input id='jobPoints' type='number' className='w3-input' max='2100' min='0' defaultValue={config.jobPoints < 2101 ? config.jobPoints: 2100} onChange={(e) => update(e)}></input>
                            </div>
                        </div>
                        <hr style={{border: '1px dashed teal'}}/>
                        <b>Job Points:</b><br />
                        <label><b>Innin:</b> </label><input id='inninJobPoints' type='number' className='w3-input' style={{width: '25%'}} max='20' min='0' defaultValue={config.inninJobPoints < 21 ? config.inninJobPoints : 20 } onChange={(e) => update(e)}></input>
                    </div>
                    <div className='w3-content w3-half w3-border-left w3-right-align w3-padding'>
                        <h3>Stat Summary-</h3>
                        <div className='w3-half w3-right-align'>
                            <p>
                                <b>HP:</b> {config.hp}<br />
                                <b>STR:</b> {config.str}<br />
                                <b>DEX:</b> {config.dex}<br />
                                <b>AGI:</b> {config.agi}<br />
                                <b>VIT:</b> {config.vit}<br />
                                <b>CHR:</b> {config.chr}<br />
                                <b>MND:</b> {config.mnd}<br />
                                <b>INT:</b> {config.int}<br />
                                <b>Crit%:</b> {config.critMerits}<br />
                            </p>
                        </div>
                        <div className='w3-half w3-right-align'>
                            <p>
                                <b>Katana Skill:</b> {config.katanaSkill}<br />
                                <b>Dagger Skill:</b> {config.daggerSkill}<br />
                                <b>Sword Skill:</b> {config.swordSkill}<br />
                                <b>Throwing Skill:</b> {config.throwingSkill}<br />
                                <b>{config.bladeShunMerits > 0 ? 'Blade: Shun: ' : ''}</b>{config.bladeShunMerits > 0 ? config.bladeShunMerits : ''}<br />
                                <b>{config.sangeMerits > 0 ? 'Sange: ' : ''}</b>{config.sangeMerits > 0 ? config.sangeMerits : ''}<br />
                                <b>{config.jobPoints > 10 ? 'P.Attack (Gift):' : '' }</b> {config.jobPoints > 10 ? config.pAttackBonus : '' }<br />
                                <b>{config.jobPoints > 30 ? 'P.Accuracy (Gift):' : '' }</b> {config.jobPoints > 30 ? config.pAccuracyBonus : '' }<br />
                                <b>{config.jobPoints > 150 ? 'Daken+ (Gift):' : '' }</b> {config.jobPoints > 150 ? config.dakenBonus : '' }<br />
                                <b>{config.jobPoints > 150 ? 'WSDmg (Gift):' : '' }</b> {config.jobPoints > 150 ? config.wsDmgBonus : '' }<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerComp;