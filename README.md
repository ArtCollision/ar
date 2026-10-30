# Art Collision · AR

Site that opens the animated 3D logo in augmented reality when someone scans the QR code on the business card.

**Address printed in the QR code:** `https://ar.artcollision.ca`

| Who scans | What happens |
|---|---|
| iPhone / iPad (camera, Safari, Chrome) | The logo opens directly in AR (AR Quick Look, `.usdz` file) |
| Android (camera / Google Lens, Chrome) | The logo opens directly in AR (Google Scene Viewer, `.glb` file) |
| Computer, or an app such as Instagram/LinkedIn | A web page with the animated 3D logo, an AR button and the contact details |

## Contents

```
index.html                         Web page (3D viewer + AR button + contact)
candice-dan.vcf                    "Add to contacts" card
models/ArtCollision_Logo_AR.glb    Model for Android / web
models/ArtCollision_Logo_AR.usdz   Model for iPhone
netlify/edge-functions/ar-launch.js  Launches AR automatically based on the phone
netlify.toml                       Netlify settings (file types, cache)
vendor/model-viewer.min.js         Google 3D viewer (v4.3.1, hosted locally)
img/                               Favicon, QR, preview image
```

---

## Guide (in French)

### 1. Mettre le dossier sur GitHub
1. Allez sur **github.com** → bouton **New** (nouveau dépôt).
2. Nom : `artcollision-ar` · Visibilité : **Public** ou **Private** (les deux fonctionnent avec Netlify) → **Create repository**.
3. Sur la page du dépôt vide, cliquez **uploading an existing file**.
4. Glissez **tout le contenu** du dossier `artcollision-ar` (pas le dossier lui-même : `index.html`, `models`, `netlify`, `netlify.toml`, etc. doivent être à la racine).
   ⚠️ Le dossier `netlify` commence sans point, il s'upload normalement. Vérifiez qu'il apparaît bien après l'upload.
5. **Commit changes**.

### 2. Publier avec Netlify
1. **app.netlify.com** → **Add new site** → **Import an existing project** → **GitHub** → autorisez → choisissez `artcollision-ar`.
2. Réglages de build : laissez **Build command vide**, **Publish directory** = `.` (déjà défini dans `netlify.toml`).
3. **Deploy**. Après ~1 minute, vous avez une adresse du type `https://xxxx.netlify.app`.
4. Testez sur ordinateur : `https://xxxx.netlify.app` → vous devez voir le logo 3D animé.

### 3. Brancher `ar.artcollision.ca`
1. Dans Netlify : **Domain management** → **Add a domain** → tapez `ar.artcollision.ca` → **Verify** → **Add domain**.
2. Netlify indique d'ajouter un enregistrement DNS. Chez le fournisseur de votre domaine `artcollision.ca` (GoDaddy, Namecheap, Squarespace, Wix, Cloudflare…), dans la zone DNS, ajoutez :

   | Type | Nom / Hôte | Valeur / Cible |
   |---|---|---|
   | `CNAME` | `ar` | `xxxx.netlify.app` (votre adresse Netlify) |

   Si vous utilisez Cloudflare : mettez le nuage en **gris (DNS only)**.
3. Attendez 5 min à quelques heures. Netlify active ensuite le **HTTPS** automatiquement (Let's Encrypt). Vérifiez dans **Domain management → HTTPS** que le certificat est actif.

### 4. Tester AVANT d'imprimer
- 📱 **iPhone** : ouvrez l'appareil photo, scannez le QR → le logo doit apparaître directement en AR (onglet « AR »). Posez-le sur une table, il s'anime.
- 📱 **Android** : scannez avec l'appareil photo ou Google Lens → « Scene Viewer » s'ouvre en AR.
- 💻 **Ordinateur** : `https://ar.artcollision.ca` → page 3D + QR.
- Page complète forcée (utile pour vérifier) : `https://ar.artcollision.ca/?view=1`

### Modifier plus tard
- Nouveau modèle 3D : remplacez les fichiers dans `models/` **avec exactement les mêmes noms** → Commit sur GitHub → Netlify republie automatiquement. Le QR imprimé reste valide.
- Ne changez jamais l'adresse `ar.artcollision.ca` : elle est imprimée sur les cartes.
