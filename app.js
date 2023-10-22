const daily = document.querySelector(".timeframe-daily");
const weekly = document.querySelector(".timeframe-weekly");
const monthly = document.querySelector(".timeframe-monthly");
const timeframes = document.querySelectorAll(".timeframe");


const currentTimesTrackers = document.querySelectorAll(".current");
const previousTimesTrackers = document.querySelectorAll(".previous")

const tabCurrentTimesTrackers = [...currentTimesTrackers];
const tabPreviousTimesTrackers = [...previousTimesTrackers];


//import de Data.json

async function fetchData (){
    try{
        const response = await fetch("./data.json");

        if(!response.ok){
            throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json()

        console.log(data);

        updateTimeframe(data);
    }

    catch(error){
        console.error(error);
    }


}

fetchData()

timeframes.forEach(timeframe =>{
    timeframe.addEventListener("click", selectTimeframe)
    timeframe.addEventListener("click", updateTimeframe)
})

function selectTimeframe(e){
    timeframes.forEach(timeframe =>{
        timeframe.classList.remove("active");
    })
    if(e.target.tagName === "LI"){
        e.target.classList.add("active")
        console.log(e.target);
    }

    fetchData()
}


function updateTimeframe(data){
    if(daily.classList.contains("active")){
        for(let i = 0; i < tabCurrentTimesTrackers.length; i++){
            tabCurrentTimesTrackers[i].textContent = `${data[i].timeframes.daily.current}hrs`
        }
        for(let i = 0; i < tabPreviousTimesTrackers.length; i++){
            tabPreviousTimesTrackers[i].textContent = `Last Day - ${data[i].timeframes.daily.previous}hrs`
        }
    }
    else if(weekly.classList.contains("active")){
        for(let i = 0; i < tabCurrentTimesTrackers.length; i++){
            tabCurrentTimesTrackers[i].textContent = `${data[i].timeframes.weekly.current}hrs`
        }
        for(let i = 0; i < tabPreviousTimesTrackers.length; i++){
            tabPreviousTimesTrackers[i].textContent = `Last Day - ${data[i].timeframes.weekly.previous}hrs`
        }
    }
    else if(monthly.classList.contains("active")){
        for(let i = 0; i < tabCurrentTimesTrackers.length; i++){
            tabCurrentTimesTrackers[i].textContent = `${data[i].timeframes.monthly.current}hrs`
        }
        for(let i = 0; i < tabPreviousTimesTrackers.length; i++){
            tabPreviousTimesTrackers[i].textContent = `Last Day - ${data[i].timeframes.monthly.previous}hrs`
        }
    }
}
