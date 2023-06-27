function popuni(){
    let rez = localStorage.getItem("rezultati");
    rez = JSON.parse(rez);

    let users = rez[rez.length-1];
    $("#korisnikovi").append(users.ime+": "+ users.pt);

    //sortiranje
    rez.sort((a, b)=>{return b.pt-a.pt});
    console.log(rez);

    //ispisivanje prvih pet
    for(let i = 0; i<5&&i<rez.length; i++){
        $("#prvih5").append("<p id=br"+i+">"+rez[i].ime+" .............. "+rez[i].pt+"</p><br>");
    }
}

function vratiSe(){
    window.location.href="zmijica-uputstvo.html";
}