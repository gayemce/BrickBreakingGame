const canvas = document.getElementById("game"); //canvas değişkeninde yapılacak her türlü değişiklik elementi değiştirir - referans tip
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", myKeydownFunction) //event, function

let interval; //clear etmek gerekebileceğiden değişken oluşturldu.

let oyunBasladiMi = false;

const height = canvas.height;
const width = canvas.width;

let x = width / 2;
let y = height - 30;

let dx = 2;
let dy = -2;

let ballColor = "#0095DD";

let cubukGenisligi = 150;
let cubukYüksekligi = 10;
let cubukX = (width - cubukGenisligi)/2;
let cubukY = (height - cubukYüksekligi);

let tuglaSatirSayisi = 3;
let tuglaSutunSayisi = 5;
const tuglaGenislik = 75;
const tuglaYukseklik = 20;
const tuglaOffSetTop = 30;
const tuglaOffSetLeft = 30;
const tuglaPadding = 10;
const tuglalar = [];

for(let k = 0; k < tuglaSutunSayisi; k++){
    tuglalar[k] = [];
    for(let s = 0; s < tuglaSatirSayisi; s++){
        tuglalar[k][s] = {x: 0, y:0, status: 1};
    }
}

let skor = 0;
let can = 3;
let isGameOver = false;

//arrow function
const oyunCiz = () =>{
    tahtayiTemizle();
    topCiz();
    topunKonumunuDegistir();
    cubukCiz();
    tuglalariCiz();
    tuglayaCarptiMi();
    skoruCiz();
    canCiz();
    if(oyunBaslatYazisiCiz()) return;
}

const tahtayiTemizle = () => {
    ctx.clearRect(0,0,width,height);
}

const topCiz = () =>{
    ctx.beginPath(); //çizim yapılacağını belirtir
    ctx.arc(x, y, 10, 0, Math.PI * 2); //yuvarlak tipte
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

const topunKonumunuDegistir = () =>{ 
    if(x + dx > width - 10 || x + dx < 10){ //canvasın kenarına çarptığında
        dx = -dx; //ters yönde hareket et
        // ballColor = "red";
    }
    if( y + dy < 10){ //yukarı çarptığında
        dy = -dy;
    }
    else if(y + dy > cubukY - 10 && y + dy < cubukY + 10 && x > cubukX && x < cubukX + cubukGenisligi){ // çubuğa çarptığında
        dy = -dy;
    }
    else if(y + dy > height - 10){ // aşağı çarptığında
        if(x < cubukX || x > cubukX + cubukGenisligi)
        {
            can--;
            if(can === 0)
            {
                ctx.font = "25px Verdana";
                ctx.fillStyle = "red";
                ctx.fillText("Game Over!", width/2 - 70, height/2);
                clearInterval(interval);
                isGameOver = true;
                oyunBasladiMi = false;
            }
        }
        dy = -dy;
    }

    x += dx;
    y += dy;
}

const cubukCiz = () => {
    ctx.beginPath();
    ctx.rect(cubukX, cubukY, cubukGenisligi, cubukYüksekligi); //kare tipte
    ctx.fill();
    ctx.closePath();
}

oyunCiz();

const oyunBaslat = () =>{
    if(oyunBasladiMi === false){
        interval = setInterval(oyunCiz,20);
        oyunBasladiMi = true;
    }
    else{
        clearInterval(interval);
        oyunBasladiMi = false;

        ctx.fillStyle = "black";
        ctx.font = "20px Verdana";
        ctx.fillText(`Oyun Duraklatıldı`, width/2 - 80, height/2);
    }
}

function myKeydownFunction(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        if(cubukX + 5 > width - cubukGenisligi) return;
            cubukX += 5;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft"){
        if(cubukX - 5 < 0) return;
        cubukX -= 5;
    }
}