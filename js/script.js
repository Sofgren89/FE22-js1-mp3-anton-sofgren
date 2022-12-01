//knapp

const btn = document.querySelector("#lang-btn");

//Sök land

btn.addEventListener('click', getLand)

function getLand(event) {
    event.preventDefault();
    const input = document.querySelector('#lang-input');


    const lang = input.value.toLowerCase();
  

    fetchLand(lang);
}

function fetchLand(lang) {
    const url = `https://restcountries.com/v3.1/lang/${lang}`

    //Felmeddelande

    fetch(url)
        .then(response => {
            if (response.status >= 200 && response.status < 300)
                return response.json()
            else throw 'Country not found, please try again'
        }
        )
        .then(displayLand)
        .catch(error => alert(error))
}


//Land info

function displayLand(landData) {
    const landContainer = document.querySelector('#land-container')
    landContainer.innerHTML = '';

    for (let i = 0; i < landData.length; i++) {

        const landName = document.createElement('h1')
        landContainer.appendChild(landName)
        landName.innerText = "Country:" + landData[i].name.common

        landContainer.classList.add("largest")



        //official

        const offName = document.createElement('h1')
        landContainer.appendChild(offName)
        offName.innerText = landData[i].name.official

        //subregion

        const subName = document.createElement('h2')
        landContainer.appendChild(subName)
        subName.innerText = landData[i].subregion

        //huvudstad

        const capName = document.createElement('h3')
        landContainer.appendChild(capName)
        capName.innerText = landData[i].capital

        //population

        const popName = document.createElement('h3')
        landContainer.appendChild(popName)
        popName.innerText = "Population:" + landData[i].population



        //flagga

        const img = document.createElement('img')
        landContainer.appendChild(img)
        img.src = landData[i].flags.png

        //Markera land (störst land behåller sin färg "röd")

        for (let j = 0; j < landData.length; j++) {
            if (landData[j].population > landData[i].population) {
                landContainer.classList.remove("largest")
                landName.style.color = 'blue'
                
                landContainer.style.color = 'red'
            }
       
        }

    }

}









