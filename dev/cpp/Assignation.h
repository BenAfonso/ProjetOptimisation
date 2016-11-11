// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_ASSIGNATION_H_
#define DEV_CPP_ASSIGNATION_H_

#include <string>
#include <Binome.h>
#include <Projet.h>
//=================================
// the actual class
class Assignation {
    public:
      void calculerErreur();
      int getErreur();
      Binome getBinome();
      Projet getProjet();
      string toString();


    private:
      Binome binome;
      Pojet projet;
      int erreur;
};



#endif  // DEV_CPP_ASSIGNATION_H_
