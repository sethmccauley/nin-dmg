import React from 'react';
import PlayerComp from './components/playercomp.js';
import PlayStyleComp from './components/playstylecomp.js';
import GearSetsComp from './components/gearsetscomp.js';
import DataComp from './components/datacomp.js';
import Calculator from './components/calculator.js';
import Buffs from './components/pojo/buffs.js';
import Player from './components/pojo/player.js';
import GearSet from './components/pojo/gearset.js';
import Navbar from './components/navbar.js';
import skills from './components/datafiles/skills.json';
import gear from './components/datafiles/gear.json';
import mobs from './components/datafiles/mobs.json';
import weaponsList from './components/datafiles/weapons.json';
import './App.css';
import PlayStyle from './components/pojo/playstyle.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: new Player(),
      buffs: new Buffs(),
      gearSets: {
        tp: new GearSet(),
        ws: new GearSet()
      },
      playStyle: new PlayStyle(),
      damageModel: new Calculator(this.player, this.playStyle, this.gearSets, this.buffs, {}),
      current: 1
    }
  }

  nextStep = () => {
    const { current } = this.state;
    this.setState({
      current: current + 1
    })
  }

  setCurrent = (k) => {
    this.setState({
      current: k
    })
  }

  prevStep = () => {
    const { current } = this.state;
    this.setState({
      current: current - 1
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
      if(current > 3) return
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
        let buffChanges = e.target.id.split(' ')
        //Style Changes
        if(buffChanges[0] === 'style'){
          if(e.target.type === 'checkbox') {
            playStyle[buffChanges[1]][buffChanges[2]] = e.target.checked
          } else {
            if(buffChanges[1] === 'mainWs') {
              let getWs = skills[(gearSets.ws.gear.mainhand.type ? gearSets.ws.gear.mainhand.type : 'katana')].find((value) => {
                return value.name === e.target.value
              })
              if(this.state.damageModel.isEmpty(getWs)){
                getWs = {name: ''}
              }
              playStyle.mainWs = getWs
            } else if(buffChanges[1] === 'afterMath' && buffChanges[2] === 'type'){
              playStyle.afterMath.type = e.target.value;
            } else if(buffChanges[1] === 'target') {
              if(e.target.value === 'none') {
                playStyle.target = {name: 'none'} 
                break
              } 
              playStyle.target = mobs.find(value => value.name === e.target.value)
            } else 
              playStyle[buffChanges[1]][buffChanges[2]] = parseFloat(e.target.value || 0, 10)
          }
          break
        }
        //Buff Changes
        if(e.target.type === 'checkbox'){
          buffs.buffs[buffChanges[0]][buffChanges[1]] = e.target.checked
        } else {
          buffs.buffs[buffChanges[0]][buffChanges[1]] = parseFloat(e.target.value || 0, 10)
        }
        if(buffChanges[1] === 'hasteTwo' && e.target.checked === true) buffs.buffs.mage.hasteOne = false
        if(buffChanges[1] === 'hasteOne' && e.target.checked === true) buffs.buffs.mage.hasteTwo = false
        if(buffChanges[1] === 'distract' && e.target.checked === true) buffs.buffs.mage.distractTwo = false
        if(buffChanges[1] === 'distractTwo' && e.target.checked === true) buffs.buffs.mage.distract = false
        break
      case 'gearSets':
        let commands = e.target.id.split(' ')
        let foundItem = {}
        let wFlag = false
        if(commands[0] === 'mainhand' || commands[0] === 'offhand'){
          foundItem = weaponsList.find((value) => value.name === e.target.value)
          wFlag = true
        } else {
          let tempTable = commands[0]
          if(commands[0] === 'ring1' || commands[0] === 'ring2'){
            tempTable = 'rings'
          }
          if(commands[0] === 'ear1' || commands[0] === 'ear2'){
            tempTable = 'earrings'
          }
          foundItem = gear[tempTable].find((value) => value.name === e.target.value)
        }
        if(e.target.value === 'none') foundItem = {name: 'none'}
        gearSets[commands[2]].gear[commands[0]]= foundItem
        if(wFlag) gearSets[(commands[2] === 'tp') ? 'ws' : 'tp'].gear[commands[0]] = foundItem
        gearSets.tp.getTotal()
        gearSets.ws.getTotal()
        this.setState({
          gearSets: gearSets
        })
        break
      default:
        this.setState({status: 'No Update.'})
    }
    let newModel = new Calculator(player, playStyle, gearSets, buffs, target)
    this.setState({
      damageModel: newModel,
    })
  }

  save(){
    const {player, buffs, gearSets, playStyle} = this.state.damageModel
    const playerTransfer = ['jobPoints','race','level','subJob','food','critMerits','katanaSkillMerits','daggerSkillMerits','swordSkillMerits','throwingSkillMerits',
    'strMerits','dexMerits','agiMerits','vitMerits','mndMerits','chrMerits','sangeMerits','inninMerits','inninJobPoints','bladeShunmerits']

    let tempPlayerObject = {}
    playerTransfer.forEach((value) => {
      tempPlayerObject[value] = player[value]
    })
    let tempGearObject = {tp: {}, ws: {}}
    tempGearObject.tp = gearSets.tp.gear
    tempGearObject.ws = gearSets.ws.gear

    let tempModelObject = {'player': tempPlayerObject, 'buffs': buffs, 'gearSets': tempGearObject, 'playStyle': playStyle}
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tempModelObject))
    let anchorNode = document.createElement('a');
    anchorNode.setAttribute('href', dataStr);
    anchorNode.setAttribute('download', 'setup.json');
    document.body.appendChild(anchorNode);
    anchorNode.click();
    anchorNode.remove();
  }

  load(e){
    if(e.target.files.length < 1) return
    let file = e.target.files[0];
    let fr = new FileReader();
    fr.onload = (event) => {
      let result = JSON.parse(event.target.result)
      let newPlayer = new Player()
      let newBuffs = new Buffs()
      let newGearSets = {tp: new GearSet(),ws: new GearSet()}
      let newPlayStyle = new PlayStyle()
      if(result.player) {
        for(let key in result.player){
          newPlayer[key] = result.player[key]
        }
        newPlayer.calculateBaseStats(newPlayer.race, newPlayer.subJob)
        newPlayer.calculateGiftBonus(newPlayer.jobPoints)
      }
      if(result.buffs) {
        for(let key in result.buffs){
          for(let k in result.buffs[key]){
            Object.assign(newBuffs[key][k], result.buffs[key][k])
          }
        }
      }
      if(result.gearSets) {
        for(let key in result.gearSets){
          newGearSets[key]['gear'] = result.gearSets[key]
        }
        newGearSets.tp.getTotal()
        newGearSets.ws.getTotal()
      }
      if(result.playStyle) {
        for(let key in result.playStyle){
          newPlayStyle[key] = result.playStyle[key]
        }
      }
      let newCalc = new Calculator(newPlayer, newPlayStyle, newGearSets, newBuffs)
      this.setState({
        player: newPlayer,
        playStyle: newPlayStyle,
        gearSets: newGearSets,
        buffs: newBuffs,
        damageModel: newCalc
      })
    }
    fr.readAsText(file)
  }

  mountComponent(step){
    const { player, playStyle, gearSets, buffs, damageModel } = this.state
    switch(step){
      case 1:
        return <PlayerComp config={player} update={this.handleChange('player')} />
      case 2:
        return <PlayStyleComp 
                  gearSet={gearSets} 
                  style={playStyle} 
                  buff={buffs} 
                  targets={mobs} 
                  wsList={skills}
                  update={this.handleChange('playStyle')}
                />
      case 3:
        return <GearSetsComp 
                config={gearSets} 
                style={playStyle} 
                update={this.handleChange('gearSets')} 
                gearList={gear} 
                weapons={weaponsList} 
                model={damageModel}
              />
      case 4:
        return <DataComp model={damageModel} />
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
        <div className="w3-content w3-section bgImage" style={{minWidth: '700px',minHeight: '130px'}}>
          <h2 className="w3-left-align" style={{fontWeight: '600', marginTop: '30px', marginBottom: '0px'}}>FFXI - Ninja Gearset Utility</h2>
          <p className="w3-left-align w3-medium" style={{margin: '0px'}}>"An expiriment." - Langly of Quetzalcoatl</p>
        </div>
      </header>
      <main className="App-main">
        <div className="App-player w3-round-small" style={{minWidth: '980px', width: '980px',minHeight: '500px'}}>
          <Navbar activeIndex={current} setCurrent={(i) => this.setCurrent(i)} save={() => this.save()} load={(e) => this.load(e)}/>
          {mountThis}
        </div>
      </main>
      <footer>
        <div className='w3-container'>
          <div id='footerSpacer' style={{height: '20px'}}></div>
        </div>
      </footer>
    </div>
    )
  }
}

export default App;
