import { Sport } from "./Klase/Sport.js";
import { Takmicar } from "./Klase/Takmicar.js";
import { Takmicenje } from "./Klase/Takmicenje.js";

const host = document.body;
export var takmicariArray = new Array();
export var sportoviArray = new Array();

var options = document.createElement("div");
options.id = "options";

var showing = document.createElement("div");
showing.id = "showing";


let contTakmicari = document.createElement("div");
contTakmicari.classList = "leftCont takmicariCont";
let takmicariTable = document.createElement('div');
takmicariTable.className = 'takmicariTable';
contTakmicari.appendChild(takmicariTable);
let btnDodajTakmicara = document.createElement('button');
btnDodajTakmicara.classList = 'dodajButton';
btnDodajTakmicara.innerHTML = 'Dodaj';
btnDodajTakmicara.addEventListener("click", () => {
    createAddModalTakmicar();
});
contTakmicari.appendChild(btnDodajTakmicara);


let contSportovi = document.createElement("div");
contSportovi.classList = "leftCont sportoviCont";
let sportoviTable = document.createElement('div');
sportoviTable.className = 'sportoviTable';
contSportovi.appendChild(sportoviTable);
let btnDodajSport = document.createElement('button');
btnDodajSport.classList = 'dodajButton';
btnDodajSport.innerHTML = 'Dodaj';
btnDodajSport.addEventListener("click", () => {
    createAddModalSport();
});
contSportovi.appendChild(btnDodajSport);


let contTakmicenja = document.createElement("div");
contTakmicenja.className = "leftCont";
let takmicenjaTable = document.createElement('div');
takmicenjaTable.className = 'takmicenjaTable';
contTakmicenja.appendChild(takmicenjaTable);
let dodajUTakmicenjeRow = document.createElement('div');
dodajUTakmicenjeRow.className = 'dodajUTakmicenjeRow';
contTakmicenja.appendChild(dodajUTakmicenjeRow);

let dropDownConainer = document.createElement('div');
dropDownConainer.className = 'dropDownConainer';
dodajUTakmicenjeRow.appendChild(dropDownConainer);
let txtTakmicenjeId = document.createElement('input');
txtTakmicenjeId.type = 'hidden';
txtTakmicenjeId.id = 'takmicenjeId';
dropDownConainer.appendChild(txtTakmicenjeId);
let dropdownTakmicari = document.createElement('select');
dropdownTakmicari.id = 'selectTakmicar';
dropDownConainer.appendChild(dropdownTakmicari);
let dropdownSportovi = document.createElement('select');
dropdownSportovi.id = 'selectSport';
dropDownConainer.appendChild(dropdownSportovi);
let selectOcena = document.createElement('select');
selectOcena.id = 'ocenaZaDodavanje';
dropDownConainer.appendChild(selectOcena);
for(var i = 1; i <= 10; i++) {
    var option = document.createElement('option');
    option.text = i;
    option.value = i;
    selectOcena.appendChild(option);
}

let btnDodajUTakmicenje = document.createElement('button');
btnDodajUTakmicenje.type = 'button';
btnDodajUTakmicenje.innerHTML = 'Dodaj u takmicenje';
btnDodajUTakmicenje.className = "dodajUTakmicenje"
btnDodajUTakmicenje.addEventListener('click' , dodajUcesnika);
dropDownConainer.appendChild(btnDodajUTakmicenje);




await loadOptions();
async function loadOptions() {
    const btns = [];

    var btnTakmicari = document.createElement("button");
    btnTakmicari.innerHTML = "Takmicari";
    btns.push(btnTakmicari);

    var btnSportovi = document.createElement("button");
    btnSportovi.innerHTML = "Sportovi";
    btns.push(btnSportovi);

    var btnTakmicenja = document.createElement("button");
    btnTakmicenja.innerHTML = "Takmicenja";
    btns.push(btnTakmicenja);


    options.appendChild(btnTakmicari);
    options.appendChild(btnSportovi);
    options.appendChild(btnTakmicenja);

    contTakmicari = await loadTakmicari();
    contSportovi = await loadSportovi();
    contTakmicenja = await loadTakmicenja();

    btns.forEach((btn) => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            e.currentTarget.classList.add("active");

            btns.forEach(b => {
                b.disabled = false;
            })
            btn.disabled = true;

            if (btn == btnSportovi) {
                contTakmicenja.remove();
                contTakmicari.remove();
                showing.appendChild(contSportovi);
            } 
            else if (btn == btnTakmicenja) {
                contSportovi.remove();
                contTakmicari.remove();
                showing.appendChild(contTakmicenja);
                popuniDropdownTakmicari(dropdownTakmicari);
                popuniDropdownSportovi(dropdownSportovi);
            }
            else if (btn == btnTakmicari) {
                contTakmicenja.remove();
                contSportovi.remove();
                showing.appendChild(contTakmicari);
            }
        });
    });
}


