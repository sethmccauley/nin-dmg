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

    getMagicalHaste(){
        let total = 0
        // Need to Include Soul Voice effects and Geo Haste Effects
        total += (this.buffs.buffs.mage.hasteOne ? 150 : 0) + (this.buffs.buffs.mage.hasteTwo ? 307 : 0) + (this.buffs.buffs.sch.embrava ? this.buffs.buffs.sch.embravaHaste : 0) + 
            (this.buffs.buffs.brd.honorMarch ? 126 + Math.min(this.buffs.buffs.brd.marchPlus, 4)*12 : 0) +
            (this.buffs.buffs.brd.victoryMarch ? 163 + Math.min(this.buffs.buffs.brd.marchPlus, 8)*16.25 : 0) +
            (this.buffs.buffs.brd.advancingMarch ? 108 + Math.min(this.buffs.buffs.brd.marchPlus, 8)*10.75 : 0)
        total = total > 448 ? 448 : total
        return total
    }

    getEquipMentHaste(set){
        let total = 0
        total += set.haste
        total = total > 256 ? 256 : total
        return total
    }

    getTpInfluences(set){
        // Going to need OAx distributions and Follow-Up distributions
        let storeTp = this.getStoreTp(set)
        let quadAttack = set.quadAttack
        let tripleAttack = set.tripleAttack
        let doubleAttack = set.doubleAttack + this.player.doubleAttack + (this.buffs.buffs.cor.fighterRoll ? this.buffs.buffs.cor.fighterValue : 0)
        let daken = this.player.daken + this.player.dakenBonus + set.daken
        let magicalHaste = this.getMagicalHaste()
        let gearHaste = this.getEquipMentHaste(set)
        let jaHaste = (this.buffs.buffs.dnc.hasteSamba ? this.buffs.buffs.dnc.hasteSambaValue : 0 )
        return {storeTp, quadAttack, tripleAttack, doubleAttack, daken, magicalHaste, gearHaste, jaHaste}
    }

    getDualWield(set){
        let total = 0
        total += this.player.dualWield + set.dualWield
        return total
    }

    getStoreTp(set){
        let total = 0
        total += this.player.storeTp + set.storeTp + (this.buffs.buffs.cor.samuraiRoll ? this.buffs.buffs.cor.samuraiValue : 0) + (this.buffs.buffs.self.kakkaIchi ? 10 : 0)
        return total
    }

    calculateDelay(set){
        let delayCollection = {}
        let dwFlag = false
        let delayCut = 0
        if(this.isEmpty(set.gear.mainhand) && this.isEmpty(set.gear.offhand)){
            delayCollection.total = 480
            delayCut = delayCollection.total
        } else if (this.isEmpty(set.gear.offhand)){
            delayCollection.total = set.gear.mainhand.delay
            delayCut = delayCollection.total
        } else {
            delayCollection.total = set.gear.mainhand.delay + set.gear.offhand.delay
            dwFlag = true
            delayCut = delayCollection.total * (1- (this.getDualWield(set)/100))
        }
        delayCollection.cap = delayCollection.total * .20
        delayCollection.reduced = delayCut * (1 - ((this.getMagicalHaste() + this.getEquipMentHaste(set))/1024))
        
        delayCollection.tp = this.getTpPerHit(set, delayCut, dwFlag) 
        return delayCollection
    }

    getTpPerHit(set, delay, dwFlag){
        let perHandDelay = dwFlag ? delay / 2 : delay
        let storeTp = this.getStoreTp(set)
        let tpGained = {
            hit: 0,
            shuriken: 0,
        }
        if(perHandDelay <= 180) tpGained.hit = Math.floor(61 + ((perHandDelay - 180)*63/360), 1)
        if(perHandDelay > 180 && perHandDelay < 540) tpGained.hit = Math.floor(61 + ((perHandDelay - 180)*88/360), 1)
        if(!this.isEmpty(set.gear.ammo)) tpGained.shuriken = Math.floor(61 + ((set.gear.ammo.delay - 180)*88/360), 1)
        tpGained.hit = Math.floor(tpGained.hit + (tpGained.hit * (storeTp/100)), 1)
        tpGained.shuriken = Math.floor(tpGained.shuriken + (tpGained.shuriken * (storeTp/100)), 1)
        return tpGained
    }

    handOneAvgStats(set){
        let baseAttack= 8 + (set.gear.mainhand.type === 'katana' ? this.player.katanaSkill : 0) + 
            (set.gear.mainhand.type === 'dagger' ? this.player.daggerSkill : 0) +
            (set.gear.mainhand.type === 'sword' ? this.player.swordSkill : 0) + 
            (!this.isEmpty(set.gear.mainhand) ? set.gear.mainhand.combatSkill : 0 ) +
            this.player.str + this.player.pAttackBonus + set.attack + set.str
        // Multiplicative Boosts >> Berserk >> Geo Buffs >> COR Buffs >> Food
        let geoAttack=0;
        let berserkAttack= (this.player.subJob === 'warrior' && this.buffs.buffs.subJob.berserk) ? Math.floor(baseAttack*.25) : 0 ;
        let boostStr= this.buffs.buffs.whm.boostStr ? 25 : 0 ;
        let corAttack= this.buffs.buffs.cor.chaosRoll ? Math.floor(this.buffs.buffs.cor.chaosValue * baseAttack) : 0 ;
        let foodAttack=0;
        let attack=baseAttack + geoAttack + berserkAttack + boostStr + corAttack + foodAttack;
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
        avgHits = parseFloat(avgHits.toFixed(3), 10)
        return {attack, avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell, relicAdd, empyreanAdd}
    }

    handTwoAvgStats(set){
        if(!this.isEmpty(set.gear.mainhand) && this.isEmpty(set.gear.offhand)) return {avgPdif: 0, avgCritPdif: 0, hitRate: 0, avgHits: 0, avgDamage: 0, tpPerHit: 0}
        let baseAttack= 8 + (set.gear.mainhand.type === 'katana' ? this.player.katanaSkill : 0) + 
            (set.gear.offhand.type === 'dagger' ? this.player.daggerSkill : 0) +
            (set.gear.offhand.type === 'sword' ? this.player.swordSkill : 0) + 
            (!this.isEmpty(set.gear.offhand) ? set.gear.offhand.combatSkill : 0 ) +
            this.player.pAttackBonus + set.attack + Math.floor((set.str + this.player.str)*.5)
        // Multiplicative Boosts >> Berserk >> Geo Buffs >> COR Buffs
        let geoAttack=0;
        let berserkAttack= (this.player.subJob === 'warrior' && this.buffs.buffs.subJob.berserk) ? Math.floor(baseAttack*.25) : 0 ;
        let boostStr= this.buffs.buffs.whm.boostStr ? 25 : 0 ;
        let corAttack= this.buffs.buffs.cor.chaosRoll ? Math.floor(this.buffs.buffs.cor.chaosValue * baseAttack) : 0 ;
        let foodAttack=0;
        let attack=baseAttack + geoAttack + berserkAttack + boostStr + corAttack + foodAttack;
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
        avgHits = parseFloat(avgHits.toFixed(3), 10)
        return {attack, avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell}
    }

    throwingAvgStats(set){
        if(set.gear.ammo.type !== 'shuriken') return {avgPdif: 0, avgCritPdif: 0, hitRate: 0, avgHits: 0, avgDamage: 0, tpPerHit: 0}
        let avgPdif = 0
        let avgCritPdif = 0
        let hitRate = .95
        let daken = this.player.daken + this.player.dakenBonus + set.daken
        let tpPerHit = 0
        let avgHits = parseFloat((1*hitRate*(daken/100)).toFixed(3), 10)
        // Skill + 8, + 100% STR, + Sange Attk(relic body, no thanks) + berserk + Minuet Attack + Geo Attack + rAttackBonus(Gifts) + Gear rAttack 
        let attack = this.player.throwingSkill + set.gear.ammo.throwingSkill + 8
        attack += this.player.str + (this.buffs.buffs.brd.minuetFive ? 124 + (this.buffs.buffs.brd.minuetPlus*12.25) + 45 : 0) +
            (this.buffs.buffs.brd.minuetFour ? 112 + (this.buffs.buffs.brd.minuetPlus*11.25) + 45 : 0) +
            (this.buffs.buffs.brd.minuetThree ? 96 + (this.buffs.buffs.brd.minuetPlus*9.5) + 45 : 0) + this.player.rAttackBonus + 
            (this.buffs.buffs.brd.honorMarch ? 168 + (Math.min(this.buffs.buffs.brd.marchPlus, 4)*16) : 0)
        return {avgPdif, avgCritPdif, hitRate, avgHits , avgDamage: 0, tpPerHit, attack}
    }

    attackRoundStats(){
        let localHandOne = this.handOneAvgStats(this.gearSets.tp)
        let localHandTwo = this.handTwoAvgStats(this.gearSets.tp)
        let localShurikenHits = this.throwingAvgStats(this.gearSets.tp)
        let localDelay = this.calculateDelay(this.gearSets.tp)

        return {hitsHandOne: parseFloat(localHandOne.avgHits.toFixed(4),10),
                hitsHandTwo: parseFloat(localHandTwo.avgHits.toFixed(4), 10), 
                hitsShuriken: parseFloat(localShurikenHits.avgHits.toFixed(4), 10), 
                delay: parseFloat(localDelay.reduced.toFixed(2), 10),
                totalDelay: parseFloat(localDelay.total.toFixed(2), 10),
                delayCap: parseFloat(localDelay.cap.toFixed(2), 10),
                tpPerHit: parseFloat(localDelay.tp.hit.toFixed(2), 10),
                shuriken: parseFloat(localDelay.tp.shuriken.toFixed(2), 10)}
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

    isEmpty(el){
        if(el == null) return true
        if(el.name && el.name === 'none') return true
        if(typeof(el) === 'string') return el.length  === 0
        for(var key in el) if(el.hasOwnProperty(key)) return false
        return true
    }
}

export default Calculator;