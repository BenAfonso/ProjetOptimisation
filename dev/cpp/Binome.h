// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_BINOME_H_
#define DEV_CPP_BINOME_H_

#include <string>
#include <Etudiant.h>
#include <Projet.h>
//=================================
// the actual class
class Binome {
    public:
      Etudiant getEtudiant1();
      Etudiant getEtudiant2();
      int getErreur(Projet projet);
      boolean isPartOf(Binome b);
      string toString();

    private:
      Etudiant etudiant1;
      Etudiant etudiant2;
};



#endif  // DEV_CPP_BINOME_H_