host.appendChild(options);
host.appendChild(showing);


async function loadTakmicari() {

    await fetch("https://localhost:5001/Takmicar/VratiTakmicare", {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(p => {
            p.json().then(collections => {
                collections.forEach(takmicar => {
                    //console.log(takmicar)
                    var p = new Takmicar(takmicar.id, takmicar.ime, takmicar.prezime, takmicar.drzava, takmicariTable);
                    takmicariArray.push(p);
                    p.loadRow();
                });
            });
        })
    return contTakmicari;
}
async function loadSportovi() {
    fetch("https://localhost:5001/Sport/VratiSportove", {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(p => {
            p.json().then(collections => {
                collections.forEach(sport => {
                    //console.log(sport)
                    var p = new Sport(sport.id, sport.naziv, sportoviTable);
                    sportoviArray.push(p);
                    p.loadRow();
                });
            });
        })
    return contSportovi;
}
async function loadTakmicenja() {
    await fetch("https://localhost:5001/Takmicenje/Takmicenja", {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(p => {
            p.json().then(collections => {
                collections.forEach(spoj => {
                    //console.log(spoj)
                    var p = new Takmicenje(spoj.id, spoj.takmicenje, spoj.takmicar, spoj.sport, spoj.ocena, takmicenjaTable );
                    p.loadRow();
                });
                txtTakmicenjeId.value = collections[0].takmicenje.id;
            });
        })
    return contTakmicenja;
}

function createAddModalTakmicar(){

    const modal = document.createElement("dialog");
    modal.className= "modal";
    modal.innerHTML = "";
    document.body.appendChild(modal);

    modal.showModal();

    let mainPageDiv = document.createElement("div");
    mainPageDiv.className="mainPageDiv";
    modal.appendChild(mainPageDiv);

    let labelaIme = document.createElement("label");
    labelaIme.className = "lab";
    labelaIme.innerHTML = "Ime: ";
    mainPageDiv.appendChild(labelaIme);
    let txtIme = document.createElement("input");
    txtIme.type = 'text';
    txtIme.id = "Ime";
    mainPageDiv.appendChild(txtIme);

    let labelaPrezime = document.createElement("label");
    labelaPrezime.className = "lab";
    labelaPrezime.innerHTML = "Prezime: ";
    mainPageDiv.appendChild(labelaPrezime);
    let txtPrezime = document.createElement("input");
    txtIme.type = 'text';
    txtPrezime.id = "Prezime";
    mainPageDiv.appendChild(txtPrezime);

    let labelaDrzava = document.createElement("label");
    labelaDrzava.className = "lab";
    labelaDrzava.innerHTML = "Drzava: ";
    mainPageDiv.appendChild(labelaDrzava);
    let txtDrzava = document.createElement("input");
    txtIme.type = 'text';
    txtDrzava.id = "Drzava";
    mainPageDiv.appendChild(txtDrzava);

    let submitButton = document.createElement("button");
    submitButton.innerHTML = 'Dodaj';
    submitButton.className = "submitButton";
    mainPageDiv.appendChild(submitButton);

    let exitButton = document.createElement("button");
    exitButton.className = "exitButton";
    exitButton.innerHTML = 'Zatvori';
    mainPageDiv.appendChild(exitButton);

    modal.querySelector(".exitButton").addEventListener("click", () => {modal.close();});

    modal.querySelector(".submitButton").addEventListener("click", async () => {
        let ime = modal.querySelector('#Ime').value;
        let prezime = modal.querySelector('#Prezime').value;
        let drzava = modal.querySelector('#Drzava').value;
        try {
            await fetch(`https://localhost:5001/Takmicar/DodajTakmicara`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "ime": ime,
                    "prezime": prezime,
                    "drzava": drzava
                })
            })
            .then(p => {p.json()
                .then(res => {
                    console.log(res);
                    let noviTakmicar = new Takmicar(res.noviTakmicar.id, res.noviTakmicar.ime, res.noviTakmicar.prezime, res.noviTakmicar.drzava, takmicariTable);
                    noviTakmicar.loadRow();
                    modal.close();

                    takmicariArray.push(noviTakmicar);
                    console.log(takmicariArray);
                    alert(res.message);
                })
            });
        } catch (err) {
            return (err.response);
        }
    });

    
}
function createAddModalSport(){

    const modal = document.createElement("dialog");
    modal.className= "modal";
    modal.innerHTML = "";
    document.body.appendChild(modal);

    modal.showModal();

    let mainPageDiv = document.createElement("div");
    mainPageDiv.className="mainPageDiv";
    modal.appendChild(mainPageDiv);

    let labelaNaziv = document.createElement("label");
    labelaNaziv.className = "lab";
    labelaNaziv.innerHTML = "Naziv: ";
    mainPageDiv.appendChild(labelaNaziv);
    let txtNaziv = document.createElement("input");
    txtNaziv.type = 'text';
    txtNaziv.id = "Naziv";
    mainPageDiv.appendChild(txtNaziv);

    let submitButton = document.createElement("button");
    submitButton.innerHTML = 'Dodaj';
    submitButton.className = "submitButton";
    mainPageDiv.appendChild(submitButton);

    let exitButton = document.createElement("button");
    exitButton.className = "exitButton";
    exitButton.innerHTML = 'Zatvori';
    mainPageDiv.appendChild(exitButton);

    modal.querySelector(".exitButton").addEventListener("click", () => {modal.close();});

    modal.querySelector(".submitButton").addEventListener("click", async () => {
        let naziv = modal.querySelector('#Naziv').value;
        try {
            await fetch(`https://localhost:5001/Sport/DodajSport`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "naziv": naziv
                })
            })
            .then(p => {p.json()
                .then(res => {
                    console.log(res);
                    let noviSport = new Sport(res.noviSport.id, res.noviSport.naziv, sportoviTable);
                    noviSport.loadRow();
                    modal.close();
                    alert(res.message);
                })
            });
        } catch (err) {
            return (err.response);
        }
    });
}

