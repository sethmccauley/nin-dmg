import { Player, PlayStyle, GearSet, Calculator, Buffs } from "./calculator"

test('Check constructors.', () => {
    let langly = new Player()
    let playStyle = new PlayStyle()
    let gearSet = new GearSet()
    let buffs = new Buffs()

    let calculator = new Calculator(langly, playStyle, gearSet, buffs)

    calculator.gearSet.gear.mainHand = {"type": "katana", "combatSkill": 269, "accuracy": 30, "mAccuracy": 30, "mdamage": 186, "storeTp": 10, "tpBonus": 500, "damage": 166, "delay": 227}
    calculator.gearSet.gear.offHand = {"type": "katana", "combatSkill": 242, "str": 22, "dex": 22, "vit": 12, "agi": 12, "int": 12, "mnd": 12, "chr": 12, "accuracy": 20, "rAccuracy": 20, "damage": 135, "delay": 227}
    calculator.player.stats.doubleAttack = 22
    calculator.player.stats.tripleAttack = 33
    calculator.player.stats.quadrupleAttack = 2
    calculator.player.stats.daken = 79


    expect(calculator.attackRoundStats()).toEqual({hitsHandOne: 1.8327, hitsHandTwo: 1.7587, hitsShuriken: .7505, delay: 132.85})

})