let users = []; 
let currentIndex = -1;
const container = document.getElementById('content');

fetch('maps.json')
    .then(response => response.json())
    .then(data => {
        maps = data || [];
    })
    .catch(error => {
        console.error('Error loading maps.json:', error);
    });

function showUser(user) {
    if (!user) return;
    function countryCodeToEmoji(code) {
        return code
            .toUpperCase()
            .replace(/./g, char => 
                String.fromCodePoint(127397 + char.charCodeAt())
            );
    }
    container.innerHTML = `
        <div class="uinfo">
            <img id="avatar" src="${user.Avatar}" alt="${user.Player}">
            <div id="player">${user.Player}</div>
            <div id="flag">${countryCodeToEmoji(user.Flag)}</div>
            <div id="seedbox">Seed <span class="invert">#${user.Seed}</span></div>
            <div id="avgscr">Avg. Score: ${user["Avg Score"]}</div>
            <div id="avgrank">Avg. Seed: ${user["Avg Rank"]}</div>
        </div>
        <div class="mapstats">
            <div id="nm" class="pickpool">
                <div class="pickhead invert">NM</div>
                <div class="nm">
                    <div>
                        <div class="pickname">NM1</div>
                        <div class="picksong">${maps.NM1}</div>
                    </div>
                    <div class="pickscore">${user["NM1s"]}</div>
                    <div class="pickseed invert">#${user["NM1"]}</div>
                </div>
                <div class="nm">
                    <div>
                        <div class="pickname">NM2</div>
                        <div class="picksong">${maps.NM2}</div>
                    </div>
                    <div class="pickscore">${user["NM2s"]}</div>
                    <div class="pickseed invert">#${user["NM2"]}</div>
                </div>
                <div class="nm">
                    <div>
                        <div class="pickname">NM3</div>
                        <div class="picksong">${maps.NM3}</div>
                    </div>
                    <div class="pickscore">${user["NM3s"]}</div>
                    <div class="pickseed invert">#${user["NM3"]}</div>
                </div>
            </div>
            <div id="hd" class="pickpool">
                <div class="pickhead invert">HD</div>
                <div class="hd">
                    <div>
                        <div class="pickname">HD1</div>
                        <div class="picksong">${maps.HD1}</div>
                    </div>
                    <div class="pickscore">${user["HD1s"]}</div>
                    <div class="pickseed invert">#${user["HD1"]}</div>
                </div>
                <div class="hd">
                    <div>
                        <div class="pickname">HD2</div>
                        <div class="picksong">${maps.HD2}</div>
                    </div>
                    <div class="pickscore">${user["HD2s"]}</div>
                    <div class="pickseed invert">#${user["HD2"]}</div>
                </div>
            </div>
            <div id="hr" class="pickpool">
                <div class="pickhead invert">HR</div>
                <div class="hr">
                    <div>
                        <div class="pickname">HR1</div>
                        <div class="picksong">${maps.HR1}</div>
                    </div>
                    <div class="pickscore">${user["HR1s"]}</div>
                    <div class="pickseed invert">#${user["HR1"]}</div>
                </div>
                <div class="hr">
                    <div>
                        <div class="pickname">HR2</div>
                        <div class="picksong">${maps.HR2}</div>
                    </div>
                    <div class="pickscore">${user["HR2s"]}</div>
                    <div class="pickseed invert">#${user["HR2"]}</div>
                </div>
            </div>
            <div id="dt" class="pickpool">
                <div class="pickhead invert">DT</div>
                <div class="hr">
                    <div>
                        <div class="pickname">DT1</div>
                        <div class="picksong">${maps.DT1}</div>
                    </div>
                    <div class="pickscore">${user["DT1s"]}</div>
                    <div class="pickseed invert">#${user["DT1"]}</div>
                </div>
                <div class="hr">
                    <div>
                        <div class="pickname">DT2</div>
                        <div class="picksong">${maps.DT2}</div>
                    </div>
                    <div class="pickscore">${user["DT2s"]}</div>
                    <div class="pickseed invert">#${user["DT2"]}</div>
                </div>
            </div>
        </div>
    `;
}

fetch('seeds.json')
    .then(response => response.json())
    .then(data => {
        users = data || [];
        //showUser(users[currentIndex]);
    })
    .catch(error => {
        console.error('Error loading seeds.json:', error);
    });

document.body.addEventListener('click', function() {
    
    const seed = document.getElementById("tseed")

    document.getElementById('transition').classList.add('active');
    currentIndex = (currentIndex + 1) % users.length;
    seed.innerHTML= users[currentIndex]["Seed"];
    // wait 2s
    setTimeout(() => {
        
        if (users.length === 0) return;
        
        showUser(users[currentIndex]);
        setTimeout(() => {
            document.getElementById('transition').classList.remove('active');
        }, 1000);
    }, 500);

});
