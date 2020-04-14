import React from 'react'

function Home(props) {
    return (
    <div className="w3-container w3-round" style={{border: '1px solid #C0C0C0', backgroundColor: 'white'}}>
        <div className='w3-container w3-section w3-left-align w3-padding' style={{minHeight: '55vh', position: 'relative', zIndex: '1'}}>
            <div className='App-home'></div>
            <p>Hello from Quetzalcoatl!</p>
            <p>I'd first like to say thank you to all those who came before and contributed to the model we now accept as FFXI's damage calculation.  There are many more to thank who contributed to the data collection, english and japanese players alike. This is modeled on the Excel spreadsheet that I have done my best to maintain.</p>
            <p>I will warn anyone who proceeds to use this utility, this will not give you the absolute truth. Far too many factors exist to properly model the exact damage any combination of gearsets, playstyle, target mobs, player buffs, and target debuffs may incur. What this can do is give you an objective average for many useful metrics.</p><p>Before diving in, please remember one of our favorite sayings in FFXI: <i>"Shit's situational"</i> </p>
            <p>Gear additions, and further calculations are planned as updates necessitate. This site is best viewed on a desktop, if you are viewing this site from mobile, please enable desktop view.</p>
            <p><b>- Langly of Quetzalcoatl 2020</b> (In the COVID bunker)</p>
        </div>
    </div>
    )
}

export default Home;