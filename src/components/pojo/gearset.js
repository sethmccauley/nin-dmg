export default class GearSet {
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
    getTotal(attr){
        let attrTotal = 0;
        for(const [key,value] of Object.entries(this)){
            if(typeof(value) === 'object'){
                for(const [k,v] of Object.entries(value)){
                    if(k === attr){
                        attrTotal += parseInt(v);
                    }
                }
            }
        }
        return attrTotal;
        // return {hp: 0, str: 0, dex: 0, agi: 0, vit: 0, int: 0, chr: 0, mnd: 0,
        //         attack: 0, accuracy: 0, rangedAttack: 0, rangedAccuracy: 0,
        //         katanaSkill: 0, daggerSkill: 0, swordSkill: 0, throwingSkill: 0,
        //         doubleAttack: 0, tripleAttack: 0, quadAttack: 0, storeTp: 0,
        //         haste: 0, regain: 0, daken: 0, pdl: 0, critRate: 0, critDamage: 0,
        //         dualWield: 0
        //     }
    }
}