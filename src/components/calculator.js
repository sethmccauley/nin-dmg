//import * as mobs from './datafiles/mobs.json'
import * as statLookup from './datafiles/stats.json'

export class PlayStyle {
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

export class Buffs {
    constructor(){
        this.buffs = {
            self: {
                innin: false,
                yonin: false,
                sange: false,
                kakkaIchi: false,
            },
            subJob: {
                berserk: false,
                aggressor: false,
                hasteSamba: false,
            },
            mage: {
                hasteOne: false,
                hasteTwo: false,
                dia: 0
            },
            whm: {
                enhancingSkill: 500,
                boostStr: false
            },
            smn: {
                summoningSkill: 450,
                ifritEnfire: false
            },
            sch: {
                enhancingSkill: 475,
                embrava: false,
                enspell: false,
                adloquium: false
            },
            dnc: {
                hasteSamba: false,
            },
            brd: {
                singingSkill: 900,
                soulVoice: false,
                marchPlus: 7,
                honorMarch: false,
                advancingMarch: false,
                victoryMarch: false,
                minuetPlus: 7,
                minuetMerits: 5,
                minuetFive: false,
                minuetFour: false,
                minuetThree: false,
                madrigalPlus: 7,
                madrigalMerit: 5,
                swordMadrigal: false,
                bladeMadrigal: false,
            },
            cor: {
                chaosRoll: false,
                chaosValue: 70,
                hunterRoll: false,
                hunterValue: 75,
                fighterRoll: false,
                fighterValue: 17,
                rogueRoll: false,
                rogueValue: 17,
                samRoll: false,
                samValue: 70,
                tacticianRoll: false,
                tacticianValue: 50,
                miserRoll: false,
                miserValue: 200,
            },
            geo: {
                bolster: false,
                blazeOfGlory: false,
                eclipticAttrition: false,
                torpor: false,
                torporValue: 100,
                frailty: false,
                frailtyValue: 40,
                precision: false,
                precisionValue: 75,
                fury: false,
                furyValue: 48,
            },
        }
    }
}

export class GearSet {
    constructor(){
        this.mainHand= '';
        this.offHand= '';
        this.ranged= '';
        this.ammo= '';
        this.head= '';
        this.neck= '';
        this.ear1= '';
        this.ear2= '';
        this.body= '';
        this.hands= '';
        this.ring1= '';
        this.ring2= '';
        this.back= '';
        this.waist= '';
        this.legs= '';
        this.feet= '';
    }
    getTotal(){

    }
}

export class Target{
    constructor(){

    }
}

export class Player {
    constructor(){
        this.jobPoints = 2100;
        this.race= 'hume';
        this.level= 99;
        this.subJob= 'warrior';
        this.food= '';
        this.str= 0;
        this.dex= 0;
        this.agi= 0;
        this.chr= 0;
        this.vit= 0;
        this.mnd= 0;
        this.int= 0;
        this.crit= 5;
        this.katanaSkill= 0;
        this.throwingSkill= 0;
        this.daggerSkill= 0;
        this.swordSkill= 0;
        this.dualWield= 0;
        this.doubleAttack= 0;
        this.tripleAttack= 0;
        this.quadrupleAttack= 0;
        this.daken= 0;
        this.strMerits= 15;
        this.dexMerits= 15;
        this.agiMerits= 15;
        this.intMerits= 15;
        this.vitMerits= 0;
        this.mndMerits= 15;
        this.chrMerits= 0;
        this.critMerits= 5;
        this.sangeMerits= 0;
        this.katanaSkillMerits= 16;
        this.throwingSkillMerits= 16;
        this.daggerSkillMerits= 16;
        this.swordSkillMerits= 16;
        this.bladeShunMerits= 5;
        this.calculateBaseStats(this.race, this.subJob);
    }

    calculateBaseStats(race, subjob) {
        let localStats = statLookup.default[subjob][race]
        let localLevel = Math.min(this.level, 99)
        this.hp = localStats.hp
        this.str = localStats.str + Math.min(this.strMerits, 15)
        this.dex = localStats.dex + Math.min(this.dexMerits, 15)
        this.agi = localStats.agi + Math.min(this.agiMerits, 15)
        this.chr = localStats.chr + Math.min(this.chrMerits, 15)
        this.vit = localStats.vit + Math.min(this.vitMerits, 15)
        this.mnd = localStats.mnd + Math.min(this.mndMerits, 15)
        this.int = localStats.int + Math.min(this.intMerits, 15)
        this.katanaSkill = 276 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + this.katanaSkillMerits
        this.throwingSkill = 276 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + this.throwingSkillMerits
        this.daggerSkill = 230 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + this.daggerSkillMerits
        this.swordSkill = 225 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + this.daggerSkillMerits
    }
}

export class Calculator {
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