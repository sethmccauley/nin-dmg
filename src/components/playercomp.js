import React from 'react';
import Heading from './heading';

class PlayerComp extends React.Component {
    render() {
        const { config, update } = this.props
        return(
            <div className="w3-content w3-round App-player">
                <Heading heading="Player Configuration"/>
                <div className='w3-content w3-section w3-row'>
                    <div className='w3-content w3-col s6 m6 l6 w3-left-align w3-padding'>
                        <select className='w3-select' name='race' id='race' defaultValue={config.race} onChange={(e) => update(e)}>
                            <option value='hume'>Hume</option>
                            <option value='mithra'>Mithra</option>
                            <option value='galka'>Galka</option>
                            <option value='tarutaru'>Tarutaru</option>
                            <option value='elvaan'>Elvaan</option>
                        </select>
                        <br />
                        <div className='w3-row-padding'>
                            <div className='w3-third'>
                                <label><b>Level:</b> </label>
                                <input type='number' className='w3-input w3-animate-input' max='99' min='1' defaultValue={config.level} id='level' onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-half'>
                                <label><b>SubJob:</b> </label><select className='w3-select' id='subJob' name='subJob' defaultValue={config.subJob} onChange={(e) => update(e)}>
                                    <option value='warrior'>Warrior</option>
                                    <option value='dancer'>Dancer</option>
                                </select>
                            </div>
                        </div>
                        <hr style={{border: '1px dashed teal'}}/>
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
                                <label><b>Crit %:</b> </label><input type='number' className='w3-input' max='5' min='0' id='crit' defaultValue={config.crit} onChange={(e) => update(e)}></input>
                            </div>
                        </div>
                        <div className='w3-row-padding'>
                            <div className='w3-quarter'>
                                <label><b>Throwing:</b> </label><input type='number' className='w3-input' max='16' min='0' defaultValue='16'></input>
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
                                <label><b>Sange:</b> </label><input type='number' className='w3-input' max='5' min='0' id='sangeMerits' defaultValue={config.sangeMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Innin:</b> </label><input type='number' className='w3-input' max='5' min='0' id='inninMerits' defaultValue={config.inninMerits} onChange={(e) => update(e)}></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Blade: Shun</b> </label><input type='number' className='w3-input' max='5' min='0' defaultValue='5'></input>
                            </div>
                            <div className='w3-quarter'>
                                <label><b>Job Points:</b> </label><input type='number' className='w3-input' max='2100' min='0' defaultValue='2100'></input>
                            </div>
                        </div>
                        <hr style={{border: '1px dashed teal'}}/>
                        <b>Job Points:</b><br />
                        <label><b>Innin:</b> </label><input type='number' className='w3-input' style={{width: '25%'}} max='20' min='0' id='inninJobPoints' defaultValue={config.inninJobPoints} onChange={(e) => update(e)}></input>
                    </div>
                    <div className='w3-content w3-col s6 m6 l6 w3-border-left w3-right-align w3-padding'>
                        <h3>Stat Summary-</h3>
                        <div className='w3-half'>
                            <p>
                                <b>HP:</b> {config.hp}<br />
                                <b>STR:</b> {config.str}<br />
                                <b>DEX:</b> {config.dex}<br />
                                <b>AGI:</b> {config.agi}<br />
                                <b>VIT:</b> {config.vit}<br />
                                <b>CHR:</b> {config.chr}<br />
                                <b>MND:</b> {config.mnd}<br />
                                <b>INT:</b> {config.int}<br />
                                <b>Crit%:</b> {config.crit}<br />
                            </p>
                        </div>
                        <div className='w3-half'>
                            <p>
                                <b>Katana Skill:</b> {config.katanaSkill}<br />
                                <b>Dagger Skill:</b> {config.daggerSkill}<br />
                                <b>Sword Skill:</b> {config.swordSkill}<br />
                                <b>Throwing Skill:</b> {config.throwingSkill}<br />
                                <b>Blade: Shun:</b> {config.bladeShunMerits}<br />
                                <b>Sange:</b> {config.sangeMerits}<br />
                                <b>{config.jobPoints > 10 ? 'P.Attack (Gift):' : '' }</b> {config.jobPoints > 10 ? config.pAttackBonus : '' }<br />
                                <b>{config.jobPoints > 30 ? 'P.Accuracy (Gift):' : '' }</b> {config.jobPoints > 30 ? config.pAccuracyBonus : '' }<br />
                                <b>{config.jobPoints > 150 ? 'Daken+ (Gift):' : '' }</b> {config.jobPoints > 150 ? config.dakenBonus : '' }<br />
                                <b>{config.jobPoints > 150 ? 'WSDmg (Gift):' : '' }</b> {config.jobPoints > 150 ? config.wsdmgBonus : '' }<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerComp;