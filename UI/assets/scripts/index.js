const getAll = async () => {
    const response = await fetch('https://property-prolite2.herokuapp.com/api/v2/properties');
    const json = await response.json();
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
            `;
        });
        advert.innerHTML = ad;
    }
}

const logform = document.forms['login-form'];
console.log(logform);
logform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = logform.querySelector('#email').value;
    const password = logform.querySelector('#password').value;
    const user = {
            "email": email,
            "password": password
        }
    const res = await login(user);
    console.log(res);
    await Reqresponse(res);
    return;
})

const login = async (user) => {
    try{
    await loader(".LoaderBalls", "LoaderBalls flex");
    const rawResponse = await fetch('https://property-prolite2.herokuapp.com/api/v2/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();
  console.log(content);
  await timeout(500);
  await loader(".LoaderBalls", "LoaderBalls hide");
  return content;
} catch (e) {
    console.log(e);
    await loader(".LoaderBalls", "LoaderBalls hide");
    document.location.href = './home'
}
}

const Reqresponse = async (res) => {
    if (res.status == 200) {
        const { token } = res.data;
        localStorage.setItem('token', token);
        console.log("succcess");
        logform.reset();
        await notification("#success", "success show", res.message);
        document.location.href = './home'
        return;
    }

    if (res.status == 400) {
        await notification("#error", "error show", res.error);
        return;
    }

    if (res.status == 409) {
        await notification("#error", "error show", res.error);
        return;
    }
    await notification("#warning", "warning show", "Ooops something went wrong, try to register again!");
    return;
}

const notification = async (id, classname, message = null) => {
    const notify = document.querySelector(id);
    notify.innerHTML = message;
    notify.className = classname;
    if (id==="#success"){
        await timeout(1000);
    } else {
        await timeout(10000);
    }
    notify.className = "hide";
    return;
}

const loader = async (cls, classname) => {
    const notify = document.querySelector(cls);
    notify.className = classname;
    return;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

getAll();
