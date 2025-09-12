# Level Up – UCC | Billetterie (GitHub Pages)

Site statique pour la vente de billets de l'évènement « Level Up » (graduation des étudiants) – Université Catholique du Congo.

## Fonctionnalités
- UI/UX moderne, responsive et accessible.
- Deux catégories de billets: Lauréats et Invités.
- Intégration Google Forms via modales (iframes).
- Animations: smooth scroll, reveal on scroll, hover & focus states.
- Prêt pour GitHub Pages (`.nojekyll`).

## Remplacer les URLs des Google Forms
Dans `index.html`, section « Data: URLs des Google Forms »:
```html
<script>
  window.LEVELUP_FORMS = {
    laureat: "https://docs.google.com/forms/d/e/VOTRE_ID_LAUREAT/viewform?embedded=true",
    invite: "https://docs.google.com/forms/d/e/VOTRE_ID_INVITE/viewform?embedded=true"
  };
</script>
```
- Remplacez `VOTRE_ID_LAUREAT` et `VOTRE_ID_INVITE` par vos liens Google Forms.
- Conservez `?embedded=true` pour un affichage optimal dans la modale.

## Déploiement sur GitHub Pages
1. Créez un dépôt GitHub et poussez ce dossier.
2. Sur GitHub, allez dans `Settings` > `Pages`.
3. Source: `Deploy from a branch`. Branche: `main` (ou `master`). Dossier: `/root`.
4. Enregistrez. L'URL sera `https://<votre-utilisateur>.github.io/<nom-du-depot>/`.
5. Si le favicon ou les styles ne chargent pas, utilisez des chemins relatifs (déjà le cas) et vérifiez `.nojekyll`.

## Personnalisation rapide
- Couleurs et rayons: éditez les variables CSS dans `assets/css/styles.css` (`:root`).
- Textes, sections, questions FAQ: modifiez `index.html`.
- Interactions (modales, reveal): `assets/js/main.js`.

## Accessibilité
- Navigation clavier: modales fermables avec `Échap`, focus initial sur le bouton Fermer.
- Contrastes élevés et éléments interactifs clairement visibles.

## Développement local
Ouvrez `index.html` dans votre navigateur. Aucun build requis.

---
© Level Up – UCC. Tous droits réservés.
