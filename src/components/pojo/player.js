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
        this.crit= 5;
        this.pdl= 0.1;
        this.katanaSkill= 276;
        this.throwingSkill= 276;
        this.daggerSkill= 230;
        this.swordSkill= 225;
        this.dualWield= 35;
        this.doubleAttack= 0;
        this.tripleAttack= 0;
        this.quadrupleAttack= 0;
        this.daken= 40;
        this.strMerits= 15;
        this.dexMerits= 15;
        this.agiMerits= 15;
        this.intMerits= 15;
        this.vitMerits= 0;
        this.mndMerits= 15;
        this.chrMerits= 0;
        this.critMerits= 5;
        this.sangeMerits= 5;
        this.inninMerits= 5;
        this.inninJobPoints= 20;
        this.dakenBonus= 0;
        this.pAttackBonus= 0;
        this.pAccuracyBonus= 0;
        this.wsdmgBonus= 0;
        this.katanaSkillMerits= 16;
        this.throwingSkillMerits= 16;
        this.daggerSkillMerits= 16;
        this.swordSkillMerits= 16;
        this.bladeShunMerits= 5;
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
        this.katanaSkill = 276 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + parseInt(Math.min(this.katanaSkillMerits, 16))
        this.throwingSkill = 276 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + parseInt(Math.min(this.throwingSkillMerits, 16))
        this.daggerSkill = 230 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + parseInt(Math.min(this.daggerSkillMerits, 16))
        this.swordSkill = 225 + 5*(Math.max(0, Math.min(localLevel-75, 5)))+6*(Math.max(0, Math.min(localLevel-80, 10)))+7*(Math.max(0, localLevel-90)) + parseInt(Math.min(this.daggerSkillMerits, 16))
    }

    calculateGiftBonus(jobPoints){
        if(this.jobPoints >= 2100){
            this.dakenBonus = 12;
            this.pAttackBonus = 70;
            this.pAccuracyBonus = 56;
            this.wsdmgBonus = 5;
        }
    }
}