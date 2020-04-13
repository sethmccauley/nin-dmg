import React from 'react';
import Home from './components/home';
import Player from './components/player';
import PlayStyle from './components/playstyle';
import Target from './components/target';
import GearSets from './components/gearsets';
import Data from './components/data.js';
import Calculator from './components/calculator';
import Previous from './components/previous';
import Next from './components/next';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

const model = new Calculator();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      damageModel: model,
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
    const { player, playStyle, gearSets, buffs, target } = this.state.damageModel
    switch(obj){
      case 'player':
        player[e.target.id] = e.target.value;
        player.calculateBaseStats(player.race, player.subJob)
      case 'playStyle':
        playStyle[e.target.id] = e.target.value;
      case 'gearSets':
        gearSets[e.target.id] = e.target.value;
        gearSets.getTotals()
      default:
        this.setState({status: 'No Update.'})
    }
    let newModel = new Calculator(player, playStyle, gearSets, buffs, target)
    this.setState({
      damageModel: newModel,
    })
  }

  mountComponent(step){
    const { player, playStyle, gearSets, buffs, target, data } = this.state.damageModel
    switch(step){
      case 1:
        return <Home />
      case 2:
        return <Player config={player} update={this.handleChange('player')} />
      case 3:
        return <PlayStyle config={player, playStyle} buffs={buffs} />
      case 4:
        return <Target config={target} />
      case 5:
        return <GearSets config={gearSets} />
      case 6:
        return <Data config={data} />
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
          <div className="w3-content w3-section w3-threequarter w3-border-black w3-round" style={{flex: '1',minWidth: '980px', width: '100vw', height: '100vh',order: '2'}}>
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
