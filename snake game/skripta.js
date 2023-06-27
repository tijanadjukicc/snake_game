//uvod
function predjiNaIgru(){
    document.getElementById("greska").textContent="";
    let tezina="";
    let dimenzije="";

    let tezinaRadio = document.getElementsByClassName("tezina");
    for(let i = 0; i<tezinaRadio.length; i++){
        if(tezinaRadio[i].checked==true){
            tezina = tezinaRadio[i].id;
            break;
        }
    }
    if(tezina==""){
        
        $('#greska').append("Podesite igru pre početka!");
        return;
    }

    let dimenzijeRadio = document.getElementsByClassName("dimenzije");
    for(let i = 0; i<dimenzijeRadio.length; i++){
        if(dimenzijeRadio[i].checked==true){
            dimenzije = dimenzijeRadio[i].id;
            break;
        }
    }

    if(dimenzije==""){
        $('#greska').append("Podesite igru pre početka!");
        return;
    }

    window.location.href="zmijica-igra.html";
    localStorage.setItem("tezina", tezina);
    localStorage.setItem("dimenzije", dimenzije);
}

//igra
let tezina;
let dimenzije;

function inicijalizacija(){
    $("#scoreBoard").append("0");
    tezina =localStorage.getItem("tezina");
    dimenzije=localStorage.getItem("dimenzije");

    if(dimenzije=="81") dimenzije = 9;
    else if(dimenzije=="144") dimenzije = 12;
    else dimenzije = 16;

    if(tezina=="lako") tezina = 1000;
    else if(tezina == "srednje") tezina = 300;
    else tezina = 100;

    $("#kraj").hide();
}



function obojiTabeluKaoSahTablu(col, r, c){
    if((r+c)%2==0)col.style.backgroundColor="rgb(148, 127, 255)";
    else col.style.backgroundColor =" rgb(67, 40, 203)";
}

function dodajSlikuUKolonu(col, r, c, ime){
    let img = document.createElement("img");
    img.alt =ime;
    img.id = ime+r+'-'+c;
    img.className ="vocke";
    img.src = "zmijica-dodatno/"+ime+".png";

    col.appendChild(img);
}

function sakrijSliku(r, c, ime){
    $("#"+ime+r+"-"+c).hide();
}

function prikaziSliku(r, c, ime){
    $("#"+ime+r+"-"+c).show();
}

function randomPostavljanjeSlike(ime){
    let r;
    let c;
    if(ime=="") ime = "lubenica";
    do{
        r = Math.floor(Math.random()*dimenzije);
        c = Math.floor(Math.random()*dimenzije);
    }while(document.getElementById("paradajz"+r+"-"+c).style.display!="none"||document.getElementById("lubenica"+r+"-"+c).style.display!="none"||document.getElementById("zelenaZ"+r+"-"+c).style.display!="none"||document.getElementById("crvena"+r+"-"+c).style.display!="none");
   

    prikaziSliku(r, c, ime);
}

function dodajPoene(dodaj){
    let poeni = parseInt(document.getElementById("scoreBoard").innerText);
    poeni+=dodaj;
    document.getElementById("scoreBoard").innerText = poeni;
}

function napraviTabelu(){
    let tabela = document.getElementById("polje");
    for(let i = 0; i<dimenzije; i++){
        let row = document.createElement("tr");
        for(let j = 0; j<dimenzije; j++){
            let col = document.createElement("td");
            col.id = i+"-"+j;
            obojiTabeluKaoSahTablu(col, i, j);
            col.style.height = "calc( 500px /"+ dimenzije+")";
            col.style.width = "calc( 500px /"+ dimenzije+")";


            dodajSlikuUKolonu(col, i, j, "lubenica");
            dodajSlikuUKolonu(col, i, j, "paradajz");
            dodajSlikuUKolonu(col, i, j, "zelenaZ");
            dodajSlikuUKolonu(col, i, j, "crvena");


            row.appendChild(col);
            tabela.appendChild(row);

            sakrijSliku(i, j, "lubenica");
            sakrijSliku(i, j, "paradajz");
            sakrijSliku(i, j, "zelenaZ");
            sakrijSliku(i, j, "crvena");

        }
    }
}

function krajIgre(){
    zaustavi();
    console.log(zmijica);
    let poeni = parseInt(document.getElementById("scoreBoard").innerText);
    document.getElementById("ostvareniPoeni").innerText = "broj poena: "+poeni;

    $("#igraPanel").hide();
    $("#kraj").show();
}


