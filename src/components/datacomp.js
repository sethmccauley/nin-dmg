import React from 'react';
import Heading from './heading';

class DataComp extends React.Component {
    render() {
        const { model } = this.props
        const handOne = model.handOneAvgStats(model.gearSets.tp)
        const handTwo = model.handTwoAvgStats(model.gearSets.tp)
        const shuriken = model.throwingAvgStats(model.gearSets.tp)
        const multiStats = model.playerAndGear(model.gearSets.tp)
        const round = model.attackRoundStats()
        return(
            <div className="w3-container w3-round App-data">
                <Heading heading="Data Summary"/>
                <div className='w3-container w3-section'>
                    <div className='w3-left-align' style={{padding: '3px'}}>
                        <div className="w3-row-padding w3-light-grey w3-round-small" style={{padding: '4px'}}>
                            <h5 style={{margin: '0px 3px'}}><b>Attack Round Averages</b></h5>
                            <div className="w3-section">
                                TP Phase Totals:<br />
                                <span style={{margin: '0px 10px'}}><b>Store TP: </b>{multiStats.storeTp}</span> <span style={{margin: '0px 10px'}}><b>Quad Attack: </b>{multiStats.quadAttack}</span>
                                <span style={{margin: '0px 10px'}}><b>Triple Attack: </b>{multiStats.tripleAttack}</span><span style={{margin: '0px 10px'}}><b>Double Attack: </b>{multiStats.doubleAttack}</span>
                                <span style={{margin: '0px 10px'}}><b>Daken: </b>{multiStats.daken}</span><br />
                            </div>
                            <div className="w3-third">
                                <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                    <b>Hand One:</b><br />
                                    Avg. Non-Crit pDif: <br />
                                    Avg. Crit pDif: <br />
                                    Hit Rate: <br />
                                    Attack: <br />
                                    TP/Hit: <br />
                                    Hits/Round:<br />
                                </div>
                                <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                    <br />
                                    {handOne.avgPdif}<br />
                                    {handOne.avgCritPdif}<br />
                                    {handOne.hitRate * 100}%<br />
                                    <br />
                                    <br />
                                    {round.hitsHandOne}<br />
                                </div>
                            </div>

                            <div className="w3-third">
                                <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                    <b>Hand Two:</b><br />
                                    Avg. Non-Crit pDif: <br />
                                    Avg. Crit pDif: <br />
                                    Hit Rate: <br />
                                    Attack: <br />
                                    TP/Hit: <br />
                                    Hits/Round:<br />
                                </div>
                                <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                    <br />
                                    {handTwo.avgPdif}<br />
                                    {handTwo.avgCritPdif}<br />
                                    {handTwo.hitRate * 100}%<br />
                                    <br />
                                    <br />
                                    {round.hitsHandTwo}<br />
                                </div>
                            </div>

                            <div className="w3-third">
                                <div className="w3-half w3-right-align" style={{paddingRight: '3px'}}>
                                    <b>Throwing:</b><br />
                                    Avg. Non-Crit pDif: <br />
                                    Avg. Crit pDif: <br />
                                    Hit Rate: <br />
                                    Attack: <br />
                                    TP/Hit: <br />
                                    Hits/Round:<br />
                                </div>
                                <div className="w3-half w3-left-align" style={{paddingLeft: '3px'}}>
                                    <br />
                                    {shuriken.avgPdif}<br />
                                    {shuriken.avgCritPdif}<br />
                                    {shuriken.hitRate * 100}%<br />
                                    <br />
                                    <br />
                                    {shuriken.avgHits}<br />
                                </div>
                            </div>
                        </div>
                        <div className="w3-row-padding w3-pale-blue w3-round-small w3-border" style={{padding: '4px', marginTop: '8px'}}>
                            <h5 style={{margin: '0px 3px'}}><b>Cycle Round Averages (Minimum TP to WS: {model.playStyle.tp.minimumTp})</b></h5>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataComp;