import { takmicariArray } from "../main.js";

export class Takmicar {

    constructor(id, ime, prezime, drzava, container) {
        this.Id = id,
        this.Ime = ime,
        this.Prezime = prezime,
        this.Drzava = drzava,
        this._container = container
    }

    async loadRow() {

        let row = document.createElement('div');
        row.className = "row";
        row.id = "takmicar_" + this.Id;
        this._container.appendChild(row);

        let info = document.createElement('div');
        info.className = "infoTakmicar";
        row.appendChild(info);

        let dugmici = document.createElement('div');
        dugmici.className = "dugmiciTakmicar";
        row.appendChild(dugmici);
        
        let colId = document.createElement('div');
        colId.classList = "col hidden";
        colId.innerHTML = this.Id;
        info.appendChild(colId);

        let colIme = document.createElement('div');
        colIme.className = "col";
        colIme.id = "ime_" + this.Id;
        colIme.innerHTML = this.Ime;
        info.appendChild(colIme);

        let colPrezime = document.createElement('div');
        colPrezime.className = "col";
        colPrezime.id = "prezime_" + this.Id;
        colPrezime.innerHTML = this.Prezime;
        info.appendChild(colPrezime);

        let colDrzava = document.createElement('div');
        colDrzava.className = "col";
        colDrzava.id = "drzava_" + this.Id;
        colDrzava.innerHTML = this.Drzava;
        info.appendChild(colDrzava);

        let btnIzmeni = document.createElement('button');
        btnIzmeni.className = 'innerButton izmeni';
        btnIzmeni.innerHTML = 'Izmeni';
        btnIzmeni.addEventListener("click", () => {
            this.createEditModalTakmicar();
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

    async createEditModalTakmicar(){

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
        txtIme.value = this.Ime;
        mainPageDiv.appendChild(txtIme);

        let labelaPrezime = document.createElement("label");
        labelaPrezime.className = "lab";
        labelaPrezime.innerHTML = "Prezime: ";
        mainPageDiv.appendChild(labelaPrezime);
        let txtPrezime = document.createElement("input");
        txtIme.type = 'text';
        txtPrezime.id = "Prezime";
        txtPrezime.value = this.Prezime;
        mainPageDiv.appendChild(txtPrezime);

        let labelaDrzava = document.createElement("label");
        labelaDrzava.className = "lab";
        labelaDrzava.innerHTML = "Drzava: ";
        mainPageDiv.appendChild(labelaDrzava);
        let txtDrzava = document.createElement("input");
        txtIme.type = 'text';
        txtDrzava.id = "Drzava";
        txtDrzava.value = this.Drzava;
        mainPageDiv.appendChild(txtDrzava);

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
            let izmenjenTakmicar = new Takmicar(this.Id, modal.querySelector('#Ime').value, modal.querySelector('#Prezime').value, modal.querySelector('#Drzava').value)

            try {
                await fetch(`https://localhost:5001/Takmicar/IzmeniTakmicara`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(izmenjenTakmicar)
                })
                .then(p => {p.json()
                    .then(res => {
                        console.log(res)
                        this.azurirajTakmicaraURedu(res.takmicar);
                        modal.close();
                        alert(res.message);
                    })
                });
            } catch (err) {
                return (err.response);
            }
        });
    }

    azurirajTakmicaraURedu(izmenjenTakmicar) {
        this._container.querySelector("#ime_" + this.Id).innerHTML = izmenjenTakmicar.ime;
        this._container.querySelector("#prezime_" + this.Id).innerHTML = izmenjenTakmicar.prezime;
        this._container.querySelector("#drzava_" + this.Id).innerHTML = izmenjenTakmicar.drzava;
        this.Ime = izmenjenTakmicar.ime;
        this.Prezime = izmenjenTakmicar.prezime;
        this.Drzava = izmenjenTakmicar.drzava;

        //var trazeniTakmicar = takmicariArray.find(e => e.Id == izmenjenTakmicar.id);
        var index = takmicariArray.findIndex(x => x.Id == izmenjenTakmicar.id);
        takmicariArray[index].Ime =  izmenjenTakmicar.ime;
        takmicariArray[index].Prezime =  izmenjenTakmicar.prezime;
        takmicariArray[index].Drzava =  izmenjenTakmicar.drzava;
    }

    showConfirmDialog() {
        if (confirm("Da li ste sigurni?")) {
            this.obrisiTakmicara();
        } else {
            
        }
    }

    async obrisiTakmicara() {
        await fetch(`https://localhost:5001/Takmicar/IzbrisiTakmicara/` + this.Id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(p => {p.json()
                    .then(res => {
                        console.log(res)
                        var redZaBrisanje = this._container.querySelector('#takmicar_' + this.Id);
                        //console.log(redZaBrisanje)
                        redZaBrisanje.remove();

                        var index = takmicariArray.findIndex(x => x.Id == this.Id);
                        takmicariArray.splice(index, 1);
                        console.log(takmicariArray);

                        alert(res.message);
                    })
                });
        
    }

}