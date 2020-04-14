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
        this.gearSet = gearSet || new GearSet();
        this.buffs = buffs || new Buffs();
        this.target = target || new Target();
    }

    handOneAvgStats(){
        return {cRatio: 0, pDif: 0, critPdif: 0, hitRate: 0, fStr: 0, damage: 0, critRate: 0, enSpell: 0, relicAdd: 0, empyreanAdd: 0}
    }

    handTwoAvgStats(){
        return {cRatio: 0, avgPdif: 0, avgCritPdif: 0, hitRate: 0, fStr: 0, damage: 0, critRate: 0, enSpell: 0}
    }

    throwingAvgStats(){
        return {cRatio: 0, critCratio: 0, hitRate: 0, fStr: 0, damage: 0, tpPerHit: 0}
    }

    attackRoundStats(){
        let localHitsOne = 0
        let localHitsTwo = 0
        let localShurikenHits = 0
        let localHasteTotal = (1024 - 256 - 307)/1024
        let localDualWield = (1 - (35/100))
        let mainHandHitRate = .99
        let offHandHitRate = .95
        let rangedHitRate = .95
        let hitSpread = {
            four: (this.player.stats.quadrupleAttack/100),
            three: ((1 - this.player.stats.quadrupleAttack/100)*(this.player.stats.tripleAttack/100)),
            two: ((1- this.player.stats.quadrupleAttack/100)*(1 - this.player.stats.tripleAttack/100)*(this.player.stats.doubleAttack/100)),
            one: ((1- this.player.stats.quadrupleAttack/100)*(1 - this.player.stats.tripleAttack/100)*(1 - this.player.stats.doubleAttack/100))
        }
        // getMagicalHaste() + getGearHaste() + getAbilityHaste()
        let localDelay = (localDualWield)*(this.gearSet.gear.mainHand.delay + this.gearSet.gear.offHand.delay)*(localHasteTotal)
        localHitsOne = (0*(1-mainHandHitRate))+(1*mainHandHitRate*hitSpread.one)+(2*mainHandHitRate*hitSpread.two)+(3*mainHandHitRate*hitSpread.three)+(4*mainHandHitRate*hitSpread.four)+(5*mainHandHitRate*0)+(6**mainHandHitRate*0)+(7*mainHandHitRate*0)+(8*mainHandHitRate*0)
        localHitsTwo = (0*(1-offHandHitRate))+(1*offHandHitRate*hitSpread.one)+(2*offHandHitRate*hitSpread.two)+(3*offHandHitRate*hitSpread.three)+(4*offHandHitRate*hitSpread.four)+(5*offHandHitRate*0)+(6**offHandHitRate*0)+(7*offHandHitRate*0)+(8*offHandHitRate*0)
        localShurikenHits = (1*rangedHitRate*(this.player.stats.daken/100))
        return {hitsHandOne: parseFloat(localHitsOne.toFixed(4),10),
                hitsHandTwo: parseFloat(localHitsTwo.toFixed(4), 10), 
                hitsShuriken: parseFloat(localShurikenHits.toFixed(4), 10), 
                delay: parseFloat(localDelay.toFixed(2), 10)}
    }

    getHitSpread(){
        // Needs 
        //  -Player Stats (multi-hit)
        //  -COR Fighter's Roll (DA)
        //  -Weapons with OAx
        //  -AM with multi-hit
        //  -Needs Shuriken/Daken proc rate (Test hit order with daken and OA8-kclub)
        let mainHitSpread = {
            eight: 0,
            seven: 0,
            six: 0,
            five: 0,
            four: 0,
            three: 0,
            two: 0,
            one: 0,
        }
        let offHitSpread = {}
        return (mainHitSpread, offHitSpread)
    }
    wsAvgs(){
        // Needs
        //  -Cycle Stats (Base TP Rounds)
        //  -Player stats (cRatio, multi-hit spread)
        //  -Target Stats (cRatio)
        return {avgTp: 0, avgWsDamage: 0}
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