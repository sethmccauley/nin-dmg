import GearSet from './gearset';
import * as gear from '../datafiles/weapons.json'

const gearList = []

for(const [key,value] of Object.entries(gear.default)){
    gearList.push(key)
}

test('Check the retrieval of stats.', () => {
    let gearSet1 = new GearSet()
    gearSet1.mainhand = gear.Tauret
    gearSet1.offHand = gear['Ochu Aug']
    expect(gearSet1.getTotal('dex')).toBe(37)
    expect(gearSet1.getTotal('delay')).toBe(407)
})