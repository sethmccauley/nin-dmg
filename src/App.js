import React from 'react';
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
import gear from './components/datafiles/gear.json';
import weaponsList from './components/datafiles/weapons.json';
import TestComp from './components/testComp';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: new Player(),
      buffs: new Buffs(),
      gearsets: [],
      playStyle: [],
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

  addGearSet = (setName) => {
    let {gearsets} = this.state
    gearsets.push(new GearSet())
    this.setState({
      gearsets: gearsets
    })
  }

  addPlayStyle = (styleName) => {
    if(styleName === '') return
    let {playStyle} = this.state
    let usedName = playStyle.findIndex(value => value.name === styleName)
    if(usedName !== -1) return

    playStyle.push(new PlayStyle(styleName))
    this.setState({
      playStyle: playStyle
    })
  }

  arrowFunctions = (e) => {
    const {current} = this.state;
    // Left Arrow
    if(e.keyCode === 37){
      if(current < 2) return
      this.prevStep()
    }
    // Right Arrow
    if(e.keyCode === 39){
      if(current > 5) return
      this.nextStep()
    }
  }

  componentDidMount(){
    document.body.addEventListener('keydown', (e) => {
      if(document.activeElement === document.body) {
        this.arrowFunctions(e)
      }
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
        console.log('Gear Change: ', e.target.id, e.target.value )
        //gearSets[e.target.id] = e.target.value;
        //gearSets.getTotals()
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
    const { player, playStyle, gearsets, buffs, data } = this.state
    switch(step){
      case 1:
        return <PlayerComp config={player} update={this.handleChange('player')} />
      case 2:
        return <PlayStyleComp config={player} style={playStyle} buffs={buffs} createStyle={this.addPlayStyle} update={this.handleChange('playStyle')}/>
      case 3:
        return <GearSetsComp config={gearsets} style={playStyle} update={this.handleChange('gearSets')} gearList={gear} weapons={weaponsList} />
      case 4:
        return <DataComp config={data} />
      case 5:
        return <TestComp gearList={gear}/>
      default:
        return <PlayerComp />
    }
  }
  render(){
    const { current } = this.state;
    const mountThis = this.mountComponent(current)
    return (
    <div className="App">
      <header className="App-header">
        <div className="w3-content w3-section w3-threequarter" style={{minWidth: '600px'}}>
          <h2 className="w3-left-align" style={{fontWeight: '600', marginTop: '30px', marginBottom: '0px'}}>FFXI - Ninja Gearset Utility</h2>
          <p className="w3-left-align w3-medium" style={{margin: '0px'}}>"An expiriment." - Langly of Quetzalcoatl</p>
        </div>
      </header>
      <main className="App-main">
          <Previous action={() => this.prevStep()} step={current}/>
          <div className="w3-content w3-section w3-threequarter w3-border-black w3-round" style={{flex: '1',minWidth: '980px',minHeight: '500px', width: '100vw',order: '2'}}>
            {mountThis}
          </div>
          <Next action={() => this.nextStep()} step={current} />
      </main>
      <footer>
        <div className='w3-container'>
          <div id='footerSpacer' style={{height: '100px'}}></div>
        </div>
      </footer>
    </div>
    )
  }
}

export default App;
