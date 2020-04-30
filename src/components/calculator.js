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
        let cRatio=0;
        let avgPdif=0;
        let avgCritPdif=0;
        let hitRate=0.99;
        let hitSpread= this.getHitSpread()
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

    handTwoAvgStats(){
        let cRatio=0;
        let avgPdif=0;
        let avgCritPdif=0;
        let hitRate=0.95;
        let hitSpread= this.getHitSpread()
        let avgHits=0;
        let fStr=0;
        let avgDamage=0;
        let critRate=0;
        let enSpell=0;
        avgHits = (0*(1-hitRate))+(1*hitRate*hitSpread.one)+(2*hitRate*hitSpread.two)+(3*hitRate*hitSpread.three)+(4*hitRate*hitSpread.four)+(5*hitRate*0)+(6**hitRate*0)+(7*hitRate*0)+(8*hitRate*0)
        return {avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell}
    }

    throwingAvgStats(){
        let hitRate = .95
        let daken = this.player.daken + this.gearSet.daken
        let tpPerHit = 0
        let avgHits = (1*hitRate*(daken/100))
        return {avgPdif: 0, avgCritPdif: 0, hitRate, avgHits, avgDamage: 0, tpPerHit}
    }

    attackRoundStats(){
        let localHandOne = this.handOneAvgStats()
        let localHandTwo = this.handTwoAvgStats()
        let localShurikenHits = this.throwingAvgStats()
        let localHasteTotal = (1024 - 256 - 307)/1024
        let localDualWield = (1 - (35/100))

        // getMagicalHaste() + getGearHaste() + getAbilityHaste()
        let localDelay = (localDualWield)*(this.gearSet.gear.mainhand.delay + this.gearSet.gear.offhand.delay)*(localHasteTotal)
        return {hitsHandOne: parseFloat(localHandOne.avgHits.toFixed(4),10),
                hitsHandTwo: parseFloat(localHandTwo.avgHits.toFixed(4), 10), 
                hitsShuriken: parseFloat(localShurikenHits.avgHits.toFixed(4), 10), 
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
        let hitSpread = {
            four: (this.player.quadAttack/100),
            three: ((1 - this.player.quadAttack/100)*(this.player.tripleAttack/100)),
            two: ((1- this.player.quadAttack/100)*(1 - this.player.tripleAttack/100)*(this.player.doubleAttack/100)),
            one: ((1- this.player.quadAttack/100)*(1 - this.player.tripleAttack/100)*(1 - this.player.doubleAttack/100))
        }
        let offHitSpread = {}
        return (hitSpread)
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