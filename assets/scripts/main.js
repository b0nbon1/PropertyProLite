/* preloader */
window.addEventListener("load", function(){
    var preloader = this.document.getElementById("preloader");
    this.document.body.removeChild(preloader);
});

/*footer date */
date = new Date().getFullYear();
console.log(date);
document.getElementById("current-date").innerHTML = date;