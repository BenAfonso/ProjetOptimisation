// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_REPARTITION_H_
#define DEV_CPP_REPARTITION_H_

#include <string>
#include <Assignation.h>

//=================================
// the actual class
class Repartition {
    public:
      Assignation[] getRepartition();
      void calculerErreur();
      int getErreur();


    private:
      Assignation[] assignations;
      int erreur;
};



#endif  // DEV_CPP_REPARTITION_H_
