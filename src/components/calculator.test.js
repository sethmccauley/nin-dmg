import Calculator from "./calculator"
import Player from './pojo/player'
import GearSet from './pojo/gearset'
import PlayStyle from './pojo/playstyle'
import Buffs from './pojo/buffs'
import Target from './pojo/target'


test('Check calculator constructor and player defaults.', () => {
    // Huma 99 NIN/WAR
    let calculator = new Calculator()

    calculator.gearSets.tp.gear.mainhand = {"name": "Heishi Shorinken Aug","type": "katana", "combatSkill": 269, "accuracy": 30, "mAccuracy": 30, "mDamage": 186, "storeTp": 10, "tpBonus": 500, "damage": 166, "delay": 227, "bladeShunDamage": 0.1}
    calculator.gearSets.tp.gear.offhand = {"name": "Ochu Aug","type": "katana", "combatSkill": 242, "str": 22, "dex": 22, "vit": 12, "agi": 12, "int": 12, "mnd": 12, "chr": 12, "accuracy": 20, "rAccuracy": 20, "damage": 135, "delay": 227}
    calculator.gearSets.tp.gear.neck = {"name": "Ninja's Nodowa +2 (Aug)", "dex": 15, "agi": 15, "accuracy": 25, "rAccuracy": 25, "storeTp": 7, "daken": 25, "pdl": 0.10}
    calculator.gearSets.tp.gear.ammo = {"name": "Seki Shuriken", "type":"shuriken", "throwingSkill": 242, "attack": 13, "storeTp": 2, "damage": 101, "delay": 192}
    calculator.gearSets.tp.getTotal()
    calculator.player.doubleAttack = 22
    calculator.player.tripleAttack = 29
    calculator.player.quadAttack = 2

    expect(calculator.attackRoundStats()).toEqual({hitsHandOne: 1.7637, hitsHandTwo: 1.6924, hitsShuriken: .7505, delay: 92.22})

})