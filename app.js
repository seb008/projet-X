
const ajouterBtn = document.getElementById('ajouter');
const select = document.getElementById('type_depense');
const materielDiv = document.getElementById('champs_materiel');
const tacheDiv = document.getElementById('champs_main_d_oeuvre');
const valid_ligne = document.getElementById('submit');
const container = document.getElementById('titre-mo');
const validerAffaire = document.getElementById('valider_affaire');
const montantTotalAffaire = document.getElementById('montant_total');




let compteur = 1;

// ------------ AFFICHAGE DE DEPART --------------------------

ajouterBtn.style.display = 'block';
materielDiv.style.display = 'none';
tacheDiv.style.display = 'none';
select.style.display = 'none';
valid_ligne.style.display = 'none';
validerAffaire.style.display = 'none';

//--------BOUTTONS --------------------------------------------

ajouterBtn.addEventListener('click',ajouterBlock);
valid_ligne.addEventListener('click',addLigne);

// ------ FONCTION AFFICHAGE DIFFERENT BLOCK AVEC LE CHOIX MO OU MATERIEL

function ajouterBlock (e){

  e.preventDefault();
    ajouterBtn.style.display = 'none';
    select.style.display = 'block';
    valid_ligne.style.display = 'block';


  select.addEventListener('change', () => {
    if (select.value === 'materiel') {
      materielDiv.style.display = 'block';
      tacheDiv.style.display = 'none';
    } else {
      materielDiv.style.display = 'none';
      tacheDiv.style.display = 'block';
    }
  });
}

// --------CREATION DU LI EN AFFICHANT LE TEXTE DANS CLASS CONTAINER

function addLigne(e) {
    e.preventDefault();

    const nouvelleLigne = document.createElement("div");
    const typeDeDepense = document.createElement("li");

    if (select.value === 'main_d_oeuvre') {
      typeDeDepense.textContent = document.getElementById("titre_tache").value +
        " " + document.getElementById("montant_tache").value;
    } else {
      typeDeDepense.textContent = document.getElementById("titre_achat").value +
        " " + document.getElementById("montant_achat").value;
    }
    
//  -------------------AJOUT DU BOUTTON MODIFIER -----------------

  const btnModifier = document.createElement("button");
  btnModifier.textContent = "Modifier";

// ---------------------AMMENER DANS LA DIV------------------------

  typeDeDepense.appendChild(btnModifier);
  nouvelleLigne.appendChild(typeDeDepense);
  container.appendChild(nouvelleLigne);

  //------------------ AJOUT DU BOUTTON SUPPRIMER -------------------

  const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.addEventListener("click", () => {
    const confirmation = confirm("Voulez-vous vraiment supprimer cette ligne ?");
  if (confirmation) {
    nouvelleLigne.remove();
  }
});

typeDeDepense.insertAdjacentHTML('beforeend', ' ');
typeDeDepense.appendChild(btnSupprimer);


// ----------------- MODIFIER LES CHAMPS !!!!!! MARCHE PAS 

btnModifier.addEventListener("click", function() {

  const champsLigne = typeDeDepense.textContent.split(" ");
  const titre = champsLigne[0];
  const montant = champsLigne[1];

  const nouveauTitre = document.createElement("input");
  nouveauTitre.value = titre;
  typeDeDepense.replaceChild(nouveauTitre, typeDeDepense.childNodes[0]);

  const nouveauMontant = document.createElement("input");
  nouveauMontant.value = montant;
  typeDeDepense.replaceChild(nouveauMontant, typeDeDepense.childNodes[1]);

  const btnValider = document.createElement("button");
  btnValider.textContent = "Valider";
  nouvelleLigne.appendChild(btnValider);

  btnValider.addEventListener("click", function() {

    const nouveauTitreText = nouveauTitre.value;
    const nouveauMontantText = nouveauMontant.value;

    const typeDeDepenseText = document.createElement("li");
    typeDeDepenseText.textContent = nouveauTitreText + " " + nouveauMontantText;

    nouvelleLigne.replaceChild(typeDeDepenseText, nouveauTitre);
    nouvelleLigne.replaceChild(typeDeDepenseText, nouveauMontant);

    nouvelleLigne.removeChild(btnModifier);
    nouvelleLigne.removeChild(btnValider);
  });
});


//--------------CALCUL DES MONTANTS DE L'ENSEMBLE DES LIGNES 

    let montant_total = 0;
    const lignes = container.querySelectorAll("li");
  
    for (let i = 0; i < lignes.length; i++) {
      const montant = parseFloat(lignes[i].textContent.split(" ")[1].replace(',', '.'));
      montant_total += montant;
    }
  
    document.getElementById('montant_total_type_de_depens').value = montant_total;

}

