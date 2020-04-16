import GearSet from './gearset';
import * as gear from '../datafiles/weapons.json'

const gearList = gear.default

test('Check the retrieval of stats.', () => {
    let gearSet1 = new GearSet()
    gearSet1.gear.mainhand = gearList[gearList.findIndex(value => value.name === "Tauret")]
    gearSet1.gear.offHand = gearList[gearList.findIndex(value => value.name === "Ochu Aug")]
    gearSet1.getTotal()
    // Test totalling twice just in case.
    gearSet1.getTotal()
    expect(gearSet1.dex).toBe(37)
    expect(gearSet1.delay).toBe(407)
})