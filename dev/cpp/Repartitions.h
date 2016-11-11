// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_REPARTITIONS_H_
#define DEV_CPP_REPARTITIONS_H_

#include <string>
#include <vector>
#include <Binome.h>
#include <Assignation.h>
#include <Projet.h>
#include <Etudiant.h>
#include <Repartition.h>



//=================================
// the actual class
class Repartitions {
    public:
      void compute();
      void ajouterEtudiant(Etudiant e);
      void calculerBinomesPossibles();
      void calculerRepartitionsBinomesPossibles();
      void calculerRepartitionsProjetsPossibles();
      void calculerRepartitionsPossibles();
      void getMinErreur();

      vector<vector<Binome>> getRepartitionsBinomesPossibles();
      vector<Binome> getBinomesPossibles();
      vector<vector<Projet>> getRepartitionsProjetsPossibles();
      vector<Etudiant> getEtudiants();
      int pickRandomNumberBetween(int a, int b);
      vector<Projet> getProjets();
      vector<Repartition> getRepartitions();
      vector<Repartition> getBestRepartitions();
      Repartition getBestRepartition();
      int getNombreRepartitions();
      int factorielle(int n);
      string toString();

    private:
      vector<Repartition> repartitions;
      vector<Repartition> bestRepartitions;
      vector<vector<Projet>> repartitionsProjetsPossibles;
      vector<vector<Binome>> repartitionsBinomesPossibles;
      vector<Etudiant> etudiants;
      vector<Projet> projets;
      vector<Binome> binomesPossibles;
      vector<vector<Projet>> projetsPossibles;
      int timeElapsed;
};



#endif  // DEV_CPP_REPARTITIONS_H_
