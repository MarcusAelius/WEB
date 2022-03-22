import { takmicariArray } from "../main.js";

export class Takmicenje {
    constructor(id, takmicenje, takmicar, sport, ocena, container) {
        this.Id = id,
        this.Takmicenje = takmicenje,
        this.Takmicar = takmicar,
        this.Sport = sport,
        this.Ocena = ocena,
        this._container = container
    }

    async loadRow() {

        let row = document.createElement('div');
        row.className = "row";
        row.id = 'takmicenje_' + this.Id;
        this._container.appendChild(row);

        let info = document.createElement('div');
        info.className = "infoTakmicenje";
        row.appendChild(info);

        let dugmici = document.createElement('div');
        dugmici.className = "dugmiciTakmicenje";
        row.appendChild(dugmici);
        
        let colId = document.createElement('div');
        colId.classList = "col hidden spojId";
        colId.innerHTML = this.Id;
        info.appendChild(colId);

        let colTakmicenjeNaziv = document.createElement('div');
        colTakmicenjeNaziv.className = "col";
        colTakmicenjeNaziv.innerHTML = this.Takmicenje.naziv;
        info.appendChild(colTakmicenjeNaziv);

        let colTakmicar = document.createElement('div');
        colTakmicar.className = "col";
        colTakmicar.innerHTML = this.Takmicar.ime + ' ' + this.Takmicar.prezime;
        info.appendChild(colTakmicar);

        let colSport = document.createElement('div');
        colSport.className = "col";
        colSport.innerHTML = this.Sport.naziv;
        info.appendChild(colSport);

        let colOcena = document.createElement('div');
        colOcena.classList = "col ocena";
        colOcena.id = 'ocena_' + this.Id;
        colOcena.innerHTML = this.Ocena;
        info.appendChild(colOcena);

        let btnIzmeniOcenu = document.createElement('button');
        btnIzmeniOcenu.type = 'button';
        btnIzmeniOcenu.classList = "col izmeniBtn";
        btnIzmeniOcenu.innerHTML = 'Izmeni ocenu';
        dugmici.appendChild(btnIzmeniOcenu);
        btnIzmeniOcenu.addEventListener('click', async function(e) {
            //console.log(e.target.closest('.row').querySelector('.spojId').innerHTML)
            let btnClicked = e.target;
            let takmicenjeID = btnClicked.closest('.row').querySelector('.spojId').innerHTML;
            let izmenjenaOcena = btnClicked.closest('.leftCont').querySelector('#ocenaZaDodavanje').value;
            //console.log(takmicenjeID, izmenjenaOcena)
            try {
                await fetch(`https://localhost:5001/Takmicenje/IzmeniOcenu`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        "takmicenjeId": parseInt(takmicenjeID),
                        "ocena": parseInt(izmenjenaOcena)
                    })               
                })
                .then(p => {p.json()
                    .then(res => {
                        console.log(res)
                        btnClicked.closest('.row').querySelector('.ocena').innerHTML = izmenjenaOcena; 
                        alert(res.message);
                    })
                });
            } catch (err) {
                return (err.response);
            }
        })

        let btnObrisiTakmicenje = document.createElement('button');
        btnObrisiTakmicenje.type = 'button';
        btnObrisiTakmicenje.classList = "col obrisiBtn";
        btnObrisiTakmicenje.innerHTML = 'Obrisi';
        dugmici.appendChild(btnObrisiTakmicenje);
        btnObrisiTakmicenje.addEventListener('click', () => {
            this.showConfirmDialog();
        })
    }

    showConfirmDialog() {
        if (confirm("Da li ste sigurni?")) {
            this.obrisiTakmicenje();
        } else {
            
        }
    }

    async obrisiTakmicenje() {
        await fetch(`https://localhost:5001/Takmicenje/IzbrisiTakmicenje/` + this.Id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(p => {p.json()
                    .then(res => {
                        console.log(res)
                        var redZaBrisanje = this._container.querySelector('#takmicenje_' + this.Id);
                        //console.log(redZaBrisanje)
                        redZaBrisanje.remove();
                        alert(res.message);
                    })
                });
        
    }
}
