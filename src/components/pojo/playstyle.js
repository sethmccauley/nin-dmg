export default class PlayStyle {
    constructor(){
        this.afterMath = {
            keepActive: false,
            relic: false,
            mythic: false,
            empyrean: false
        }
        this.weaponSkill = {
            name: '',
            gearset: {}
        }
        this.tp = {
            overRounds: .5,
            saveTP: 0,
            minimumTP: 1000,
            gearset: {}
        }
    }
}