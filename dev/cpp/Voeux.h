// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_VOEUX_H_
#define DEV_CPP_VOEUX_H_

#include <string>
#include <vector>
#include <Projet.h>

//=================================
// the actual class
class Voeux {
    public:
      vector<Projet> getAllVoeux();
      Projet getVoeux();

    private:
      vector<Projet> voeux;
};



#endif  // DEV_CPP_VOEUX_H_
