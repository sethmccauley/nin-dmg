import Calculator from "./calculator"
import Player from './pojo/player'
import GearSet from './pojo/gearset'
import PlayStyle from './pojo/playstyle'
import Buffs from './pojo/buffs'
import Target from './pojo/target'


test('Check constructors.', () => {
    let langly = new Player()
    let playStyle = new PlayStyle()
    let gearSet = new GearSet()
    let buffs = new Buffs()
    let target = new Target()

    let calculator = new Calculator(langly, playStyle, gearSet, buffs, target)

    calculator.gearSet.gear.mainhand = {"name": "Heishi Shorinken Aug","type": "katana", "combatSkill": 269, "accuracy": 30, "mAccuracy": 30, "mDamage": 186, "storeTp": 10, "tpBonus": 500, "damage": 166, "delay": 227, "bladeShunDamage": 0.1}
    calculator.gearSet.gear.offhand = {"name": "Ochu Aug","type": "katana", "combatSkill": 242, "str": 22, "dex": 22, "vit": 12, "agi": 12, "int": 12, "mnd": 12, "chr": 12, "accuracy": 20, "rAccuracy": 20, "damage": 135, "delay": 227}
    calculator.player.doubleAttack = 22
    calculator.player.tripleAttack = 33
    calculator.player.quadAttack = 2
    calculator.player.daken = 79


    expect(calculator.attackRoundStats()).toEqual({hitsHandOne: 1.8327, hitsHandTwo: 1.7587, hitsShuriken: .7505, delay: 132.85})

})