function popuniDropdownTakmicari(dropdown) {
    dropdown.innerHTML = '';
    takmicariArray.forEach(takmicar => {
        var option = document.createElement('option');
        option.text = takmicar.Ime + ' ' + takmicar.Prezime + ' , ' + takmicar.Drzava;
        option.value = takmicar.Id;
        dropdown.appendChild(option);
        //console.log(option);
    });
}

function popuniDropdownSportovi(dropdown) {
    dropdown.innerHTML = '';
    sportoviArray.forEach(sport => {
        var option = document.createElement('option');
        option.text = sport.Naziv;
        option.value = sport.Id;
        dropdown.appendChild(option);
        //console.log(option);
    });
}

async function dodajUcesnika() { //takmicenje
    let idTakmicenja = contTakmicenja.querySelector('#takmicenjeId').value;
    let idSporta = contTakmicenja.querySelector('#selectSport').value;
    let idTakmicar = contTakmicenja.querySelector('#selectTakmicar').value;
    let ocena = contTakmicenja.querySelector('#ocenaZaDodavanje').value;
    try {
        await fetch(`https://localhost:5001/Takmicenje/Ucestvuje/${idTakmicar}/${idSporta}/${idTakmicenja}/${ocena}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(p => {p.json()
            .then(res => {
                console.log(res);
                let noviUcesnik = new Takmicenje(res.spoj.id, res.spoj.takmicenje, res.spoj.takmicar, res.spoj.sport, res.spoj.ocena, takmicenjaTable);
                noviUcesnik.loadRow();
                //alert(res.message);
            })
        });
    } catch (err) {
        return (err.response);
    }
}