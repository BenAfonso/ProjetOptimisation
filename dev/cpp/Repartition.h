// Copyrights 2016 <Benjamin AFONSO>

//=================================
// include guard
#ifndef DEV_CPP_REPARTITION_H_
#define DEV_CPP_REPARTITION_H_

#include <string>
#include <vector>
#include <Assignation.h>

//=================================
// the actual class
class Repartition {
    public:
      vector<Assignation> getRepartition();
      void calculerErreur();
      int getErreur();


    private:
      vector<Assignation> assignations;
      int erreur;
};



#endif  // DEV_CPP_REPARTITION_H_
