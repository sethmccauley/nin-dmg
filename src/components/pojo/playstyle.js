import Buffs from './buffs';
import GearSet from './gearset';
import Target from './target';

export default class PlayStyle {
    constructor(name){
        this.name = name;
        this.afterMath = {
            keepActive: false,
            relic: false,
            mythic: false,
            empyrean: false,
            gearset: new GearSet()
        }
        this.mainWs = {
            name: '',
            gearset: new GearSet()
        }
        this.tp = {
            overRounds: .5,
            saveTp: 0,
            minimumTp: 1000,
            gearset: new GearSet()
        }
        this.buffs = new Buffs();
        this.food = '';
        this.target = new Target();
    }
}