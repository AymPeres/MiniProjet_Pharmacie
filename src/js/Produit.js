export default class Produit {
    constructor(id, denomination, qte, photo, formepharmaceutique) {
        this._id = id;
        this._denomination = denomination;
        this._qte = qte;
        this._photo = photo ?? ""; // si photo est nul, on prend une chaîne vide
        this._formepharmaceutique = formepharmaceutique;
    }

    get postOptions() {
        return this.addRemoveOrPostQtyOption(this.qte, "POST");
    }

    get addQtyOption() {
        return this.addRemoveOrPostQtyOption(this.qte + 1, "PUT");
    }

    get removeQtyOption() {
        return this.addRemoveOrPostQtyOption(this.qte - 1, "PUT");
    }

    addRemoveOrPostQtyOption(qtyToChange, method) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(method);
        return {
            method: method,
            headers: myHeaders,
            body: JSON.stringify({
                id: this.id,
                denomination: this.denomination,
                qte: qtyToChange,
                photo: this.photo,
                formepharmaceutique: this.formepharmaceutique,
            }),
        };
    }
// updateOption est fait pas l'IA
    // Méthode pour préparer la requête PUT lors de la modification d'un produit
    updateOptions(newDenomination, newPhoto, newForme) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        return {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({
                id: this.id,
                denomination: newDenomination,
                qte: this.qte, // on conserve la quantité existante
                photo: newPhoto,
                formepharmaceutique: newForme,
            }),
        };
    }

    get id() {
        return this._id;
    }

    get denomination() {
        return this._denomination;
    }

    get qte() {
        return this._qte;
    }

    get photo() {
        return this._photo;
    }

    get formepharmaceutique() {
        return this._formepharmaceutique;
    }
}
