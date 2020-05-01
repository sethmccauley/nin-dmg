//import * as mobs from './datafiles/mobs.json'
import Buffs from './pojo/buffs.js';
import Player from './pojo/player.js';
import PlayStyle from './pojo/playstyle.js';
import GearSet from './pojo/gearset.js';
import Target from './pojo/target.js';

class Calculator {
    constructor(player, playStyle, gearSet, buffs, target){
        this.player = player || new Player();
        this.playStyle = playStyle || new PlayStyle();
        this.gearSets = gearSet || {"tp": new GearSet(),"ws": new GearSet()}
        this.buffs = buffs || new Buffs();
        this.target = target || new Target();
    }

    playerAndGear(set){
        let storeTp = this.player.storeTp + set.storeTp + (this.buffs.buffs.cor.samuraiRoll ? this.buffs.buffs.cor.samuraiValue : 0) + (this.buffs.buffs.self.kakkaIchi ? 10 : 0)
        let quadAttack = set.quadAttack
        let tripleAttack = set.tripleAttack
        let doubleAttack = set.doubleAttack + this.player.doubleAttack + (this.buffs.buffs.cor.fighterRoll ? this.buffs.buffs.cor.fighterValue : 0)
        let daken = this.player.daken + this.player.dakenBonus + set.daken
        return {storeTp, quadAttack, tripleAttack, doubleAttack, daken}
    }

    handOneAvgStats(set){
        //let cRatio=0;
        let avgPdif=0;
        let avgCritPdif=0;
        let hitRate=0.99;
        let hitSpread= this.getHitSpread(set)
        let avgHits=0;
        let fStr=0;
        let avgDamage=0;
        let critRate=0;
        let enSpell=0;
        let relicAdd=0;
        let empyreanAdd=0;
        avgHits = (0*(1-hitRate))+(1*hitRate*hitSpread.one)+(2*hitRate*hitSpread.two)+(3*hitRate*hitSpread.three)+(4*hitRate*hitSpread.four)+(5*hitRate*0)+(6**hitRate*0)+(7*hitRate*0)+(8*hitRate*0)
        return {avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell, relicAdd, empyreanAdd}
    }

    handTwoAvgStats(set){
        //let cRatio=0;
        let avgPdif=0;
        let avgCritPdif=0;
        let hitRate=0.95;
        let hitSpread= this.getHitSpread(set)
        let avgHits=0;
        let fStr=0;
        let avgDamage=0;
        let critRate=0;
        let enSpell=0;
        avgHits = (0*(1-hitRate))+(1*hitRate*hitSpread.one)+(2*hitRate*hitSpread.two)+(3*hitRate*hitSpread.three)+(4*hitRate*hitSpread.four)+(5*hitRate*0)+(6**hitRate*0)+(7*hitRate*0)+(8*hitRate*0)
        return {avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell}
    }

    throwingAvgStats(){
        if(this.gearSets.tp.gear.ammo.type !== 'shuriken') return {avgPdif: 0, avgCritPdif: 0, hitRate: 0, avgHits: 0, avgDamage: 0, tpPerHit: 0}
        let avgPdif = 0
        let avgCritPdif = 0
        let hitRate = .95
        let daken = this.player.daken + this.player.dakenBonus + this.gearSets.tp.daken
        let tpPerHit = 0
        let avgHits = (1*hitRate*(daken/100))
        return {avgPdif, avgCritPdif, hitRate, avgHits, avgDamage: 0, tpPerHit}
    }

    attackRoundStats(){
        let localHandOne = this.handOneAvgStats(this.gearSets.tp)
        let localHandTwo = this.handTwoAvgStats(this.gearSets.tp)
        let localShurikenHits = this.throwingAvgStats()
        // let localHasteTotal = (1024 - 256 - 448)/1024
        let localHasteTotal2 = (256 + 448)/1024
        let localDualWield = (1 - (35/100))

        // getMagicalHaste() + getGearHaste() + getAbilityHaste()
        let localDelay = Math.max((localDualWield)*(this.gearSets.tp.gear.mainhand.delay + this.gearSets.tp.gear.offhand.delay)*(1-localHasteTotal2), (this.gearSets.tp.gear.mainhand.delay+this.gearSets.tp.gear.offhand.delay)*.2)
        
        return {hitsHandOne: parseFloat(localHandOne.avgHits.toFixed(4),10),
                hitsHandTwo: parseFloat(localHandTwo.avgHits.toFixed(4), 10), 
                hitsShuriken: parseFloat(localShurikenHits.avgHits.toFixed(4), 10), 
                delay: parseFloat(localDelay.toFixed(2), 10)}
    }

    getHitSpread(set){
        // Needs 
        //  -Player Stats (multi-hit)
        //  -COR Fighter's Roll (DA)
        //  -Weapons with OAx
        //  -AM with multi-hit
        //  -Needs Shuriken/Daken proc rate (Test hit order with daken and OA8-kclub)
        // let mainHitSpread = {
        //     eight: 0,
        //     seven: 0,
        //     six: 0,
        //     five: 0,
        //     four: 0,
        //     three: 0,
        //     two: 0,
        //     one: 0,
        // }
        let globalDoubleAttack = this.player.doubleAttack + set.doubleAttack + (this.buffs.buffs.cor.fighterRoll ? this.buffs.buffs.cor.fighterValue : 0)
        let globalTripleAttack = this.player.tripleAttack + set.tripleAttack
        let globalQuadAttack = this.player.quadAttack + set.quadAttack
        let hitSpread = {
            four: parseFloat((globalQuadAttack/100),10),
            three: parseFloat(((1 - globalQuadAttack/100)*(globalTripleAttack/100)),10),
            two: parseFloat(((1- globalQuadAttack/100)*(1 -globalTripleAttack/100)*(globalDoubleAttack/100)),10),
            one: parseFloat(((1- globalQuadAttack/100)*(1 - globalTripleAttack/100)*(1 - globalDoubleAttack/100)),10)
        }
        // let offHitSpread = {}
        return (hitSpread)
    }
    wsAvgs(){
        // Needs
        //  -Cycle Stats (Base TP Rounds)
        //  -Player stats (cRatio, multi-hit spread)
        //  -Target Stats (cRatio)
        return {avgWsDamage: 0, wsMod: 0, avgTpReturn: 0}
    }

    cycleStats(){
        // Needs
        //  -Hit Spread
        //  -PlayStyle (Min TP Use)
        //  -Player Stats (Multi-Hit etc)
        //  -Buffs (Delay Reduction/Multi-Hit)
        return {baseTpRounds: 0, baseTpTime: 0}
    }
}

export default Calculator;