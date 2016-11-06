
var Projets = [];
var Etudiants = [];
var ErreurEtudiants = [];
var BinomesPossibles = [];
var RepartitionsProjetsPossibles = [];
var ErreurBinomes = [];
var ErreurRepartitions = [];
var RepartitionsBinomesPossibles = [];


function ajouterNProjets(N) {
  if (N > 0) {
    for (var i = 0; i < N; i++) {
      Projets[i] = i;
    }
  }
  return;
}

/*
* Ajouter un étudiant
*
*/
function ajouterEtudiant(nom, voeux) {

  var newEtudiant = {
    "Nom": nom,
    "Voeux": []
  };

  if (voeux !== undefined ) {
    if (voeuxCorrectes(voeux)) {
        newEtudiant.Voeux = voeux;
    }
  }

  Etudiants.push(newEtudiant);
};


/*
* modifierVoeuxEtudiants(id)
* The id is the indexOf Etudiant in Etudiants[]
*/
function modifierVoeuxEtudiant(id,voeux) {
  if (!(id < Etudiants.length && id >= 0)) {
    return;
  }

  if (voeuxCorrectes(voeux)) {
    Etudiants.indexOf(id).Voeux = voeux;
  }
  return;
}



/**
* Voeux de 0 à N-1
*
*/
function voeuxCorrectes(Voeux) {

  var correct = true;
  var i = 0

  while(i < Voeux.length && correct) {
    if (Projets.indexOf(Voeux[i]) == undefined) {
      correct = false;
    }
    i++;
  }
  return correct;
};


function calculerBinomesPossibles() {
  /*
  Ex:
  01
  02
  03
  12
  13
  23
  */
  for (i = 0; i < Etudiants.length - 1; i++) {
    for (j = i+1; j < Etudiants.length; j++) {
      BinomesPossibles.push([i,j]);
    }
  }
};



function calculerRepartitionsBinomesPossibles() {
  var b1,b2;
  for (i = 0; i < BinomesPossibles.length - 1; i++) {
    for (j = 0; j < BinomesPossibles.length; j++) {
      b1 = BinomesPossibles[i];
      b2 = BinomesPossibles[j];
      if (b1 !== b2) {
        if (b1[0] != b2[0] && b1[0] != b2[1]) {
          if (b1[1] != b2[0] && b1[1] != b2[1]) {
            // Aucun élement de b1 dans b2

            var k = 0;
            var contains = false;
            while (k < RepartitionsBinomesPossibles.length && !contains) {
              contains = RepartitionsBinomesPossibles[k].arrayContains([b2,b1]);
              k++;
            }

            //console.log(RepartitionsBinomesPossibles.indexOf([b1,b2]));
            if (!contains) {
              RepartitionsBinomesPossibles.push([b1,b2]);
            }

          } //if
        } //if
      } //if
    } //for
  } //for
};

function calculerErreurEtudiants() {
  // (Erreur P1, Erreur P2, ..., Erreur PN)
  Etudiants.forEach(function(etudiant) {
    var erreurEtudiant = [];
    etudiant.Voeux.forEach(function(voeux) {
      // [TB,B,AB,P,AR]
      var v = etudiant.Voeux.indexOf(voeux);
      erreurEtudiant[Projets[voeux]] = (v*v);
    });
      // # [4,1,0,9,16] Erreur commise sur un étudiant
    ErreurEtudiants.push(erreurEtudiant);
    // # [ [4,1,0,9,16], ... ,  [4,1,0,9,16] ] Erreurs de tous les étudiants
  });
};

