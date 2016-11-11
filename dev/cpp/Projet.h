// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_PROJET_H_
#define DEV_CPP_PROJET_H_

#include <string>

//=================================
// the actual class
class Projet {
    public:
      string getNom();
      string toString();

    private:
      string nom;
};



#endif  // DEV_CPP_PROJET_H_
