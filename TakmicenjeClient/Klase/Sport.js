import { sportoviArray } from "../main.js";

export class Sport {

    constructor(id, naziv, container) {
        this.Id = id,
        this.Naziv = naziv,
        this._container = container
    }

    async loadRow() {

        let row = document.createElement('div');
        row.className = "row";
        row.id = "sport_" + this.Id;
        this._container.appendChild(row);

        let info = document.createElement('div');
        info.className = "infoSport";
        row.appendChild(info);

        let dugmici = document.createElement('div');
        dugmici.className = "dugmiciSport";
        row.appendChild(dugmici);
        
        let colId = document.createElement('div');
        colId.classList = "col hidden";
        colId.innerHTML = this.Id;
        info.appendChild(colId);

        let colNaziv = document.createElement('div');
        colNaziv.className = "col";
        colNaziv.id = "naziv_" + this.Id;
        colNaziv.innerHTML = this.Naziv;
        info.appendChild(colNaziv);

        let btnIzmeni = document.createElement('button');
        btnIzmeni.className = 'innerButton izmeni';
        btnIzmeni.innerHTML = 'Izmeni';
        btnIzmeni.addEventListener("click", () => {
            this.createEditModalSport();
        });
        dugmici.appendChild(btnIzmeni);

        let btnObrisi = document.createElement('button');
        btnObrisi.className = 'innerButton obrisi';
        btnObrisi.innerHTML = 'Obrisi';
        btnObrisi.addEventListener('click', () => {
            this.showConfirmDialog();
        })
        dugmici.appendChild(btnObrisi);  
    }

    async createEditModalSport(){

        const modal = document.createElement("dialog");
        modal.className= "modal";
        modal.innerHTML = "";
        document.body.appendChild(modal);
        modal.showModal();

        let mainPageDiv = document.createElement("div");
        mainPageDiv.className="mainPageDiv";
        modal.appendChild(mainPageDiv);

        let txtNaziv = document.createElement("input");
        txtNaziv.type = 'text';
        txtNaziv.id = "Naziv";
        txtNaziv.value = this.Naziv;
        mainPageDiv.appendChild(txtNaziv);

        let submitButton = document.createElement("button");
        submitButton.innerHTML = 'Potvrdi';
        submitButton.className = "submitButton";
        mainPageDiv.appendChild(submitButton);

        let exitButton = document.createElement("button");
        exitButton.className = "exitButton";
        exitButton.innerHTML = 'Zatvori';
        mainPageDiv.appendChild(exitButton);

        modal.querySelector(".exitButton").addEventListener("click", () => {modal.close();});

        modal.querySelector(".submitButton").addEventListener("click", async () => {
            let izmenjenSport = new Sport(this.Id, modal.querySelector('#Naziv').value)
            try {
                await fetch(`https://localhost:5001/Sport/IzmeniSport`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(izmenjenSport)
                })
                .then(p => {p.json()
                    .then(res => {
                        console.log(res)
                        console.log(this)
                        this.azurirajSportURedu(res.sport);
                        modal.close();
                        alert(res.message);
                    })
                });
            } catch (err) {
                return (err.response);
            }
        });
    }

    azurirajSportURedu(izmenjenSport) {
        this._container.querySelector("#naziv_" + this.Id).innerHTML = izmenjenSport.naziv;
        this.Naziv = izmenjenSport.naziv;

        var index = sportoviArray.findIndex(x => x.Id == izmenjenSport.id);
        sportoviArray[index].Naziv =  izmenjenSport.naziv;
    }

    showConfirmDialog() {
        if (confirm("Da li ste sigurni?")) {
            this.obrisiSport();
        } else {
            
        }
    }

    async obrisiSport() {
        await fetch(`https://localhost:5001/Sport/IzbrisiSport/` + this.Id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(p => {p.json()
                    .then(res => {
                        console.log(res)
                        var redZaBrisanje = this._container.querySelector('#sport_' + this.Id);
                        //console.log(redZaBrisanje)
                        redZaBrisanje.remove();

                        var index = sportoviArray.findIndex(x => x.Id == this.Id);
                        sportoviArray.splice(index, 1);
                        console.log(sportoviArray);

                        alert(res.message);
                    })
                });
        
    }
}