let rezultati=[];
function pokupiUseraIPoene(){ //dodati proveru da li korisnik vec postoji
    let user = document.getElementById("user").value;
    let poeni = document.getElementById("scoreBoard").innerText;
    if(user == ""){
        document.getElementById("user").style.boxShadow ="3px  -3px  9px 7px rgba(255, 0, 0, 0.517) inset";
    }
    else{
        let dosadasnjiPoeni = localStorage.getItem("rezultati");
        if(dosadasnjiPoeni==null){
            rezultati.push({ime:user, pt:poeni});
            localStorage.setItem("rezultati", JSON.stringify(rezultati));
        }
        else{
            dosadasnjiPoeni =  JSON.parse(dosadasnjiPoeni);
            dosadasnjiPoeni.push({ime:user, pt:poeni});
            localStorage.setItem("rezultati", JSON.stringify(dosadasnjiPoeni));
        }
        window.location.href="zmijica-rezultati.html";

    }
}

function slobodna(r, c){
    if(document.getElementById("paradajz"+r+"-"+c).style.display!="none"||document.getElementById("lubenica"+r+"-"+c).style.display!="none"||document.getElementById("zelenaZ"+r+"-"+c).style.display!="none"||document.getElementById("crvena"+r+"-"+c).style.display!="none") false;
    return true;
}

function produziSe(){
    let rep = zmijica[zmijica.length-1];
    let r = rep.red;
    let c = rep.kolona;

    if(c+1!=dimenzije && slobodna(r, c) && innerSmer!="desno"){
        zmijica.push({red:r, kolona:c+1});
    }
    else if(c-1!=-1 && slobodna(r, c) && innerSmer!="levo"){
        zmijica.push({red:r, kolona:c-1});
    }
    else if(r-1!=-1 && slobodna(r, c) && innerSmer!="gore"){
        zmijica.push({red:r-1, kolona:c});
    }
    else if(r+1!=dimenzije && slobodna(r, c) && innerSmer!="dole"){
        zmijica.push({red:r+1, kolona:c});
    }
}

function pojedi(r, c, index){
    if(document.getElementById("zelenaZ"+r+"-"+c).style.display!="none" && index==1){
        console.log("sudar sa samim sobom"+index);
        krajIgre();
    }
    else if(document.getElementById("paradajz"+r+"-"+c).style.display!="none"){
        sakrijSliku(r,c,"paradajz");
        dodajPoene(1);
        randomPostavljanjeSlike("paradajz");
        produziSe();

    }
    else if(document.getElementById("lubenica"+r+"-"+c).style.display!="none"){
        sakrijSliku(r,c,"lubenica");
        dodajPoene(10);
        produziSe();
    }
}

let smerKretanja = "levo";
let innerSmer = "levo";
let prevR, prevC;
function pomeriZmijicu(){
    
    prevR = -1, prevC=-1, r = -1;

    innerSmer =smerKretanja;
    let j = 1;
    while(j<zmijica.length)
    {
        while(innerSmer=="desno"&&j<zmijica.length){
            r=jedanDesno(j);
            if(innerSmer=="desno") j++;
        }
        while(innerSmer=="dole"&&j<zmijica.length){
            r=jedanDole(j);
            if(innerSmer=="dole") j++;
        }
        while(innerSmer=="levo"&&j<zmijica.length){
            r=jedanLevo(j);
            if(innerSmer=="levo") j++;
        }
        while(innerSmer=="gore"&&j<zmijica.length){
            r=jedanGore(j);
            if(innerSmer=="gore") j++;
        }
    }
    
}

function jedanDesno(index){
    let c = parseInt(zmijica[index].kolona);
    let r = parseInt(zmijica[index].red);

    if(prevR!=-1 && r!=prevR){ 
        if(prevR>r)innerSmer = "dole";
        else innerSmer ="gore";
        return -1;
    }
    prevR = r;
    prevC = c;

    sakrijSliku(r, c, "zelenaZ");
    sakrijSliku(r, c, "crvena");

    c+=1;
    
    if(c == dimenzije){
        console.log("desni sudar");
        krajIgre();
    }
    else{
        zmijica[index].kolona = c;
        pojedi(r,c, index);
        prikaziZmijicu(index);
        return r;
    }
}

