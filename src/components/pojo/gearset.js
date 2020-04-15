export default class GearSet {
    constructor(){
        this.gear= {
            mainHand: '',
            mainHand: '',
            offHand: '',
            ranged: '',
            ammo: '',
            head: '',
            neck: '',
            ear1: '',
            ear2: '',
            body: '',
            hands: '',
            ring1: '',
            ring2: '',
            back: '',
            waist: '',
            legs: '',
            feet: '',
        }
        // this.delay= 0;
        this.hp= 0;
        this.str= 0;
        this.dex= 0;
        this.agi= 0;
        this.vit= 0;
        this.int= 0;
        this.chr= 0;
        this.mnd= 0;
        this.attack= 0;
        this.accuracy= 0;
        this.rAttack= 0;
        this.rAccuracy= 0;
        this.mAccuracy= 0;
        this.mDamage= 0;
        this.mAttkBonus= 0;
        this.katanaSkill= 0;
        this.daggerSkill= 0;
        this.swordSkill= 0;
        this.throwingSkill= 0;
        this.doubleAttack= 0;
        this.tripleAttack= 0;
        this.quadAttack= 0;
        this.storeTp= 0;
        this.haste= 0;
        this.wsDmg= 0;
        this.regain= 0;
        this.daken= 0;
        this.pdl= 0;
        this.critRate= 0;
        this.critDamage= 0;
        this.dualWield= 0;
    }
    getTotal(){
        // Should put into temp obj where all start at 0
        for(const [key, value] of Object.entries(this.gear)){
            if(typeof(value) === 'object'){
                for(const [k,v] of Object.entries(value)){
                    if(k !== 'name' && k !== 'type'){
                        if(!this[k]) this[k] = 0
                        this[k] += parseFloat(v, 10);
                    }
                }
            }
        }
        // Then copy to this obj
    }
}