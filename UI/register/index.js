const logform = document.forms['login-form'];
console.log(logform);
logform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fname = logform.querySelector('#fname').value;
    const lname = logform.querySelector('#lname').value;
    const phoneNumber = logform.querySelector('#phoneNumber').value;
    const address = logform.querySelector('#address').value;
    const email = logform.querySelector('#email').value;
    const password = logform.querySelector('#password').value;
    const user = {
            "firstname": fname,
            "lastname": lname,
            "address": address,
            "phoneNumber": phoneNumber,
            "email": email,
            "password": password
        }
    const res = await newUser(user);
    console.log(res);
    await Reqresponse(res);
    return;
})

const newUser = async (user) => {
    try{
    await loader(".LoaderBalls", "LoaderBalls flex");
    const rawResponse = await fetch('https://property-prolite2.herokuapp.com/api/v2/auth/signup', {
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
    document.location.href = '../register'
}
}

const Reqresponse = async (res) => {
    if (res.status == 201) {
        const { token } = res.data;
        localStorage.setItem('token', token);
        console.log("succcess");
        logform.reset();
        await notification("#success", "success show", res.message);
        document.location.href = '../account'
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