import Buffs from './pojo/buffs.js';
import Player from './pojo/player.js';
import PlayStyle from './pojo/playstyle.js';
import GearSet from './pojo/gearset.js';

class Calculator {
    constructor(player, playStyle, gearSet, buffs, target){
        this.player = player || new Player();
        this.playStyle = playStyle || new PlayStyle();
        this.gearSets = gearSet || {"tp": new GearSet(),"ws": new GearSet()}
        this.buffs = buffs || new Buffs();
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
        let daken = Math.max((this.player.daken + this.player.dakenBonus + set.daken), (this.buffs.buffs.self.sange ? 100 : 0))
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
        delayCollection.reduced = delayCollection.reduced < delayCollection.cap ? delayCollection.cap : delayCollection.reduced
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

    getTargetStats(target){
        let targetDef = target.defense || 0
        let targetEva = target.evasion || 0
        let targetAgi = target.agi || 0
        let targetVit = target.vit || 0
        let targetInt = target.int || 0
        let targetCritDefense = target.critDefense || 0
        // Get total DEF down, create final DEF
        let diaLookup = [104,156,208,236]
        let totalDefDown = 0 
        totalDefDown += (this.buffs.buffs.geo.frailty ? this.buffs.buffs.geo.frailtyValue/100 : 0) + (this.buffs.buffs.mage.dia ? (diaLookup[this.buffs.buffs.mage.diaValue - 1]/1024) : 0)
        targetDef = Math.floor(targetDef*(1 - totalDefDown.toFixed(3)))
        // Get total Eva down, create final Eva
        let totalEvaDown = 0
        totalEvaDown += (this.buffs.buffs.mage.distract ? 35 : 0) + (this.buffs.buffs.mage.distractTwo ? 50 : 0) + (this.buffs.buffs.geo.torpor ? this.buffs.buffs.geo.torporValue : 0)
        targetEva -= totalEvaDown
        return { targetAgi, targetVit, targetInt, targetDef , targetEva, targetCritDefense}
    }

    getPdifResults(attack, defense, pdlTrait, pdlGear, cap){
        let cRatio = attack/defense
        // Determine Caps
        let ratioCritCap = (cap+(pdlTrait))*(1+pdlGear) + 1
        let ratioCap =(cap+(pdlTrait))*(1+pdlGear)
        let nonMin = cRatio+Math.min((cRatio*(152/1024) - (752/1024)), -0.375)
        let nonMax = cRatio+Math.max(Math.min(cRatio*0.25, 0.375), 0.25)
        let avgPdif = Math.min(((nonMin+nonMax)/2)*1.02, ratioCap)
        let critMin = (cRatio+1)+Math.min((cRatio+1)*(152/1024) - (752/1024), -0.375)
        let critMax = (cRatio+1)+Math.max(Math.min((cRatio+1)*0.25, 0.375), 0.25)
        let avgCritPdif = Math.min(((critMin+critMax)/2)*1.02, ratioCritCap)
        return { avgPdif, avgCritPdif}
    }

    getCritRate(type, playerStat, targetStat) {
        let lookup = [{break: 6, rate: 0},{break: 13, rate: 1},{break: 19, rate: 2},{break: 29, rate: 3},{break: 39, rate: 4}]
        let dValue = playerStat - targetStat
        let critRate = 0
        if(type === 'dDex'){
            if(dValue >= 40){
                return critRate = Math.min(15, dValue-35)
            }
            critRate = lookup.find(value => {
                if(dValue <= value.break) return true
            }).rate
        }
        if(type === 'dAgi'){
            critRate = Math.floor(dValue/10)
        }
        return critRate
    }

    handOneAvgStats(set){
        //TODO Implement FOOD bonuses to stats
        let baseAttack= 8 + (set.gear.mainhand.type === 'katana' ? this.player.katanaSkill : 0) + 
            (set.gear.mainhand.type === 'dagger' ? this.player.daggerSkill : 0) +
            (set.gear.mainhand.type === 'sword' ? this.player.swordSkill : 0) + 
            (this.isEmpty(set.gear.mainhand) ? this.player.h2hSkill : 0 ) +
            (!this.isEmpty(set.gear.mainhand) ? set.gear.mainhand.combatSkill : 0 ) +
            this.player.str + this.player.pAttackBonus + set.attack + set.str
        let weaponType = (set.gear.mainhand.type ? set.gear.mainhand.type : 'h2h')
        // Multiplicative Boosts >> Berserk >> Geo Buffs >> COR Buffs >> Food
        let geoAttack=0;
        let boostStr= this.buffs.buffs.whm.boostStr ? 25 : 0 ;
        //let strTotal = this.player.str + set.str + boostStr
        let brdAttack= (this.buffs.buffs.brd.minuetFive ? 124 + (this.buffs.buffs.brd.minuetPlus*12) + 45 : 0) +
            (this.buffs.buffs.brd.minuetFour ? 112 + (this.buffs.buffs.brd.minuetPlus*11) + 45 : 0) +
            (this.buffs.buffs.brd.minuetThree ? 96 + (this.buffs.buffs.brd.minuetPlus*9.5) + 45 : 0) + 
            (this.buffs.buffs.brd.honorMarch ? 168 + (Math.min(this.buffs.buffs.brd.marchPlus, 4)*16) : 0)
        let berserkAttack= (this.player.subJob === 'warrior' && this.buffs.buffs.subJob.berserk) ? Math.floor((baseAttack+boostStr+brdAttack)*.25) : 0 ;
        let corAttack= this.buffs.buffs.cor.chaosRoll ? Math.floor((this.buffs.buffs.cor.chaosValue/100) * baseAttack) : 0 ;
        let foodAttack=0;
        let attack=baseAttack + geoAttack + berserkAttack + boostStr + corAttack + foodAttack + brdAttack;
        //console.log(baseAttack, strTotal,  brdAttack, baseAttack+brdAttack, berserkAttack, corAttack, attack)

        // Get pDifs from attack/target defense
        let cap = {katana: 3.25, sword: 3.25, dagger: 3.25, h2h: 3.5}
        let { targetAgi, targetVit, targetInt, targetDef, targetEva } = this.getTargetStats(this.playStyle.target)
        let tempPdifs = this.getPdifResults(attack, targetDef, this.player.pdl, set.pdl, cap[weaponType])
        let avgPdif= tempPdifs.avgPdif.toFixed(4);
        let avgCritPdif= tempPdifs.avgCritPdif.toFixed(4);

        let dStr = 0 + (this.player.str + set.str) - targetVit
        let lambda = dStr < 20 ? Math.floor(8-(dStr/5)) : 4
        let wRank = 0 + (weaponType === 'h2h' ? Math.floor(this.player.h2hSkill*0.11 + 3) : Math.floor(set.gear.mainhand.damage/9));
        let fStr= 0 + Math.floor(Math.max(Math.min(Math.floor((dStr+lambda)/2),(8+wRank)*2), (0-wRank)*2)/2);
        let wDamage = 0 + (weaponType === 'h2h' ? Math.floor((this.player.h2hSkill*0.11 + 3)/9) + fStr : set.gear.mainhand.damage + fStr )

        // Determine Accuracy
        let baseAcc = (set.gear.mainhand.type === 'katana' ? this.player.katanaSkill : 0) + 
            (set.gear.mainhand.type === 'dagger' ? this.player.daggerSkill : 0) +
            (set.gear.mainhand.type === 'sword' ? this.player.swordSkill : 0) + 
            (this.isEmpty(set.gear.mainhand) ? this.player.h2hSkill : 0 ) +
            (!this.isEmpty(set.gear.mainhand) ? set.gear.mainhand.combatSkill : 0 )
        let totalDex = (this.player.dex + set.dex + (this.buffs.buffs.whm.boostDex ? 25 : 0)) // + food DEX
        let calcAcc = 200 + Math.floor(Math.max(Math.min(baseAcc-200, 200), 0) *0.9) + Math.floor(Math.max(Math.min(baseAcc-400, 200), 0) *0.8) + Math.floor(Math.max(Math.min(baseAcc-600, 200), 0) *0.9)
        let adjAcc = 0 + calcAcc + Math.floor((this.player.dex + set.dex + (this.buffs.buffs.whm.boostDex ? 25 : 0))*0.75)
        let brdAcc = 0 + (this.buffs.buffs.brd.swordMadrigal ? 45 + Math.floor(this.buffs.buffs.brd.madrigalPlus*4.5) + (this.buffs.buffs.brd.madrigalMerits) : 0) + 
            (this.buffs.buffs.brd.bladeMadrigal ? 60 + Math.floor(this.buffs.buffs.brd.madrigalPlus*6) + (this.buffs.buffs.brd.madrigalMerits) : 0) +
            (this.buffs.buffs.brd.honorMarch ? 42 + Math.floor(Math.min(this.buffs.buffs.brd.marchPlus, 4)*4) : 0 )
        
        let inninAcc = 0 + (this.buffs.buffs.self.innin ? 40 : 0 ) + (this.buffs.buffs.self.yonin ? -20 : 0 )
        let corAcc = 0 + (this.buffs.buffs.cor.hunterRoll ? this.buffs.buffs.cor.hunterValue : 0 )
        let geoAcc = 0 + (this.buffs.buffs.geo.precision ? this.buffs.buffs.geo.precisionValue : 0 )
        let aggressor = 0 + (this.player.subJob === 'warrior' && this.buffs.buffs.subJob.aggressor) ? 25 : 0 ;
        let accuracy = 0 + aggressor + geoAcc + corAcc + inninAcc + brdAcc + adjAcc + set.accuracy + this.player.pAccuracyBonus
        let dAccuracy = (Math.floor((accuracy - targetEva)/2)/100) + .75
        let hitRate= Math.min(0.99, Math.max(dAccuracy.toFixed(2), .20))

        // Crit Rate >> Base(5) + dDex(0-15) + gear(Cap 50?) + merits(5) + Innin + Rogue's roll >> No Fractions.
        let critRate= 5 + this.player.critMerits + set.critRate + (this.buffs.buffs.self.innin ? 20 : 0) + 
            (this.buffs.buffs.cor.rogueRoll ? this.buffs.buffs.cor.rogueValue : 0 ) + this.getCritRate('dDex', totalDex, targetAgi);

        let enSpell=0;
        let hitSpread= this.getHitSpread(set)
        let avgHits=0
        avgHits = (0*(1-hitRate))+(1*hitRate*hitSpread.one)+(2*hitRate*hitSpread.two)+(3*hitRate*hitSpread.three)+(4*hitRate*hitSpread.four)+(5*hitRate*0)+(6**hitRate*0)+(7*hitRate*0)+(8*hitRate*0)
        avgHits = parseFloat(avgHits.toFixed(3), 10)

        let avgDamage=0 + (wDamage* (avgPdif* ( parseFloat((1 - (critRate/100)).toFixed(2),10) ) + avgCritPdif* (parseFloat(((critRate/100)).toFixed(2),10))*(1+ parseFloat((set.critDamage/100).toFixed(2),10))));
        avgDamage = Math.max(parseFloat(avgDamage.toFixed(3), 10), 0)
        let relicAdd=0;
        let empyreanAdd=0;
        return {attack, avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell, relicAdd, empyreanAdd}
    }

    handTwoAvgStats(set){
        //TODO Implement FOOD bonuses to stats
        if(!this.isEmpty(set.gear.mainhand) && this.isEmpty(set.gear.offhand)) return {avgPdif: 0, avgCritPdif: 0, hitRate: 0, avgHits: 0, avgDamage: 0, tpPerHit: 0}
        let baseAttack= 8 + (set.gear.offhand.type === 'katana' ? this.player.katanaSkill : 0) + 
            (set.gear.offhand.type === 'dagger' ? this.player.daggerSkill : 0) +
            (set.gear.offhand.type === 'sword' ? this.player.swordSkill : 0) + 
            (this.isEmpty(set.gear.mainhand) ? this.player.h2hSkill : 0 ) +
            (!this.isEmpty(set.gear.offhand) ? set.gear.offhand.combatSkill : 0 ) +
            this.player.pAttackBonus + set.attack + Math.floor((set.str + this.player.str)*.5)
        let weaponType = (set.gear.offhand.type ? set.gear.offhand.type : 'h2h')
        // Multiplicative Boosts >> Berserk >> Geo Buffs >> COR Buffs
        let geoAttack=0;
        let boostStr= this.buffs.buffs.whm.boostStr ? Math.floor(25*.75) : 0 ;
        let brdAttack= (this.buffs.buffs.brd.minuetFive ? 124 + (this.buffs.buffs.brd.minuetPlus*12) + 45 : 0) +
            (this.buffs.buffs.brd.minuetFour ? 112 + (this.buffs.buffs.brd.minuetPlus*11) + 45 : 0) +
            (this.buffs.buffs.brd.minuetThree ? 96 + (this.buffs.buffs.brd.minuetPlus*9.5) + 45 : 0) + 
            (this.buffs.buffs.brd.honorMarch ? 168 + (Math.min(this.buffs.buffs.brd.marchPlus, 4)*16) : 0)
        let berserkAttack= (this.player.subJob === 'warrior' && this.buffs.buffs.subJob.berserk) ? Math.floor((baseAttack+brdAttack+boostStr)*.25) : 0 ;
        let corAttack= this.buffs.buffs.cor.chaosRoll ? Math.floor((this.buffs.buffs.cor.chaosValue/100) * baseAttack) : 0 ;
        let foodAttack=0;
        let attack=baseAttack + geoAttack + berserkAttack + boostStr + corAttack + foodAttack + brdAttack;

        // Get pDifs from attack/target defense
        let cap = {katana: 3.25, sword: 3.25, dagger: 3.25, h2h: 3.5}
        let { targetAgi, targetVit, targetInt, targetDef, targetEva } = this.getTargetStats(this.playStyle.target)
        let tempPdifs = this.getPdifResults(attack, targetDef, this.player.pdl, set.pdl, cap[weaponType])
        let avgPdif= tempPdifs.avgPdif.toFixed(4);
        let avgCritPdif= tempPdifs.avgCritPdif.toFixed(4);

        let dStr = 0 + (this.player.str + set.str) - targetVit
        let lambda = dStr < 20 ? Math.floor(8-(dStr/5)) : 4
        let wRank = 0 + (weaponType === 'h2h' ? Math.floor((this.player.h2hSkill*0.11 + 3)/9) : Math.floor(set.gear.offhand.damage/9));
        let fStr= 0 + Math.floor(Math.max(Math.min(Math.floor((dStr+lambda)/2),(8+wRank)*2), (0-wRank)*2)/2);
        let wDamage = 0 + (weaponType === 'h2h' ? Math.floor((this.player.h2hSkill*0.11 + 3)/9) + fStr : set.gear.offhand.damage + fStr )
        //console.log(dStr, lambda, wRank, fStr, wDamage)

        // Determine Accuracy
        let baseAcc = (set.gear.offhand.type === 'katana' ? this.player.katanaSkill : 0) + 
            (set.gear.offhand.type === 'dagger' ? this.player.daggerSkill : 0) +
            (set.gear.offhand.type === 'sword' ? this.player.swordSkill : 0) + 
            (this.isEmpty(set.gear.mainhand) ? this.player.h2hSkill : 0 ) +
            (!this.isEmpty(set.gear.offhand) ? set.gear.offhand.combatSkill : 0 )
        let calcAcc = 200 + Math.floor(Math.max(Math.min(baseAcc-200, 200), 0) *0.9) + Math.floor(Math.max(Math.min(baseAcc-400, 200), 0) *0.8) + Math.floor(Math.max(Math.min(baseAcc-600, 200), 0) *0.9)
        let adjAcc = 0 + calcAcc + Math.floor((this.player.dex + set.dex + (this.buffs.buffs.whm.boostDex ? 25 : 0))*0.75)
        let totalDex = (this.player.dex + set.dex + (this.buffs.buffs.whm.boostDex ? 25 : 0)) // + food DEX
        let brdAcc = 0 + (this.buffs.buffs.brd.swordMadrigal ? 45 + Math.floor(this.buffs.buffs.brd.madrigalPlus*4.5) + (this.buffs.buffs.brd.madrigalMerits) : 0) + 
            (this.buffs.buffs.brd.bladeMadrigal ? 60 + Math.floor(this.buffs.buffs.brd.madrigalPlus*6) + (this.buffs.buffs.brd.madrigalMerits) : 0) +
            (this.buffs.buffs.brd.honorMarch ? 42 + Math.floor(Math.min(this.buffs.buffs.brd.marchPlus, 4)*4) : 0 )
        
        let inninAcc = 0 + (this.buffs.buffs.self.innin ? 40 : 0 ) + (this.buffs.buffs.self.yonin ? -20 : 0 )
        let corAcc = 0 + (this.buffs.buffs.cor.hunterRoll ? this.buffs.buffs.cor.hunterValue : 0 )
        let geoAcc = 0 + (this.buffs.buffs.geo.precision ? this.buffs.buffs.geo.precisionValue : 0 )
        let aggressor = 0 + (this.player.subJob === 'warrior' && this.buffs.buffs.subJob.aggressor) ? 25 : 0 ;
        let accuracy = 0 + aggressor + geoAcc + corAcc + inninAcc + brdAcc + adjAcc + set.accuracy + this.player.pAccuracyBonus
        let dAccuracy = (Math.floor((accuracy - targetEva)/2)/100) + .75
        let hitRate= Math.min(0.95, Math.max(dAccuracy.toFixed(2), .20))

        let hitSpread= this.getHitSpread(set)
        let avgHits=0;

        // Crit Rate >> Base(5) + dDex(0-15) + gear(Cap 50?) + merits(5) + Innin + Rogue's roll >> No Fractions.
        let critRate= 5 + this.player.critMerits + set.critRate + (this.buffs.buffs.self.innin ? 20 : 0) + 
            (this.buffs.buffs.cor.rogueRoll ? this.buffs.buffs.cor.rogueValue : 0 ) + this.getCritRate('dDex', totalDex, targetAgi);

        let enSpell=0;
        avgHits = (0*(1-hitRate))+(1*hitRate*hitSpread.one)+(2*hitRate*hitSpread.two)+(3*hitRate*hitSpread.three)+(4*hitRate*hitSpread.four)+(5*hitRate*0)+(6**hitRate*0)+(7*hitRate*0)+(8*hitRate*0)
        avgHits = parseFloat(avgHits.toFixed(3), 10)
        let avgDamage=0 + (wDamage* (avgPdif* ( parseFloat((1 - (critRate/100)).toFixed(2),10) ) + avgCritPdif* (parseFloat(((critRate/100)).toFixed(2),10))*(1+ parseFloat((set.critDamage/100).toFixed(2),10))));
        avgDamage = Math.max(parseFloat(avgDamage.toFixed(3), 10), 0)
        return {attack, avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell}
    }

    throwingAvgStats(set){
        //TODO Implement FOOD bonuses to stats
        if(set.gear.ammo.type !== 'shuriken') return {avgPdif: 0, avgCritPdif: 0, hitRate: 0, avgHits: 0, avgDamage: 0, tpPerHit: 0, critRate: 0}
        let { targetAgi, targetVit, targetInt, targetDef, targetEva } = this.getTargetStats(this.playStyle.target)
        // Determine Accuracy
        let baseAcc = (set.gear.ammo.type === 'shuriken' ? this.player.throwingSkill : 0) +
            (!this.isEmpty(set.gear.ammo) ? set.gear.ammo.throwingSkill : 0 )
        let calcAcc = 200 + Math.floor(Math.max(Math.min(baseAcc-200, 200), 0) *0.9) + Math.floor(Math.max(Math.min(baseAcc-400, 200), 0) *0.8) + Math.floor(Math.max(Math.min(baseAcc-600, 200), 0) *0.9)
        let adjAcc = 0 + calcAcc + Math.floor((this.player.agi + set.agi)*0.75)
        let totalAgi = (this.player.agi + set.agi)
        let inninAcc = 0 + (this.buffs.buffs.self.innin ? 40 : 0 ) + (this.buffs.buffs.self.yonin ? -20 : 0 )
        let brdAcc = 0 + (this.buffs.buffs.brd.honorMarch ? 42 + Math.floor(Math.min(this.buffs.buffs.brd.marchPlus, 4)*4) : 0 )
        let corAcc = 0 + (this.buffs.buffs.cor.hunterRoll ? this.buffs.buffs.cor.hunterValue : 0 )
        let geoAcc = (this.buffs.buffs.geo.precision ? 100 : 0)
        let accuracy = 0 + corAcc + inninAcc + brdAcc + geoAcc + adjAcc + set.rAccuracy + this.player.rAccuracyBonus + 100 + (this.buffs.buffs.self.sange ? 100 : 0)
        let dAccuracy = (Math.floor((accuracy - targetEva)/2)/100) + .75
        let hitRate= Math.min(0.95, Math.max(dAccuracy.toFixed(2), .20))

        let daken = Math.max((this.player.daken + this.player.dakenBonus + set.daken), (this.buffs.buffs.self.sange ? 100 : 0) )
        let avgHits = parseFloat((1*hitRate*(daken/100)).toFixed(3), 10)

        // Skill + 8, + 100% STR, + Sange Attk(relic body, no thanks) + berserk + Minuet Attack + Geo Attack + rAttackBonus(Gifts) + Gear rAttack 
        let baseAttack = this.player.throwingSkill + set.gear.ammo.throwingSkill + 8 + (this.player.str + set.str) + this.player.rAttackBonus + set.rAttack
        let boostStr= this.buffs.buffs.whm.boostStr ? 25 : 0 ;
        let brdAttack = (this.buffs.buffs.brd.minuetFive ? 124 + (this.buffs.buffs.brd.minuetPlus*12) + 45 : 0) +
            (this.buffs.buffs.brd.minuetFour ? 112 + (this.buffs.buffs.brd.minuetPlus*11) + 45 : 0) +
            (this.buffs.buffs.brd.minuetThree ? 96 + (this.buffs.buffs.brd.minuetPlus*9.5) + 45 : 0) + 
            (this.buffs.buffs.brd.honorMarch ? 168 + (Math.min(this.buffs.buffs.brd.marchPlus, 4)*16) : 0)
        let corAttack= this.buffs.buffs.cor.chaosRoll ? Math.floor((this.buffs.buffs.cor.chaosValue/100) * baseAttack) : 0 ;
        let foodAttack= 0
        let berserkAttack= (this.player.subJob === 'warrior' && this.buffs.buffs.subJob.berserk) ? Math.floor((baseAttack+brdAttack+boostStr)*.25) : 0 ;
        let attack=baseAttack + berserkAttack + boostStr + corAttack + foodAttack + brdAttack;
        let avgPdif= 0 + parseFloat(Math.min((attack/targetDef), 3.25).toFixed(4), 10);
        let avgCritPdif= 0 + parseFloat((avgPdif*1.25).toFixed(4),10);

        let dStr = 0 + (this.player.str + set.str) - this.playStyle.target.vit
        let lambda = dStr < 20 ? Math.floor(8-(dStr/5)) : 4
        let wRank = 0 + Math.floor(set.gear.ammo.damage/9);
        let fStr= 0 + Math.floor(Math.max(Math.min(Math.floor((dStr+lambda)/2),(8+wRank)*2), (0-wRank)*2));
        let wDamage= set.gear.ammo.damage + fStr

        // Crit Rate >> Base(5) + dDex(0-15) + gear(Cap 50?) + merits(5) + Innin + Rogue's roll >> No Fractions.
        let critRate= 5 + this.player.critMerits + set.critRate + (this.buffs.buffs.self.innin ? 20 : 0) + 
            (this.buffs.buffs.cor.rogueRoll ? this.buffs.buffs.cor.rogueValue : 0 ) + this.getCritRate('dAgi', totalAgi, targetAgi);

        let avgDamage=0 + (wDamage*parseFloat(avgPdif,10)*(parseFloat((1 - (critRate/100)).toFixed(2),10)) + 
            wDamage*parseFloat(avgCritPdif,10)*(parseFloat(((critRate/100)).toFixed(2),10))*(1+ parseFloat((set.critDamage/100).toFixed(2),10)));
        avgDamage = Math.max(parseFloat(avgDamage.toFixed(3), 10), 0)

        return {avgPdif, avgCritPdif, hitRate, avgHits , avgDamage, attack, critRate}
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