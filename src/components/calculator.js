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

        this.avgMeleeDmg = 0;
        this.avgWsDmg = 0;
        this.meleeDps = 0;
        this.totalAvgDps = 0;
    }

    getMagicalHaste(buffs){
        let total = 0
        // Need to Include Soul Voice effects and Geo Haste Effects
        total += (buffs.buffs.mage.hasteOne ? 150 : 0) + (buffs.buffs.mage.hasteTwo ? 307 : 0) + (buffs.buffs.sch.embrava ? buffs.buffs.sch.embravaHaste : 0) + 
            (buffs.buffs.brd.honorMarch ? 126 + Math.min(buffs.buffs.brd.marchPlus, 4)*12 : 0) +
            (buffs.buffs.brd.victoryMarch ? 163 + Math.min(buffs.buffs.brd.marchPlus, 8)*16.25 : 0) +
            (buffs.buffs.brd.advancingMarch ? 108 + Math.min(buffs.buffs.brd.marchPlus, 8)*10.75 : 0) +
            (buffs.buffs.geo.haste ? Math.floor(buffs.buffs.geo.hasteValue*10.24) : 0 )
        total = total > 448 ? 448 : total
        return total
    }

    getEquipMentHaste(set){
        let total = 0
        total += set.haste
        total = total > 256 ? 256 : total
        return total
    }

    getTotalStats(set, buffs, player, playStyle){
        //Gear Stat + Player Stat + Boost Stat + Food Stat
        let str=0 + player.str + set.str + (buffs.buffs.whm.boostStr ? 25 : 0 ) + (playStyle.food.str ? playStyle.food.str : 0)
        let dex=0 + player.dex + set.dex + (buffs.buffs.whm.boostDex ? 25 : 0 ) + (playStyle.food.dex ? playStyle.food.dex : 0)
        let vit=0 + player.vit + set.vit + (buffs.buffs.whm.boostVit ? 25 : 0 ) + (playStyle.food.vit ? playStyle.food.vit : 0)
        let agi=0 + player.agi + set.agi + (buffs.buffs.whm.boostAgi ? 25 : 0 ) + (playStyle.food.agi ? playStyle.food.agi : 0)
        let int=0 + player.str + set.int + (buffs.buffs.whm.boostInt ? 25 : 0 ) + (playStyle.food.int ? playStyle.food.int : 0)
        let mnd=0 + player.dex + set.mnd + (buffs.buffs.whm.boostMnd ? 25 : 0 ) + (playStyle.food.mnd ? playStyle.food.mnd : 0)
        let chr=0 + player.dex + set.chr + (buffs.buffs.whm.boostChr ? 25 : 0 ) + (playStyle.food.chr ? playStyle.food.chr : 0)
        return {str, dex, vit, agi, int, mnd, chr}
    }

    getTpInfluences(set, buffs, player){
        // Going to need OAx distributions and Follow-Up distributions
        let storeTp = this.getStoreTp(set, buffs, player)
        let quadAttack = set.quadAttack
        let tripleAttack = set.tripleAttack
        let doubleAttack = set.doubleAttack + player.doubleAttack + (buffs.buffs.cor.fighterRoll ? buffs.buffs.cor.fighterValue : 0)
        let daken = Math.max((player.daken + player.dakenBonus + set.daken), (buffs.buffs.self.sange ? 100 : 0))
        let magicalHaste = this.getMagicalHaste(buffs)
        let gearHaste = this.getEquipMentHaste(set)
        let jaHaste = (buffs.buffs.dnc.hasteSamba ? buffs.buffs.dnc.hasteSambaValue : 0 )
        return {storeTp, quadAttack, tripleAttack, doubleAttack, daken, magicalHaste, gearHaste, jaHaste}
    }

    getDualWield(set, player){
        let total = 0
        total += player.dualWield + set.dualWield
        return total
    }

    getStoreTp(set, buffs, player){
        let total = 0
        total += player.storeTp + set.storeTp + (buffs.buffs.cor.samuraiRoll ? buffs.buffs.cor.samuraiValue : 0) + (buffs.buffs.self.kakkaIchi ? 10 : 0)
        return total
    }

    calculateDelay(set, buffs, player){
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
            delayCut = delayCollection.total * (1- (this.getDualWield(set, player)/100))
        }
        delayCollection.cap = delayCollection.total * .20
        delayCollection.reduced = delayCut * (1 - ((this.getMagicalHaste(buffs) + this.getEquipMentHaste(set))/1024))
        delayCollection.reduced = delayCollection.reduced < delayCollection.cap ? delayCollection.cap : delayCollection.reduced
        delayCollection.tp = this.getTpPerHit(set, delayCut, dwFlag, buffs, player) 
        return delayCollection
    }

    getTpPerHit(set, delay, dwFlag, buffs, player){
        let perHandDelay = dwFlag ? delay / 2 : delay
        let storeTp = this.getStoreTp(set, buffs, player)
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

    getTargetStats(target, buffs){
        let targetDef = target.defense || 1
        let targetEva = target.evasion || 1
        let targetAgi = target.agi || 0
        let targetVit = target.vit || 0
        let targetInt = target.int || 0
        let targetCritDefense = target.critDefense || 0
        // Get total DEF down, create final DEF
        let diaLookup = [104,156,208,236]
        let totalDefDown = 0 
        totalDefDown += (buffs.buffs.geo.frailty ? buffs.buffs.geo.frailtyValue/100 : 0) + (buffs.buffs.mage.dia ? (diaLookup[buffs.buffs.mage.diaValue - 1]/1024) : 0)
        targetDef = Math.floor(targetDef*(1 - totalDefDown.toFixed(3)))
        // Get total Eva down, create final Eva
        let totalEvaDown = 0
        totalEvaDown += (buffs.buffs.mage.distract ? 35 : 0) + (buffs.buffs.mage.distractTwo ? 50 : 0) + (buffs.buffs.geo.torpor ? buffs.buffs.geo.torporValue : 0)
        targetEva -= totalEvaDown
        return { targetAgi, targetVit, targetInt, targetDef , targetEva, targetCritDefense}
    }

    // TODO: Need a condition for if Defense is 0 (unspecified Target)
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
                return (dValue <= value.break)
            }).rate
        }
        if(type === 'dAgi'){
            critRate = Math.floor(dValue/10)
        }
        return critRate
    }

    calculateAccuracy(set, hand, ws, buffs, player, target, playStyle){
        let character = this.getTotalStats(set, buffs, player, playStyle)
        let { targetEva } = this.getTargetStats(target, buffs)
        let baseAcc = (set.gear[hand].type === 'katana' ? player.katanaSkill : 0) + 
            (set.gear[hand].type === 'dagger' ? player.daggerSkill : 0) +
            (set.gear[hand].type === 'sword' ? player.swordSkill : 0) + 
            (this.isEmpty(set.gear[hand]) ? player.h2hSkill : 0 ) +
            (!this.isEmpty(set.gear[hand]) ? set.gear[hand].combatSkill : 0 )
        let calcAcc = 200 + Math.floor(Math.max(Math.min(baseAcc-200, 200), 0) *0.9) + Math.floor(Math.max(Math.min(baseAcc-400, 200), 0) *0.8) + Math.floor(Math.max(Math.min(baseAcc-600, 200), 0) *0.9)
        let adjAcc = 0 + calcAcc + Math.floor((character.dex)*(0.75))
        let brdAcc = 0 + (buffs.buffs.brd.swordMadrigal ? 45 + Math.floor(buffs.buffs.brd.madrigalPlus*4.5) + (buffs.buffs.brd.madrigalMerits) : 0) + 
            (buffs.buffs.brd.bladeMadrigal ? 60 + Math.floor(buffs.buffs.brd.madrigalPlus*6) + (buffs.buffs.brd.madrigalMerits) : 0) +
            (buffs.buffs.brd.honorMarch ? 42 + Math.floor(Math.min(buffs.buffs.brd.marchPlus, 4)*4) : 0 )

        let inninAcc = 0 + (buffs.buffs.self.innin ? 40 : 0 ) + (buffs.buffs.self.yonin ? -20 : 0 )
        let corAcc = 0 + (buffs.buffs.cor.hunterRoll ? buffs.buffs.cor.hunterValue : 0 )
        let geoAcc = 0 + (buffs.buffs.geo.precision ? buffs.buffs.geo.precisionValue : 0 )
        let aggressor = 0 + (player.subJob === 'warrior' && buffs.buffs.subJob.aggressor) ? 25 : 0 ;
        let accuracy = 0 + aggressor + geoAcc + corAcc + inninAcc + brdAcc + adjAcc + set.accuracy + player.pAccuracyBonus + (ws ? 100 : 0)
        let dAccuracy = (Math.floor((accuracy - targetEva)/2)/100) + .75
        let hitRate= Math.min((hand === 'mainhand' ? .99 : .95), Math.max(dAccuracy.toFixed(2), .20))

        return hitRate
    }

    // TODO create fail fast when things not present?
    handOneAvgStats(set, buffs, target, player, playStyle){
        let character = this.getTotalStats(set, buffs, player, playStyle)
        let baseAttack= 8 + (set.gear.mainhand.type === 'katana' ? player.katanaSkill : 0) + 
            (set.gear.mainhand.type === 'dagger' ? player.daggerSkill : 0) +
            (set.gear.mainhand.type === 'sword' ? player.swordSkill : 0) + 
            (this.isEmpty(set.gear.mainhand) ? player.h2hSkill : 0 ) +
            (!this.isEmpty(set.gear.mainhand) ? set.gear.mainhand.combatSkill : 0 ) +
            character.str + player.pAttackBonus + set.attack
        let weaponType = (set.gear.mainhand.type ? set.gear.mainhand.type : 'h2h')
        let brdAttack= (buffs.buffs.brd.minuetFive ? 124 + (buffs.buffs.brd.minuetPlus*12) + 45 : 0) +
            (buffs.buffs.brd.minuetFour ? 112 + (buffs.buffs.brd.minuetPlus*11) + 45 : 0) +
            (buffs.buffs.brd.minuetThree ? 96 + (buffs.buffs.brd.minuetPlus*9.5) + 45 : 0) + 
            (buffs.buffs.brd.honorMarch ? 168 + (Math.min(buffs.buffs.brd.marchPlus, 4)*16) : 0)
        let berserkAttack= (player.subJob === 'warrior' && buffs.buffs.subJob.berserk) ? Math.floor((baseAttack+brdAttack)*.25) : 0 ;
        let geoAttack=0 + (buffs.buffs.geo.fury ? (buffs.buffs.geo.furyValue/100) : 0)*(baseAttack+brdAttack);
        geoAttack = Math.floor(geoAttack)

        let corAttack= buffs.buffs.cor.chaosRoll ? Math.floor((buffs.buffs.cor.chaosValue/100) * baseAttack) : 0 ;
        let foodAttack=0;
        let attack=baseAttack + geoAttack + berserkAttack + corAttack + foodAttack + brdAttack;

        // Get pDifs from attack/target defense
        let cap = {katana: 3.25, sword: 3.25, dagger: 3.25, h2h: 3.5}
        let { targetAgi, targetVit, targetInt, targetDef, targetEva } = this.getTargetStats(target, buffs)
        let tempPdifs = this.getPdifResults(attack, targetDef, player.pdl, set.pdl, cap[weaponType])
        let avgPdif= tempPdifs.avgPdif.toFixed(4);
        let avgCritPdif= tempPdifs.avgCritPdif.toFixed(4);

        let dStr = 0 + (character.str) - targetVit
        let lambda = dStr < 20 ? Math.floor(8-(dStr/5)) : 4
        let wRank = 0 + (weaponType === 'h2h' ? Math.floor(player.h2hSkill*0.11 + 3) : Math.floor(set.gear.mainhand.damage/9));
        let fStr= 0 + Math.floor(Math.max(Math.min(Math.floor((dStr+lambda)/2),(8+wRank)*2), (0-wRank)*2)/2);
        let wDamage = 0 + (weaponType === 'h2h' ? Math.floor((player.h2hSkill*0.11 + 3)/9) + fStr : set.gear.mainhand.damage + fStr )


        let hitRate = this.calculateAccuracy(set, 'mainhand', false, buffs, player, target, playStyle)

        // Crit Rate >> Base(5) + dDex(0-15) + gear(Cap 50?) + merits(5) + Innin + Rogue's roll >> No Fractions.
        let critRate= 5 + player.critMerits + set.critRate + (buffs.buffs.self.innin ? 20 : 0) + 
            (buffs.buffs.cor.rogueRoll ? buffs.buffs.cor.rogueValue : 0 ) + this.getCritRate('dDex', character.dex, targetAgi);

        let enSpell=0;
        let hitSpread= this.getHitSpread(set, player, buffs)
        let avgHits=0
        avgHits = (0*(1-hitRate))+(1*hitRate*hitSpread.one)+(2*hitRate*hitSpread.two)+(3*hitRate*hitSpread.three)+(4*hitRate*hitSpread.four)+(5*hitRate*0)+(6**hitRate*0)+(7*hitRate*0)+(8*hitRate*0)
        avgHits = parseFloat(avgHits.toFixed(3), 10)

        let avgDamage=0 + (wDamage* (avgPdif* ( parseFloat((1 - (critRate/100)).toFixed(2),10) ) + avgCritPdif* (parseFloat(((critRate/100)).toFixed(2),10))*(1+ parseFloat((set.critDamage/100).toFixed(2),10))));
        avgDamage = Math.max(parseFloat(avgDamage.toFixed(3), 10), 0)
        let relicAdd=0;
        let empyreanAdd=0;
        return {attack, wDamage, avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell, relicAdd, empyreanAdd}
    }

    handTwoAvgStats(set, buffs, target, player, playStyle){
        let character = this.getTotalStats(set, buffs, player, playStyle)
        if(!this.isEmpty(set.gear.mainhand) && this.isEmpty(set.gear.offhand)) return {avgPdif: 0, avgCritPdif: 0, hitRate: 0, avgHits: 0, avgDamage: 0, tpPerHit: 0}
        let baseAttack= 8 + (set.gear.offhand.type === 'katana' ? player.katanaSkill : 0) + 
            (set.gear.offhand.type === 'dagger' ? player.daggerSkill : 0) +
            (set.gear.offhand.type === 'sword' ? player.swordSkill : 0) + 
            (this.isEmpty(set.gear.mainhand) ? player.h2hSkill : 0 ) +
            (!this.isEmpty(set.gear.offhand) ? set.gear.offhand.combatSkill : 0 ) +
            player.pAttackBonus + set.attack + Math.floor((character.str)*.5)
        let weaponType = (set.gear.offhand.type ? set.gear.offhand.type : 'h2h')
        // Multiplicative Boosts >> Berserk >> Geo Buffs >> COR Buffs

        let brdAttack= (buffs.buffs.brd.minuetFive ? 124 + (buffs.buffs.brd.minuetPlus*12) + 45 : 0) +
            (buffs.buffs.brd.minuetFour ? 112 + (buffs.buffs.brd.minuetPlus*11) + 45 : 0) +
            (buffs.buffs.brd.minuetThree ? 96 + (buffs.buffs.brd.minuetPlus*9.5) + 45 : 0) + 
            (buffs.buffs.brd.honorMarch ? 168 + (Math.min(buffs.buffs.brd.marchPlus, 4)*16) : 0)
        let berserkAttack= (player.subJob === 'warrior' && buffs.buffs.subJob.berserk) ? Math.floor((baseAttack+brdAttack)*.25) : 0 ;
        let corAttack= buffs.buffs.cor.chaosRoll ? Math.floor((buffs.buffs.cor.chaosValue/100) * baseAttack) : 0 ;
        let foodAttack=0;
        let geoAttack=0 + (buffs.buffs.geo.fury ? (buffs.buffs.geo.furyValue/100)*(baseAttack+brdAttack) : 0 )
        geoAttack = Math.floor(geoAttack)
        let attack=baseAttack + geoAttack + berserkAttack + corAttack + foodAttack + brdAttack;

        // Get pDifs from attack/target defense
        let cap = {katana: 3.25, sword: 3.25, dagger: 3.25, h2h: 3.5}
        let { targetAgi, targetVit, targetInt, targetDef, targetEva } = this.getTargetStats(target, buffs)
        let tempPdifs = this.getPdifResults(attack, targetDef, player.pdl, set.pdl, cap[weaponType])
        let avgPdif= tempPdifs.avgPdif.toFixed(4);
        let avgCritPdif= tempPdifs.avgCritPdif.toFixed(4);

        let dStr = 0 + (player.str + set.str) - targetVit
        let lambda = dStr < 20 ? Math.floor(8-(dStr/5)) : 4
        let wRank = 0 + (weaponType === 'h2h' ? Math.floor((player.h2hSkill*0.11 + 3)/9) : Math.floor(set.gear.offhand.damage/9));
        let fStr= 0 + Math.floor(Math.max(Math.min(Math.floor((dStr+lambda)/2),(8+wRank)*2), (0-wRank)*2)/2);
        let wDamage = 0 + (weaponType === 'h2h' ? Math.floor((player.h2hSkill*0.11 + 3)/9) + fStr : set.gear.offhand.damage + fStr )

        let hitRate = this.calculateAccuracy(set, 'offhand', false, buffs, player, target, playStyle)

        let hitSpread= this.getHitSpread(set, player, buffs)
        let avgHits=0;

        // Crit Rate >> Base(5) + dDex(0-15) + gear(Cap 50?) + merits(5) + Innin + Rogue's roll >> No Fractions.
        let critRate= 5 + player.critMerits + set.critRate + (buffs.buffs.self.innin ? 20 : 0) + 
            (buffs.buffs.cor.rogueRoll ? buffs.buffs.cor.rogueValue : 0 ) + this.getCritRate('dDex', character.dex, targetAgi);

        let enSpell=0;
        avgHits = (0*(1-hitRate))+(1*hitRate*hitSpread.one)+(2*hitRate*hitSpread.two)+(3*hitRate*hitSpread.three)+(4*hitRate*hitSpread.four)+(5*hitRate*0)+(6**hitRate*0)+(7*hitRate*0)+(8*hitRate*0)
        avgHits = parseFloat(avgHits.toFixed(3), 10)
        let avgDamage=0 + (wDamage* (avgPdif* ( parseFloat((1 - (critRate/100)).toFixed(2),10) ) + avgCritPdif* (parseFloat(((critRate/100)).toFixed(2),10))*(1+ parseFloat((set.critDamage/100).toFixed(2),10))));
        avgDamage = Math.max(parseFloat(avgDamage.toFixed(3), 10), 0)
        return {attack, wDamage, avgPdif, avgCritPdif, hitRate, avgHits, fStr, avgDamage, critRate, enSpell}
    }

    throwingAvgStats(set, buffs, target, player, playStyle){
        let character = this.getTotalStats(set, buffs, player, playStyle)
        if(set.gear.ammo.type !== 'shuriken') return {avgPdif: 0, avgCritPdif: 0, hitRate: 0, avgHits: 0, avgDamage: 0, tpPerHit: 0, critRate: 0}
        let { targetAgi, targetVit, targetInt, targetDef, targetEva } = this.getTargetStats(target, buffs)
        // Determine Accuracy
        let baseAcc = (set.gear.ammo.type === 'shuriken' ? player.throwingSkill : 0) +
            (!this.isEmpty(set.gear.ammo) ? set.gear.ammo.throwingSkill : 0 )
        let calcAcc = 200 + Math.floor(Math.max(Math.min(baseAcc-200, 200), 0) *0.9) + Math.floor(Math.max(Math.min(baseAcc-400, 200), 0) *0.8) + Math.floor(Math.max(Math.min(baseAcc-600, 200), 0) *0.9)
        let adjAcc = 0 + calcAcc + Math.floor((character.agi)*0.75)
        let inninAcc = 0 + (buffs.buffs.self.innin ? 40 : 0 ) + (buffs.buffs.self.yonin ? -20 : 0 )
        let brdAcc = 0 + (buffs.buffs.brd.honorMarch ? 42 + Math.floor(Math.min(buffs.buffs.brd.marchPlus, 4)*4) : 0 )
        let corAcc = 0 + (buffs.buffs.cor.hunterRoll ? this.buffs.buffs.cor.hunterValue : 0 )
        let geoAcc = (buffs.buffs.geo.precision ? 100 : 0)
        let accuracy = 0 + corAcc + inninAcc + brdAcc + geoAcc + adjAcc + set.rAccuracy + player.rAccuracyBonus + 100 + (buffs.buffs.self.sange ? 100 : 0)
        let dAccuracy = (Math.floor((accuracy - targetEva)/2)/100) + .75
        let hitRate= Math.min(0.95, Math.max(dAccuracy.toFixed(2), .20))

        let daken = Math.max((player.daken + player.dakenBonus + set.daken), (buffs.buffs.self.sange ? 100 : 0) )
        let avgHits = parseFloat((1*hitRate*(daken/100)).toFixed(3), 10)

        // Skill + 8, + 100% STR, + Sange Attk(relic body, no thanks) + berserk + Minuet Attack + Geo Attack + rAttackBonus(Gifts) + Gear rAttack 
        let baseAttack = player.throwingSkill + set.gear.ammo.throwingSkill + 8 + (character.str) + player.rAttackBonus + set.rAttack
        let brdAttack = (buffs.buffs.brd.minuetFive ? 124 + (buffs.buffs.brd.minuetPlus*12) + 45 : 0) +
            (buffs.buffs.brd.minuetFour ? 112 + (buffs.buffs.brd.minuetPlus*11) + 45 : 0) +
            (buffs.buffs.brd.minuetThree ? 96 + (buffs.buffs.brd.minuetPlus*9.5) + 45 : 0) + 
            (buffs.buffs.brd.honorMarch ? 168 + (Math.min(buffs.buffs.brd.marchPlus, 4)*16) : 0)
        let corAttack= buffs.buffs.cor.chaosRoll ? Math.floor((buffs.buffs.cor.chaosValue/100) * baseAttack) : 0 ;
        let foodAttack= 0
        let berserkAttack= (player.subJob === 'warrior' && buffs.buffs.subJob.berserk) ? Math.floor((baseAttack+brdAttack)*.25) : 0 ;
        let attack=baseAttack + berserkAttack + corAttack + foodAttack + brdAttack;
        let avgPdif= 0 + parseFloat(Math.min((attack/targetDef), 3.25).toFixed(4), 10);
        let avgCritPdif= 0 + parseFloat((avgPdif*1.25).toFixed(4),10);

        let dStr = 0 + (player.str + set.str) - targetVit
        let lambda = dStr < 20 ? Math.floor(8-(dStr/5)) : 4
        let wRank = 0 + Math.floor(set.gear.ammo.damage/9);
        let fStr= 0 + Math.floor(Math.max(Math.min(Math.floor((dStr+lambda)/2),(8+wRank)*2), (0-wRank)*2));
        let wDamage= set.gear.ammo.damage + fStr

        // Crit Rate >> Base(5) + dDex(0-15) + gear(Cap 50?) + merits(5) + Innin + Rogue's roll >> No Fractions.
        let critRate= 5 + player.critMerits + set.critRate + (buffs.buffs.self.innin ? 20 : 0) + 
            (buffs.buffs.cor.rogueRoll ? buffs.buffs.cor.rogueValue : 0 ) + this.getCritRate('dAgi', character.agi, targetAgi);

        let avgDamage=0 + (wDamage*parseFloat(avgPdif,10)*(parseFloat((1 - (critRate/100)).toFixed(2),10)) + 
            wDamage*parseFloat(avgCritPdif,10)*(parseFloat(((critRate/100)).toFixed(2),10))*(1+ parseFloat((set.critDamage/100).toFixed(2),10)));
        avgDamage = Math.max(parseFloat(avgDamage.toFixed(3), 10), 0)
        return {avgPdif, wDamage, avgCritPdif, hitRate, avgHits , avgDamage, attack, critRate}
    }

    // Must have chosenWs set and have a mainhand type to match in the gearSet
    getWsTpReturn(set, ws, buffs, player, target, playStyle){
        if(this.isEmpty(ws) || set.gear.mainhand.type !== ws.type) {
            return 0
        }
        let extraHits = 10
        let chosenWs = ws || this.playStyle.mainWs
        let handOne = this.handOneAvgStats(set, buffs, target, player, playStyle)
        let handTwo = this.handTwoAvgStats(set, buffs, target, player, playStyle)
        let tpTotals = this.calculateDelay(set, buffs, player)
        let wsSetStats = this.getTpInfluences(set, buffs, player)
        let stp = (1 + (wsSetStats.storeTp/100))
        //First Hit Acc
        let firstHitRate = 0 + this.calculateAccuracy(set, 'mainhand', true, buffs, player, target, playStyle)
        //Remaining Main Hand Acc
        let restHitRate = 0 + this.calculateAccuracy(set, 'mainhand', false, buffs, player, target, playStyle)
        //Remaining Off Hand Acc
        let offHitRate = 0 + this.calculateAccuracy(set, 'offhand', false, buffs, player, target, playStyle)

        let avgTpReturn = 0
        // First Hit TP
        avgTpReturn += tpTotals.tp.hit*firstHitRate + ((handOne.avgHits - 1)*(extraHits)*(stp))
        // Second Hit TP (if present, has possibility of multi attack also?)
        // Remaining Hits from main hand with no possibility of multi attack
        avgTpReturn += (chosenWs.extraHits ? (chosenWs.extraHits)*(extraHits)*(stp)*restHitRate : 0)
        // Offhand calcs
        avgTpReturn += tpTotals.tp.hit*offHitRate + ((handTwo.avgHits - 1)*(extraHits)*(stp))
        avgTpReturn = parseFloat(avgTpReturn.toFixed(0), 10)

        return avgTpReturn
    }

    // Must have tpSet and wsSet created
    attackRoundStats(tpSet, wsSet, buffs, target, player, playStyle){
        let localHandOne = this.handOneAvgStats(tpSet, buffs, target, player, playStyle)
        let localHandTwo = this.handTwoAvgStats(tpSet, buffs, target, player, playStyle)
        let localShurikenHits = this.throwingAvgStats(tpSet, buffs, target, player, playStyle)
        let localDelay = this.calculateDelay(tpSet, buffs, player)
        let tpCollection = this.calculateDelay(tpSet, buffs, player)

        let avgTpRound = (tpCollection.tp.hit*localHandOne.avgHits) + (tpCollection.tp.hit*localHandTwo.avgHits) +
            (tpCollection.tp.shuriken*localShurikenHits.avgHits)

        let avgRoundsToWs = ((playStyle.tp.minimumTp+(avgTpRound*playStyle.tp.overRounds))/avgTpRound).toFixed(2)
        let avgTpAtWs = avgRoundsToWs * avgTpRound

        let avgTpReturn = this.getWsTpReturn(wsSet)
        let avgRoundsFromWs = (((playStyle.tp.minimumTp-avgTpReturn)+(avgTpRound*playStyle.tp.overRounds))/avgTpRound)
        let avgTpFromWs = avgRoundsFromWs * avgTpRound

        return {hitsHandOne: parseFloat(localHandOne.avgHits.toFixed(4),10),
                hitsHandTwo: parseFloat(localHandTwo.avgHits.toFixed(4), 10), 
                hitsShuriken: parseFloat(localShurikenHits.avgHits.toFixed(4), 10), 
                delay: parseFloat(localDelay.reduced.toFixed(2), 10),
                totalDelay: parseFloat(localDelay.total.toFixed(2), 10),
                delayCap: parseFloat(localDelay.cap.toFixed(2), 10),
                tpPerHit: parseFloat(localDelay.tp.hit.toFixed(2), 10),
                shuriken: parseFloat(localDelay.tp.shuriken.toFixed(2), 10),
                avgTpRnd: parseFloat(avgTpRound, 10).toFixed(0),
                avgRoundsWs: parseFloat(avgRoundsToWs, 10).toFixed(2),
                avgRoundsFrom: parseFloat(avgRoundsFromWs.toFixed(2), 10),
                avgTpAt: parseFloat(avgTpAtWs.toFixed(0), 10),
                avgTpFrom: parseFloat(avgTpFromWs.toFixed(0), 10)
            }
    }

    getHitSpread(set, player, buffs){
        // Needs 
        //  -Player Stats (multi-hit)
        //  -Weapons with OAx
        //  -AM with multi-hit
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
        let globalDoubleAttack = player.doubleAttack + set.doubleAttack + (buffs.buffs.cor.fighterRoll ? buffs.buffs.cor.fighterValue : 0)
        let globalTripleAttack = player.tripleAttack + set.tripleAttack
        let globalQuadAttack = player.quadAttack + set.quadAttack
        let hitSpread = {
            four: parseFloat((globalQuadAttack/100),10),
            three: parseFloat(((1 - globalQuadAttack/100)*(globalTripleAttack/100)),10),
            two: parseFloat(((1- globalQuadAttack/100)*(1 -globalTripleAttack/100)*(globalDoubleAttack/100)),10),
            one: parseFloat(((1- globalQuadAttack/100)*(1 - globalTripleAttack/100)*(1 - globalDoubleAttack/100)),10)
        }
        // let offHitSpread = {}
        return (hitSpread)
    }

    // Must have WS Chosen, Player Object Created, GearSet created(?)
    wsAvgs(set, tp, ws, target, buffs, player, playStyle){
        if(this.isEmpty(ws) || set.gear.mainhand.type !== ws.type) {
            return { handOnePdif: 0, handTwoPdif: 0, avgWsDamage: 0, wsMod: 0, handOneAvgHits: 0, handOneAcc: 0, 
                    handTwoAvgHits: 0, handTwoAcc: 0, avgTpReturn: 0, tpBonus: 0, wsDamage: 0, avgWsTpUse: 0, 
                    aeonicBonus: 0, relicBonus: 0, empyreanBonus: 0 }
        }
        let wsCalcTable = ['str','dex','vit','agi','int','mnd','chr']
        let chosenWs = ws || this.playStyle.mainWs
        let handOne = this.handOneAvgStats(set, buffs, target, player, playStyle)
        let handTwo = this.handTwoAvgStats(set, buffs, target, player, playStyle)
        let statTotals = this.getTotalStats(set, buffs, player, playStyle)
        let wsDamage= 0 + parseFloat(player.wsDmgBonus, 10) + parseFloat(set.wsDamage,10)
        let wsMod = 0
        wsCalcTable.forEach(value => {
            if(chosenWs[value]){
                wsMod += Math.floor(statTotals[value]*chosenWs[value])
            }
        })

        let handOneAvgHits = 0 + (handOne.avgHits*1)+(chosenWs.extraHits ? handOne.avgHits : 0)+(chosenWs.extraHits ? chosenWs.extraHits -1 : 0)
        let handTwoAvgHits = 0 + handTwo.avgHits
        let handOneAcc = 0 + handOne.hitRate
        let handTwoAcc = 0 + handTwo.hitRate
        let tpBonus = 0 + parseFloat(set.tpBonus,10)
        let avgWsTpUse = tp + tpBonus
        let avgTpReturn = this.getWsTpReturn(set, ws, buffs, player, target, playStyle)

        //Calculate fTP
        let ftp = 0
        if(avgWsTpUse < 1000){
            ftp = 0
        }
        if(avgWsTpUse >= 1000 && avgWsTpUse <= 2000){
            ftp = chosenWs.ftp1 + (chosenWs.ftp2-chosenWs.ftp1)*((avgWsTpUse-1000)/1000)
        }
        if(avgWsTpUse > 2000 && avgWsTpUse <= 3000){
            ftp = chosenWs.ftp2 + (chosenWs.ftp3-chosenWs.ftp2)*((avgWsTpUse-2000)/1000)
        }

        //Calculate Per Hand Damage and Tally
        //First Hand First Hit
        let mainHitDamage = (handOne.wDamage+wsMod)*(ftp)*(handOneAcc)
        mainHitDamage *= handOne.avgPdif
        mainHitDamage *= (1 + (wsDamage/100))
        //First Hand First Hit Multi-Attack
        let mainHandMulti = 0
        mainHandMulti += 0 + Math.max((handOne.avgHits - 1), 0)*(handOne.wDamage+wsMod)*(handOne.avgPdif)*(chosenWs.ftpCarry ? chosenWs.ftp : 1.0)
        //First Hand Extra Hits
        if(chosenWs.extraHits > 0){
            mainHandMulti += ( chosenWs.extraHits * handOneAcc * handOne.avgPdif )*(chosenWs.ftpCarry ? ftp : 1.0)
        }
        //Second Hand Hit
        let offHandHits = 0
        if(!this.isEmpty(set.gear.offhand)){
            offHandHits += (handTwo.wDamage+wsMod)*(parseFloat(handTwo.avgHits, 10))*(handTwo.avgPdif)*(chosenWs.ftpCarry ? ftp : 1.0)
        }
        //Multiply By Final Damage
        
        let totalDmg = mainHitDamage + mainHandMulti + offHandHits

        let avgWsDamage= parseFloat(totalDmg.toFixed(3), 10)
        let remaLookup= {'Kikoku': 40, 'Kikoku R15': 68, 'Kannagi R15': 10, 'Heishi Shorinken R15': 10}
        let aeonicBonus = 0 + (set.gear.mainhand.name === 'Heishi Shorinken R15' && chosenWs.name === 'Blade: Shun' ? remaLookup[set.gear.mainhand.name] : 0)
        let relicBonus= 0 + (set.gear.mainhand.name.search('Kikoku') !== -1 && chosenWs.name === 'Blade: Metsu' ? remaLookup[set.gear.mainhand.name] : 0)
        let empyreanBonus= 0 + (set.gear.mainhand.name === 'Kannagi R15' && chosenWs.name === 'Blade: Hi' ? remaLookup[set.gear.mainhand.name] : 0)
        return {handOnePdif: handOne.avgPdif, handTwoPdif: handTwo.avgPdif, 
                avgWsDamage, wsMod, handOneAvgHits, handOneAcc, handTwoAvgHits, 
                handTwoAcc, avgTpReturn, tpBonus, wsDamage, avgWsTpUse, aeonicBonus,
                relicBonus, empyreanBonus}
    }

    isEmpty(el){
        if(el == null) return true
        // Implementation Specific Empty Check
        if(el.name && el.name === 'none') return true
        if(typeof(el) === 'string') return el.length  === 0
        for(var key in el) if(el.hasOwnProperty(key)) return false
        return true
    }
}

export default Calculator;