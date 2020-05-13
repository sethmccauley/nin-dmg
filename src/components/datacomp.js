import React from 'react';

class DataComp extends React.Component {
    render() {
        const { model } = this.props
        const handOne = model.handOneAvgStats(model.gearSets.tp)
        const handTwo = model.handTwoAvgStats(model.gearSets.tp)
        const shuriken = model.throwingAvgStats(model.gearSets.tp)
        const multiStats = model.getTpInfluences(model.gearSets.tp)
        const round = model.attackRoundStats(model.gearSets.tp, model.gearSets.ws)
        const wsAvgs = model.wsAvgs(model.gearSets.ws, round.avgTpFrom)
        return(
            <div className="w3-container w3-round">
                <div className='w3-container'>
                    <div className='w3-left-align' style={{padding: '3px', fontSize: '.9em'}}>

                        <div className="w3-row-padding w3-light-grey w3-round-small" style={{padding: '4px'}}>
                            <h5 style={{margin: '0px 3px'}}><b>Attack Round Averages</b></h5>
                            <div className="w3-section w3-row-padding">
                                <b>TP Phase Totals:</b><br />
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        Store TP: <br />
                                        Daken: <br />
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                        {multiStats.storeTp}<br />
                                        {multiStats.daken}<br />
                                    </div>
                                </div>
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        Quadruple Attack: <br />
                                        Triple Attack: <br />
                                        Double Attack: 
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                        {multiStats.quadAttack}<br />
                                        {multiStats.tripleAttack}<br />
                                        {multiStats.doubleAttack}
                                    </div>
                                </div>
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        {/* More Data Space for future pertinent fields */}
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w3-row-padding w3-light-grey w3-round-small" style={{paddingBottom: '10px'}}>
                            <div className="w3-third">
                                <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                    <b>Hand One:</b><br />
                                    Attack: <br />
                                    Avg. Non-Crit pDif: <br />
                                    Avg. Crit pDif: <br />
                                    Avg. Crit Rate: <br />
                                    Hit Rate: <br />
                                    TP/Hit: <br />
                                    Avg Hits/Round:<br />
                                    <b>Avg Damage/Hit:</b>
                                </div>
                                <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                    {model.isEmpty(model.gearSets.tp.gear.mainhand) ? 'H2H' : model.gearSets.tp.gear.mainhand.name}<br />
                                    {handOne.attack}<br />
                                    {handOne.avgPdif}<br />
                                    {handOne.avgCritPdif}<br />
                                    {handOne.critRate}%<br />
                                    {handOne.hitRate * 100}%<br />
                                    {round.tpPerHit}<br />
                                    {handOne.avgHits}<br />
                                    <b>{handOne.avgDamage}</b>
                                </div>
                            </div>

                            <div className="w3-third">
                                <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                    <b>Hand Two:</b><br />
                                    Attack: <br />
                                    Avg. Non-Crit pDif: <br />
                                    Avg. Crit pDif: <br />
                                    Avg. Crit Rate: <br />
                                    Hit Rate: <br />
                                    TP/Hit: <br />
                                    Avg Hits/Round:<br />
                                    <b>Avg Damage/Hit:</b>
                                </div>
                                <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                    {model.isEmpty(model.gearSets.tp.gear.offhand) ? '' : model.gearSets.tp.gear.offhand.name}<br />
                                    {handTwo.attack}<br />
                                    {handTwo.avgPdif}<br />
                                    {handTwo.avgCritPdif}<br />
                                    {handTwo.critRate}%<br />
                                    {handTwo.hitRate * 100}%<br />
                                    {round.tpPerHit}<br />
                                    {handTwo.avgHits}<br />
                                    <b>{handTwo.avgDamage}</b>
                                </div>
                            </div>

                            <div className="w3-third">
                                <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                    <b>Throwing:</b><br />
                                    Attack: <br />
                                    Avg. Non-Crit pDif: <br />
                                    Avg. Crit pDif: <br />
                                    Avg. Crit Rate: <br />
                                    Hit Rate: <br />
                                    TP/Hit: <br />
                                    Avg Hits/Round:<br />
                                    <b>Avg Damage/Hit:</b>
                                </div>
                                <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                    {model.isEmpty(model.gearSets.tp.gear.ammo) ? 'No Shuriken' : model.gearSets.tp.gear.ammo.name }<br />
                                    {shuriken.attack}<br />
                                    {shuriken.avgPdif}<br />
                                    {shuriken.avgCritPdif}<br />
                                    {shuriken.critRate}%<br />
                                    {shuriken.hitRate * 100}%<br />
                                    {round.shuriken}<br />
                                    {shuriken.avgHits}<br />
                                    <b>{shuriken.avgDamage}</b>
                                </div>
                            </div>
                        </div>
                        <div className="w3-right-align w3-light-grey w3-round-small" style={{paddingRight: '50px'}}>
                            <b>Avg Total Damage/Round: {(shuriken.avgDamage*shuriken.avgHits + handOne.avgDamage*handOne.avgHits + handTwo.avgDamage*handTwo.avgHits).toFixed(3)}</b>
                        </div>

                        <div className="w3-row-padding w3-pale-blue w3-round-small w3-border" style={{padding: '4px', marginTop: '8px'}}>
                            <h5 style={{margin: '0px 3px'}}><b>Cycle Round Averages (Minimum TP to WS: {model.playStyle.tp.minimumTp})</b></h5>
                            <div className="w3-section w3-row-padding">
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        Total Delay:<br />
                                        Delay Cap: <br />
                                        Delay w/Reduction: <br />
                                        <b>Melee DPS: </b>
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                        {round.totalDelay}<br />
                                        {round.delayCap}<br />
                                        {round.delay}<br />
                                        <b>{((shuriken.avgDamage*shuriken.avgHits + handOne.avgDamage*handOne.avgHits + handTwo.avgDamage*handTwo.avgHits)/(round.delay/60)).toFixed(3)}</b>
                                    </div>
                                </div>
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        <b>From 0TP to WS</b><br />
                                        Avg TP per Round: <br />
                                        Avg Rounds to WS: <br />
                                        Avg Time to WS: <br />
                                        Avg TP Total @ WS: 
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                        <br />
                                        {round.avgTpRnd}<br />
                                        {round.avgRoundsWs}<br />
                                        {((round.avgRoundsWs*round.delay)/60).toFixed(1)} Sec.<br />
                                        {round.avgTpAt}
                                    </div>
                                </div>
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        <b>From WS to WS</b><br />
                                        Avg WS-TP Return:<br />
                                        Avg Rounds to WS:<br />
                                        Avg Time to WS:<br />
                                        Avg TP Total @ WS:
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                        (Forced 2 Sec. Delay)<br />
                                        {wsAvgs.avgTpReturn}<br />
                                        {round.avgRoundsFrom}<br />
                                        {(((round.avgRoundsFrom*round.delay)+120)/60).toFixed(1)} Sec.<br />
                                        {round.avgTpFrom}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w3-row-padding w3-light-grey w3-round-small" style={{padding: '4px', marginTop: '8px'}}>
                            <h5 style={{margin: '0px 3px'}}><b>Weapon Skill Averages</b></h5>
                            <div className="w3-section w3-row-padding">
                                <b>Chosen WS: </b>{model.playStyle.mainWs.name ? model.playStyle.mainWs.name : ''}<br /><br />
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        Total WSC: <br />
                                        Avg. Hits/Mainhand: <br />
                                        Avg. Hits/Offhand: <br />
                                        Mainhand HitRate: <br />
                                        Offhand HitRate: 
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                        {wsAvgs.wsMod}<br />
                                        {wsAvgs.handOneAvgHits}<br />
                                        {wsAvgs.handTwoAvgHits}<br />
                                        {(wsAvgs.handOneAcc*100).toFixed(0)}%<br />
                                        {(wsAvgs.handTwoAcc*100).toFixed(0)}%
                                    </div>
                                </div>
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        Avg. TP on WS:<br />
                                        Avg. TP Return: <br />
                                        Avg. Mainhand pDif:<br />
                                        Avg. Offhand pDif:<br />
                                        WS Dmg+:<br />
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                        {wsAvgs.avgWsTpUse}<br />
                                        {wsAvgs.avgTpReturn}<br />
                                        {wsAvgs.handOnePdif}<br />
                                        {wsAvgs.handTwoPdif}<br />
                                        {wsAvgs.wsDamage}
                                    </div>
                                </div>
                                <div className="w3-third">
                                    <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                        TP Bonus: <br />
                                        Aeonic Bonus:<br />
                                        Relic Bonus:<br />
                                        Empyrean Bonus:<br />
                                        <b>Total Avg Damage:</b>
                                    </div>
                                    <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                        {wsAvgs.tpBonus}<br />
                                        {wsAvgs.aeonicBonus}%<br />
                                        {wsAvgs.relicBonus}%<br />
                                        {wsAvgs.empyreanBonus}%<br />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default DataComp;