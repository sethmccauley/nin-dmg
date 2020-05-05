import * as statLookup from '../datafiles/stats.json'

export default class Player {
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
        this.critMerits= 5;
        this.pdl= 0.1;
        this.katanaSkill= 276;
        this.throwingSkill= 276;
        this.daggerSkill= 230;
        this.swordSkill= 225;
        this.dualWield= 35;
        this.doubleAttack= 0;
        this.tripleAttack= 0;
        this.quadAttack= 0;
        this.daken= 40;
        this.storeTp=0;
        this.strMerits= 15;
        this.dexMerits= 15;
        this.agiMerits= 15;
        this.intMerits= 15;
        this.vitMerits= 15;
        this.mndMerits= 15;
        this.chrMerits= 15;
        this.critMerits= 5;
        this.sangeMerits= 5;
        this.inninMerits= 5;
        this.inninJobPoints= 20;
        this.dakenBonus= 0;
        this.pAttackBonus= 0;
        this.pAccuracyBonus= 0;
        this.wsDmgBonus= 0;
        this.katanaSkillMerits= 16;
        this.throwingSkillMerits= 16;
        this.daggerSkillMerits= 16;
        this.swordSkillMerits= 16;
        this.bladeShunMerits= 5;
        this.skillChainBonus= 0.12;
        this.calculateBaseStats(this.race, this.subJob);
        this.calculateGiftBonus(this.jobPoints)
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
        this.doubleAttack = this.subJob === 'warrior' ? 10 : 0
        this.katanaSkill = 276 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + parseInt(Math.min(this.katanaSkillMerits, 16))
        this.throwingSkill = 276 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + parseInt(Math.min(this.throwingSkillMerits, 16))
        this.daggerSkill = 230 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + parseInt(Math.min(this.daggerSkillMerits, 16))
        this.swordSkill = 225 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + parseInt(Math.min(this.swordSkillMerits, 16))
    }

    calculateGiftBonus(jobPoints){
        this.dakenBonus = 0
        this.pAttackBonus = 0
        this.pAccuracyBonus = 0
        this.rAttackBonus = 0
        this.rAccuracyBonus = 0
        this.wsDmgBonus = 0
        this.mAccuracyBonus = 0
        this.mAttackBonus = 0
        const pointMap = [
            {points: 10, gift: 'pAttackBonus', value: 10},
            {points: 10, gift: 'rAttackBonus', value: 10},
            {points: 30, gift: 'pAccuracyBonus', value: 8},
            {points: 30, gift: 'rAccuracyBonus', value: 8},
            {points: 45, gift: 'mAttackBonus', value: 4},
            {points: 80, gift: 'mAccuracyBonus', value: 7},
            {points: 150, gift: 'dakenBonus', value: 2},
            {points: 210, gift: 'pAttackBonus', value: 15},
            {points: 210, gift: 'rAttackBonus', value: 15},
            {points: 280, gift: 'pAccuracyBonus', value: 12},
            {points: 280, gift: 'rAccuracyBonus', value: 12},
            {points: 320, gift: 'mAttackBonus', value: 6},
            {points: 405, gift: 'mAccuracyBonus', value: 11},
            {points: 500, gift: 'dakenBonus', value: 3},
            {points: 660, gift: 'pAttackBonus', value: 20},
            {points: 660, gift: 'rAttackBonus', value: 20},
            {points: 780, gift: 'pAccuracyBonus', value: 16},
            {points: 780, gift: 'rAccuracyBonus', value: 16},
            {points: 845, gift: 'mAttackBonus', value: 8},
            {points: 980, gift: 'mAccuracyBonus', value: 14},
            {points: 1125, gift: 'dakenBonus', value: 4},
            {points: 1200, gift: 'wsDmgBonus', value: 5},
            {points: 1360, gift: 'pAttackBonus', value: 25},
            {points: 1360, gift: 'rAttackBonus', value: 25},
            {points: 1530, gift: 'pAccuracyBonus', value: 20},
            {points: 1530, gift: 'rAccuracyBonus', value: 20},
            {points: 1620, gift: 'mAttackBonus', value: 10},
            {points: 1805, gift: 'mAccuracyBonus', value: 18},
            {points: 2000, gift: 'dakenBonus', value: 5},
        ]
        pointMap.forEach((value) => {
            if(jobPoints > value.points){
                this[value.gift] += value.value
            }
        })
        this.pAttackBonus += this.subJob === 'warrior' ? 10 : 0
        this.rAttackBonus += this.subJob === 'warrior' ? 10 : 0
    }
}