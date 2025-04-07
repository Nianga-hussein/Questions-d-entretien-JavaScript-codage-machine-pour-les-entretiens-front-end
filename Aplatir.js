/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
    // Vérifie si l'argument est un tableau
    if (!Array.isArray(value)) {
      throw new TypeError('L\'argument doit être un tableau');
    }
  
    // Fonction interne pour aplatir récursivement
    const flattenArray = (array) => {
      return array.reduce((accumulator, current) => {
        // Si l'élément actuel est un tableau, on l'aplatit récursivement
        if (Array.isArray(current)) {
          return accumulator.concat(flattenArray(current));
        }
        // Sinon, on ajoute l'élément à l'accumulateur
        return accumulator.concat(current);
      }, []);
    };
  
    return flattenArray(value);
  }
  