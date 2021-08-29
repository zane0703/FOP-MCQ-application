function time() {
document.getElementById("categories").style.display="none"
var sec = 0,time=0;
var qust =[,"my name <br> is ","hi <br> j"]
function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval(function () {
        document.getElementById("minutes").textContent = (parseInt(sec / 60, 10)) + ":" + pad(++sec % 60);
    }, 1000);
}