function getErreurEtudiant(id, projetid) {
  return ErreurEtudiants[id][projetid];
}
/*
*
* # Préconditions: Projets.length > 0
*/
function calculerRepartitionsProjetsPossibles() {
  // TODO
  // Nombre de binomes par repartitions
  // = Nombre de projet par Repartition
  // Arragments de nombre binomes parmi nombre projets
  // Pour 3 projets et 3 binomes:
  // (P1,P2,P3),(P1,P3,P2)(P2,P3,P1),(P2,P1,P3),(P3,P2,P1),(P3,P1,P2)
  // Pour 3 projets et 2 binomes:
  // (P1,P2), (P1,P3), (P2,P1), (P3,P1), (P2,P3), (P3,P2)

  /* ALGO ARRANGMENTS:
  fonction arrangements(Liste L, Liste F, k) {
     si k est égal à 0, {
          afficher  L
     } sinon {
          pour tous les éléments x de l'ensemble F  {
               Liste G = F moins x
                           (F auquel on a ôté l'élément x)
               Liste L2  = L plus x
                           (on a concaténé x à la droite de la liste L)
               arrangements(L2, G , k-1)
          }
  }

  arrangements("", (1,2,3,4,5,6), 3);
  */
  var L = [];
  var result = [];
  arrgt(L,Projets,Projets.length,RepartitionsBinomesPossibles.length, result);

  // Transformation du résultat
  for (i=0;i<result.length; i++) {
    result[i] = result[i].split(", ");
    for (j=0;j<result[i].length;j++) {
      result[i][j] = parseInt(result[i][j]);
    }
  }

  RepartitionsProjetsPossibles = result;


}

/*
* Projet: Index du projet dans le tableau Projets
*
*/
function calculerErreurRepartition() {
  // RepartitionsBinomesPossibles + Toutes les combinaisons de projets = 1 erreur
  var erreurRepartition = [];
  BinomesPossibles.forEach(function(binome) {
    erreurRepartition = [];
    RepartitionsProjetsPossibles.forEach(function(projets) {
      projets.forEach(function(projet) {
        var erreur = getErreurEtudiant(binome[0], projet) + getErreurEtudiant(binome[1], projet);
        erreurRepartition.push([[binome, projet], erreur])

      })


    })
    ErreurRepartitions.push(erreurRepartition);
  })

};

function getNombreRepartitions() {
  /* (Combinaison de 2 parmi nombre d'étudiant * Arrangements de nombre de
   binomes parmi nombre de projets) / 2 */

   var N = Projets.length;
   var p = Etudiants.length;

   return ((factorielle(p) / ((factorielle(p-2)*2))) * (factorielle(N)/factorielle(N-(p/2)))) / 2
};

function factorielle(n) {
  if (n==0) return 1
  else return n*factorielle(n-1);
};

function arrgt(L, t, n ,k, res=[]) {
   if(k==0) {
     res.push(L);
     return res;
   } else {
      for(var i=0;i < n; i++) {
        var L2 = L + t[i];
        if(k>1) L2 += ", ";

        var t2 = new Array();
        var j = 0;
        for(var r = 0 ; r < n ; r++) {
          if(r != i) {
             t2[j] = t[r]
             j++;
          }
        }
        arrgt(L2, t2, n-1, k-1, res);
     }
   }
};

Array.prototype.arrayContains = function (sub) {
  var self = this;
  var result = sub.filter(function(item) {
    return self.indexOf(item) > -1;
  });
  return sub.length === result.length;
}

function main() {
  ajouterNProjets(3);
  ajouterEtudiant("A", [1,2,0]);
  ajouterEtudiant("B", [0,1,2]);
  ajouterEtudiant("C", [0,1,2]);
  ajouterEtudiant("D", [0,1,2]);

  calculerBinomesPossibles();
  console.log("Binomes possibles: ");
  console.log(BinomesPossibles);
  console.log("\n\n");

  calculerRepartitionsBinomesPossibles();
  console.log("Répartition des Binomes possibles: ");
  console.log(RepartitionsBinomesPossibles);
  console.log("\n\n");

  calculerRepartitionsProjetsPossibles();
  console.log("Répartition des Projets possibles: ");
  console.log(RepartitionsProjetsPossibles);
  console.log("\n\n");

  calculerErreurEtudiants();
  console.log("Erreurs étudiants possibles: ");
  console.log(ErreurEtudiants);
  console.log("\n\n");


  /*
  calculerErreurRepartition();
  var best = [];
  ErreurRepartitions.forEach(function(e) {
    var errMin = 32;

    e.forEach(function(d) {
      if (d[1] < errMin) {
        errMin = d[1];
        console.log(e[0],e[1]);
      }

    })

  })*/
};














main();
