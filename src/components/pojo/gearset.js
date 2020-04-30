export default class GearSet {
    constructor(set){
        this.setName = '';
        this.gear= {
            mainhand: {},
            offhand: {},
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
        this.throwingSkill= 0;
        this.doubleAttack= 0;
        this.tripleAttack= 0;
        this.quadAttack= 0;
        this.storeTp= 0;
        this.haste= 0;
        this.wsDamage= 0;
        this.regain= 0;
        this.daken= 0;
        this.pdl= 0;
        this.critRate= 0;
        this.critDamage= 0;
        this.dualWield= 0;
        this.mainhand= {
            skill: 0,
            type: '',
        };
        this.offhand= {
            skill: 0,
            type: '',
        };
    }
    getTotal(){
        let tempTotals = {}
        let catalogable = ['hp','str','dex','agi','vit','int','chr','mnd','attack','accuracy','rAttack','rAccuracy','mAccuracy','mDamage','mAttackBonus','throwingSkill',
                            'doubleAttack','tripleAttack','quadAttack','storeTp','haste','wsDamage','regain','daken','pdl','critRate','critDamage','dualWield']
        for(const [key, value] of Object.entries(this.gear)){
            if(typeof(value) === 'object'){
                for(const [k,v] of Object.entries(value)){
                    if(catalogable.includes(k)){
                        if(!tempTotals[k]) tempTotals[k] = 0
                        tempTotals[k] += parseFloat(v, 10);
                    }
                    if(key === 'mainhand' && k === 'mainhand'){
                        console.log('hit')
                        for(const [i,e] of Object.entries(v)){
                            if(!tempTotals[i]) tempTotals[i] = 0
                            tempTotals[i] += parseFloat(e, 10);
                        }
                    }
                    if(k === 'combatSkill'){
                        if(!tempTotals[key]) tempTotals[key] = {}
                        if(value.type && value.type === 'dagger') {
                            if(!tempTotals[key].skill) tempTotals[key].skill = 0
                            tempTotals[key].type = 'dagger'
                            tempTotals[key].skill += parseFloat(v, 10);
                        }
                        if(value.type && value.type === 'katana') {
                            if(!tempTotals[key].skill) tempTotals[key].skill = 0
                            tempTotals[key].type = 'katana'
                            tempTotals[key].skill += parseFloat(v, 10);
                        }
                        if(value.type && value.type === 'sword') {
                            if(!tempTotals[key].skill) tempTotals[key].skill = 0
                            tempTotals[key].type = 'sword'
                            tempTotals[key].skill += parseFloat(v, 10);
                        }
                    }
                }
            }
        }
        for(const [key, value] of Object.entries(tempTotals)){
            this[key] = value
        }
    }
}