function jedanLevo(index){
    let c = parseInt(zmijica[index].kolona);
    let r = parseInt(zmijica[index].red);

    if(prevR!=-1 && r!=prevR){ 
        if(prevR>r)innerSmer = "dole";
        else innerSmer ="gore";
        return -1;
    }
    prevR = r;
    prevC = c;

    sakrijSliku(r, c, "zelenaZ");
    sakrijSliku(r, c, "crvena");

    c-=1;
    if(c == -1){
        console.log("levi sudar");
        krajIgre();
    }
    else{
        zmijica[index].kolona = c;
        pojedi(r,c, index);
        prikaziZmijicu(index);
        return r;
    }
}

function jedanDole(index){
    let c = parseInt(zmijica[index].kolona);
    let r = parseInt(zmijica[index].red);

    if(prevC!=-1 && c!=prevC){ 
        if(prevC>c)innerSmer = "desno";
        else innerSmer ="levo";
        return -1;
    }

    prevR = r;
    prevC = c;

    sakrijSliku(r, c, "zelenaZ");
    sakrijSliku(r, c, "crvena");
    r+=1;
    if(r==dimenzije){
        console.log("donji sudar");
        krajIgre();
    }
    else{
        zmijica[index].red = r;
        pojedi(r,c, index);
        prikaziZmijicu(index);
        return r;
    }
}

function jedanGore(index){
    let c = parseInt(zmijica[index].kolona);
    let r = parseInt(zmijica[index].red);

    if(prevC!=-1 && c!=prevC){ 
        if(prevC>c)innerSmer = "desno";
        else innerSmer ="levo";
        return -1;
    }

    prevR = r;
    prevC = c;

    sakrijSliku(r, c, "zelenaZ");
    sakrijSliku(r, c, "crvena");
    r-=1;
    if(r==-1){
        console.log("gornji sudar");
        krajIgre();
    }
    else{
        zmijica[index].red = r;
        pojedi(r,c, index);
        prikaziZmijicu(index);
        return r;
    }
}

function prikaziZmijicu(pocetak){
    for(let i = 1; i<zmijica.length; i++){
        let r = parseInt(zmijica[i].red);
        let c = parseInt(zmijica[i].kolona);
        if(i==1) prikaziSliku(r, c, "crvena");
        else prikaziSliku(r, c, "zelenaZ");    
    }
}

function inicijalizujZmijicu(){
    zmijica.push({red:"6", kolona:"5"});
    zmijica.push({red:"6", kolona:"6"});
    zmijica.push({red:"6", kolona:"7"});
    prikaziZmijicu(1);
}

function strelice(){
    document.addEventListener("keydown", function(e){
        if(e.key=="ArrowRight"){
            if(smerKretanja!="levo")smerKretanja = "desno";
        }
        else if(e.key=="ArrowDown"){
            if(smerKretanja!="gore")smerKretanja="dole";
        }
        else if(e.key=="ArrowLeft"){
            if(smerKretanja!="desno")smerKretanja = "levo";
        }
        else if(e.key=="ArrowUp"){
            if(smerKretanja!="dole")smerKretanja = "gore";
        }
    }
    );
}

let handler, handlerSuperVocka, handlerSkloniVocku;
function zapocni(){
    let randomLR;
    let randomLC;
    handler = setInterval(pomeriZmijicu, tezina);
    handlerSuperVocka = setInterval(function(){
        randomLR;
        randomLC;
        ime = "lubenica";
        do{
            randomLR = Math.floor(Math.random()*dimenzije);
            randomLC = Math.floor(Math.random()*dimenzije);
        }while(document.getElementById("paradajz"+randomLR+"-"+randomLC).style.display!="none"||document.getElementById("lubenica"+randomLR+"-"+randomLC).style.display!="none"||document.getElementById("zelenaZ"+randomLR+"-"+randomLC).style.display!="none"||document.getElementById("crvena"+randomLR+"-"+randomLC).style.display!="none");
       
        prikaziSliku(randomLR, randomLC, ime);
    }, 10000);
    handlerSkloniVocku = setInterval(function(){
        sakrijSliku(randomLR, randomLC, "lubenica");
    },15000);
}

function zaustavi(){
    clearInterval(handler);
    clearInterval(handlerSuperVocka);
    clearInterval(handlerSkloniVocku);
}


let zmijica=[{
    red:"_",
    kolona:"_"
}]; //ovo ispade nepotrebno
function startZmijica(){
    inicijalizacija();
    napraviTabelu();
    inicijalizujZmijicu();
    strelice();
    randomPostavljanjeSlike("paradajz");

    // prikaziSliku(10, 11, "paradajz");
    // prikaziSliku(9, 11, "paradajz");

    zapocni();
}

function otvoriRez(){
    window.location.href="zmijica-rezultati.html";
}