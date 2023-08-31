const canvas = document.getElementById("game"); //canvas değişkeninde yapılacak her türlü değişiklik elementi değiştirir - referans tip
const ctx = canvas.getContext("2d");

let interval; //clear etmek gerekebileceğiden değişken oluşturldu.

const height = canvas.height;
const width = canvas.width;

let x = width / 2;
let y = height - 30;

let dx = 2;
let dy = -2;

let ballColor = "#0095DD";

//arrow function
const oyunCiz = () =>{
    tahtayiTemizle();
    topCiz();

    if(x + dx > width - 15 || x + dx < 15){ //canvasın kenarına çarptığında
        dx = -dx; //ters yönde hareket et
        ballColor = "red";
    }
    if(y + dy > height - 15 || y + dy < 15){
        dy = -dy;
        ballColor = "#0095DD";
    }


    x += dx;
    y += dy;

}

const tahtayiTemizle = () => {
    ctx.clearRect(0,0,width,height);
}

const topCiz = () =>{
    ctx.beginPath(); //çizim yapılacağını belirtir
    ctx.arc(x, y, 15, 0, Math.PI * 2); //yuvarlak tipte
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

interval = setInterval(oyunCiz,10); //10ms de bir yenilenecek