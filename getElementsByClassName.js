/**
 * @param {Element} element
 * @param {string} classNames
 * @return {Array<Element>}
 */
export default function getElementsByClassName(element, classNames) {
    // Vérifie que l'élément est un Node valide
    if (!(element instanceof Node)) {
      throw new TypeError('L\'argument doit être un élément DOM valide');
    }
  
    // Sépare les noms de classes en un tableau
    const classList = classNames.split(/\s+/).filter(Boolean);
    
    // Tableau pour stocker les résultats
    const result = [];
  
    // Fonction interne pour parcourir les descendants
    function traverse(node) {
      // Vérifie si le nœud est un élément
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Vérifie si le nœud a toutes les classes spécifiées
        const hasAllClasses = classList.every(className => node.classList.contains(className));
        
        // Si le nœud a toutes les classes, on l'ajoute au résultat
        if (hasAllClasses) {
          result.push(node);
        }
      }
  
      // Parcourt tous les enfants du nœud
      node.childNodes.forEach(child => traverse(child));
    }
  
    // Commence le parcours à partir de l'élément donné
    traverse(element);
  
    return result;
  }
  