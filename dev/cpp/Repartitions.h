// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_REPARTITIONS_H_
#define DEV_CPP_REPARTITIONS_H_

#include <string>
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

      Binome[][] getRepartitionsBinomesPossibles();
      Binome[] getBinomesPossibles();
      Projet[][] getRepartitionsProjetsPossibles();
      Etudiant[] getEtudiants();
      int pickRandomNumberBetween(int a, int b);
      Projet[] getProjets();
      Repartition[] getRepartitions();
      Repartition[] getBestRepartitions();
      Repartition getBestRepartition();
      int getNombreRepartitions();
      int factorielle(int n);
      string toString();

    private:
      Repartition[] repartitions;
      Repartition[] bestRepartitions;
      Projet[][] repartitionsProjetsPossibles;
      Binome[][] repartitionsBinomesPossibles;
      Etudiant[] etudiants;
      Projet[] projets;
      Binome[] binomesPossibles;
      Projet[][] projetsPossibles;
      int timeElapsed;
};



#endif  // DEV_CPP_REPARTITIONS_H_
