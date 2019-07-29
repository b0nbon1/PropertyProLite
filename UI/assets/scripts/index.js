const getAll = async () => {
    const response = await fetch('https://property-prolite2.herokuapp.com/api/v2/properties');
    const json = await response.json();
    console.log(json);
    if (json.status != 200) {
        console.log(json.error)
        return;
    }
    else {
        const advert = document.querySelector('#advert')
        const { data } = json;
        let ad = '';
        data.forEach((prop) => {
            let {price, address, type, status, imageurl, id} = prop;
            ad += `
            <div class="card">
            <a href="./advert#${id}">
                <div class="cover-image">
                    <img class="image" src=${imageurl} alt="property picture">
                    <div class="price-block">
                        <span class="status not-avail">
                            ${status}
                        </span>
                        <span class="price">
                            <h1>${price}</h1>
                        </span>
                    </div>
                    
                </div>
                <div class="details">
                    ${address}
                <a href="./advert"><h1>${type}</h1></a>
                </div>
            </a>
            </div>
            `
        })
        advert.innerHTML = ad;
        console.log(advert);
        
    }
}

getAll();

