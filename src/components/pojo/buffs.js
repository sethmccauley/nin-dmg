export default class Buffs {
    constructor(){
        this.buffs = {
            self: {
                innin: true,
                yonin: false,
                sange: false,
                kakkaIchi: true,
            },
            subJob: {
                berserk: false,
                aggressor: false,
                hasteSamba: false,
            },
            mage: {
                hasteOne: false,
                hasteTwo: true,
                dia: 0
            },
            whm: {
                enhancingSkill: 500,
                boostStr: false,
                boostDex: false,
                boostAgi: false,
            },
            smn: {
                summoningSkill: 450,
                ifritEnfire: false
            },
            sch: {
                enhancingSkill: 475,
                embrava: false,
                embravaHaste: 25.9,
                enspell: false,
                adloquium: false
            },
            dnc: {
                hasteSamba: false,
                hasteSambaValue: 10,
            },
            brd: {
                singingSkill: 900,
                soulVoice: false,
                marchPlus: 8,
                honorMarch: true,
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
                samuraiRoll: false,
                samuraiValue: 70,
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