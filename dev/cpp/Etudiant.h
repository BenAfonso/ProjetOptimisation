// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_ETUDIANT_H_
#define DEV_CPP_ETUDIANT_H_

#include <string>
#include <Voeux.h>
#include <Projet.h>

//=================================
// the actual class
class Etudiant {
    public:
      string getNom();
      void setNom(string nom);
      Voeux getVoeux();
      void setVoeux(Voeux voeux);
      int getErreur(Projet projet);
      string toString();

    private:
      string nom;
      Voeux voeux;
};



#endif  // DEV_CPP_ETUDIANT_H_
