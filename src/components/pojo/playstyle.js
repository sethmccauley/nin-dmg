export default class PlayStyle {
    constructor(name){
        this.name = name;
        this.afterMath = {
            keepActive: false,
            relic: false,
            mythic: false,
            empyrean: false,
        }
        this.mainWs = '';
        this.tp = {
            overRounds: .5,
            saveTp: 0,
            minimumTp: 1000,
        }
        this.food = '';
        this.target = {}
    }
}