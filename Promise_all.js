/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default async function promiseAll(iterable) {
    // Vérification que l'entrée est un tableau
    if (!Array.isArray(iterable)) {
      throw new TypeError('L\'argument doit être un tableau');
    }
  
    // Tableau pour stocker les résultats
    const results = new Array(iterable.length);
    let resolvedCount = 0; // Compteur de promesses résolues
  
    return new Promise((resolve, reject) => {
      iterable.forEach((promise, index) => {
        // Si l'élément n'est pas une promesse, le convertir en promesse résolue
        Promise.resolve(promise)
          .then(result => {
            results[index] = result; // Stocker le résultat à l'index approprié
            resolvedCount++; // Incrémenter le compteur
  
            // Vérifier si toutes les promesses ont été résolues
            if (resolvedCount === iterable.length) {
              resolve(results); // Résoudre la promesse avec les résultats
            }
          })
          .catch(err => {
            reject(err); // Rejeter immédiatement si une promesse échoue
          });
      });
      
      // Si le tableau est vide, résoudre immédiatement avec un tableau vide
      if (iterable.length === 0) {
        resolve(results);
      }
    });
  }
  