import React from 'react';
import Home from './components/home';
import PlayerComp from './components/playercomp.js';
import PlayStyleComp from './components/playstylecomp.js';
import GearSetsComp from './components/gearsetscomp.js';
import DataComp from './components/datacomp.js';
import Calculator from './components/calculator.js';
import Previous from './components/previous.js';
import Next from './components/next.js';
import Buffs from './components/pojo/buffs.js';
import Player from './components/pojo/player.js';
import PlayStyle from './components/pojo/playstyle.js';
import GearSet from './components/pojo/gearset.js';
import Target from './components/pojo/target.js';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: new Player(),
      buffs: new Buffs(),
      gearset: new GearSet(),
      target: new Target(),
      playStyle: new PlayStyle(),
      damageModel: new Calculator(),
      current: 1
    }
  }

  nextStep = () => {
    const { current } = this.state;
    this.setState({
      current: current + 1
    })
  }

  prevStep = () => {
    const { current } = this.state;
    this.setState({
      current: current - 1
    })
  }

  handleChange = (obj) => e => {
    const { player, playStyle, gearSets, buffs, target } = this.state
    switch(obj){
      case 'player':
        player[e.target.id] = e.target.value;
        player.calculateBaseStats(player.race, player.subJob)
        player.calculateGiftBonus(player.jobPoints)
        this.setState({
          player: player
        })
        break
      case 'playStyle':
        playStyle[e.target.id] = e.target.value;
        break
      case 'gearSets':
        gearSets[e.target.id] = e.target.value;
        gearSets.getTotals()
        break
      default:
        this.setState({status: 'No Update.'})
    }
    let newModel = new Calculator(player, playStyle, gearSets, buffs, target)
    this.setState({
      damageModel: newModel,
    })
  }

  mountComponent(step){
    const { player, playStyle, gearSets, buffs, target, data } = this.state
    switch(step){
      case 1:
        return <Home />
      case 2:
        return <PlayerComp config={player} update={this.handleChange('player')} />
      case 3:
        return <PlayStyleComp config={{player, playStyle, target}} buffs={buffs} />
      case 4:
        return <GearSetsComp config={gearSets} />
      case 5:
        return <DataComp config={data} />
      default:
        return <Home />
    }
  }
  render(){
    const { current } = this.state;
    const mountThis = this.mountComponent(current)

    return (
    <div className="App">
      <header className="App-header">
        <div className="w3-content w3-section w3-threequarter" style={{minWidth: '600px'}}>
          <h2 className="w3-left-align" style={{fontWeight: '600', marginTop: '30px', marginBottom: '0px'}}>FFXI - Online Ninja Damage Calculator</h2>
          <p className="w3-left-align w3-medium" style={{margin: '0px'}}>"An expiriment." - Langly of Quetzalcoatl</p>
        </div>
      </header>
      <main className="App-main">
          <Previous action={() => this.prevStep()} step={current}/>
          <div className="w3-content w3-section w3-threequarter w3-border-black w3-round" style={{flex: '1',minWidth: '980px',minHeight: '500px', width: '100vw', height: '100vh',order: '2'}}>
            {mountThis}
          </div>
          <Next action={() => this.nextStep()} step={current} />
      </main>
      <footer>

      </footer>
    </div>
    )
  }
}

export default App;
