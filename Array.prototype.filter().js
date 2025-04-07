export default function filterByClassNames(elements, classNames) {
    // Vérifie que le tableau d'éléments est valide
    if (!Array.isArray(elements)) {
      throw new TypeError('L\'argument doit être un tableau d\'éléments');
    }
  
    // Sépare les noms de classes en un tableau
    const classList = classNames.split(/\s+/).filter(Boolean);
  
    // Utilise Array.prototype.filter() pour filtrer les éléments
    return elements.filter(element => {
      // Vérifie si l'élément a toutes les classes spécifiées
      return classList.every(className => {
        // Vérifie que element.classList est défini et est un objet
        return element.classList && element.classList.contains(className);
      });
    });
  }

  const elements = [
    { classList: new Set(['foo', 'bar', 'baz']) }, // Simule un élément avec des classes
    { classList: new Set(['bar', 'baz']) },
    { classList: new Set(['foo', 'baz']) },
    { classList: new Set(['foo', 'bar']) },
  ];
  
  // Convertit les ensembles en objets avec une méthode contains
  elements.forEach(el => {
    el.classList.contains = (className) => el.classList.has(className);
  });
  
  const filteredElements = filterByClassNames(elements, 'foo bar');
  console.log(filteredElements);
  // Résultat : [ { classList: Set(3) { 'foo', 'bar', 'baz' } }, { classList: Set(2) { 'foo', 'bar' } } ]
  