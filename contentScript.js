console.log('Hello from the content script!');


function getJobs() {
    let jobsElementInformation = document.querySelectorAll('div[id*=jobcard]');
    jobsElementInformation = [ ... jobsElementInformation];

    const jobJsonInformation = jobsElementInformation.map((element) => {
        const [
        {href:url},
        {
            children: [
            {
                children: [
                {innerText: fecha}, 
                {innerText:title},
                {innerText:salary},
                ],
            },
        ],
    },
    ] = element.children;

    return{url, fecha, title, salary};
    });

    return jobJsonInformation;
}

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function ({cmd}) {
    if(cmd=="scraping"){
      const jobsInformation = getJobs();
      port.postMessage({msg: jobsInformation});
    } 
});
    
});
