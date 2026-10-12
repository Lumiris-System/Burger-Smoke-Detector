import { useEffect, useState } from 'react'

/* ====== Contenu du site : les données viennent des documents du projet ====== */
const EQUIPE = ['FRAPPA Damien', 'MASSON Paul', 'Lycée Raymond QUENEAU – Terminale STI2D']

// Ce que demande le sujet (dossier travail)
const SUJET = [
  'Le produit doit respecter les normes en vigueur.',
  'On ne s’occupe pas du système de détection, de l’alimentation, du contrôle de la pile ni du bouton de test : seulement de leurs dimensions.',
  'Une production de 2000 modèles est envisagée.',
]

const PIECES = 'platine de fixation, boîtier intermédiaire, boîtier supérieur, pile 9 V, poussoir de présence pile, disque de sonnerie, marteaux vibrants, circuit imprimé, LED et bouton témoin.'

// Remarque du sujet : ce qui est conservé
const IMPOSE = [
  'La fixation entre la platine murale et le boîtier intermédiaire',
  'Le logement de la pile',
  'La position et les dimensions de la carte électronique',
  'La position de la LED',
  'Le témoin de présence pile',
]

// Les 11 exigences du nouveau cahier des charges
const EXIGENCES = [
  ['EX-1', 'Fixer au plafond', '2,5 m de chute sur béton, 50 N, 30 N pour démonter la platine'],
  ['EX-2', 'Limiter la masse', '200 g maximum'],
  ['EX-3', 'Protéger l’électronique', '70 % de recouvrement du circuit, 5 min à 250 °C'],
  ['EX-4', 'Changer la pile', '180 g maximum'],
  ['EX-5', 'Sécuriser le changement de pile', 'Manipulation aisée, sans toucher le circuit'],
  ['EX-6', 'Vérifier la pile sans démonter', 'Trou dans le boîtier supérieur : Ø 6 mm ± 0,5'],
  ['EX-7', 'Prendre en main facilement', 'Aucune pièce séparée, sauf la platine restée au plafond'],
  ['EX-8', 'Entendre l’avertisseur', '85 dB minimum à 3 m'],
  ['EX-9', 'Respecter les normes', 'NF EN 14604-2005'],
  ['EX-10', 'Être éco-conçu', 'Moins de matière, matériaux recyclables, pièces marquées'],
  ['EX-11', 'Être esthétique', 'Logo STI2D sur 50 % de la plus grande face'],
]

// Étape 1 du sujet : le détecteur existant et les solutions du constructeur
const EXISTANT = [
  ['1. Fixer au plafond', '2 vis à tête fraisée, et des crochets qui maintiennent le boîtier intermédiaire'],
  ['2. Limiter la masse', 'Plastique et formes arrondies'],
  ['3. Protéger l’électronique', 'Boîtier en deux parties, clipsées puis vissées par 2 vis à tête fraisée'],
  ['4. Changer la pile', 'Pile 9 V (MN 1604 ou GP 1604P) dans un logement du boîtier intermédiaire, connecteur à détrompeur'],
  ['5. Protéger l’accès à l’électronique', 'Les deux boîtiers sont solidaires : on ne peut pas les démonter séparément'],
  ['6. Vérifier l’état de la pile', 'LED rouge sous le bouton témoin ; l’avertisseur sonne quand on appuie dessus'],
  ['7. Prendre en main', 'Formes rondes de faible épaisseur, un seul sens de montage'],
  ['8. Entendre l’avertisseur', 'Des marteaux frappent le disque de sonnerie ; fentes dans le boîtier supérieur'],
  ['9. Respecter les normes', 'Norme NF EN 14604-2005 ; LED qui clignote toutes les 43 s ; bouton de test'],
]

// La maquette numérique (public/img/SolidWorks/)
const GALERIE = [
  { path: 'img/SolidWorks/assemblage.png', label: 'Vue assemblée', ratio: '4 / 3', caption: 'La maquette numérique assemblée sous SolidWorks' },
  { path: 'img/SolidWorks/éclatée.png', label: 'Vue éclatée', ratio: '3 / 4', caption: 'Vue éclatée : les pièces du burger et l’électronique' },
]

// Recherche d'antériorité : les dessins et modèles déposés à l'INPI (public/img/INPI/)
const INPI = [
  { ref: 'FR996552-003', url: 'https://data.inpi.fr/dessins_modeles/FR996552-003', vues: ['enjoliveur.png', 'enjoliveur-2.png'] },
  { ref: 'WODM/216932-001', url: 'https://data.inpi.fr/dessins_modeles/WODM/216932-001', vues: ['kippa.png', 'kippa-2.png'] },
  { ref: 'FR20232267-001', url: 'https://data.inpi.fr/dessins_modeles/FR20232267-001', vues: ['casque Mineur.png', 'casque Mineur-2.png'] },
]

// L'archive téléchargeable et ce qu'elle contient (public/SolidWorks/)
const ARCHIVE = { path: 'SolidWorks/SolidWorks.zip', nom: 'SolidWorks.zip' }

const CONTENU = [
  ['Les assemblages', [
    'Burger.SLDASM : la maquette complète',
    'Assemblage CE V2.SLDASM : l’électronique et les pièces du commerce',
  ]],
  ['Les pièces', [
    'Côté burger : pain haut, pain bas, tomate, steak support pile et pile 9 V',
    'Côté commerce : carte électronique, bouton témoin, LED et disque de sonnerie',
  ]],
  ['Les plans, les croquis et eDrawings', [
    'Burger - Mise en Plan et Burger - Croquis, en PDF et en SLDDRW',
    'Le fichier eDrawings Burger.EASM et sa visionneuse Burger_64.exe',
  ]],
]

// Argumentation du design retenu (public/argumentation.txt)
const ARGUMENTATION = 'Les détecteurs de fumée lambda ont tous le même style : tout blanc, tout fade. Nous avons donc choisi un design de burger, en pensant que pour les fast-foods cela pouvait être pertinent, vu le thème du lieu.'

const MENU = [
  ['intro', 'Le projet'],
  ['existant', 'Le détecteur actuel'],
  ['cdc', 'Les 11 exigences'],
  ['inpi', 'Recherche à l’INPI'],
  ['modelisation', 'Réalisation 3D'],
  ['fichiers', 'Les fichiers 3D'],
  ['argumentation', 'L’argumentation'],
]
/* ========================================================== */

// Tout se dépose dans public/ : les visuels dans public/img/, l’archive dans public/SolidWorks/
const asset = (path) => encodeURI(`${import.meta.env.BASE_URL}${path}`)

// fit : le visuel est montré en entier (plans, dessins, rendus) au lieu d'être recadré
// debug : affiche le chemin du fichier quand le visuel ne se charge pas (à couper sur les visuels INPI)
function Shot({ path, alt, label, fit, ratio, debug = true }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`shot${fit ? ' fit' : ''}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {ok
        ? <img src={asset(path)} alt={alt} onError={() => setOk(false)} />
        : <span>{label}{debug && <><br />(public/{path})</>}</span>}
    </div>
  )
}

// render(colonne, valeur) : habillage propre à chaque colonne (pastilles…)
function Table({ head, rows, render }) {
  return (
    <div className="scroll">
      <table>
        <thead>
          <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} data-label={head[j]}>{render ? render(j, c) : c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SecHead({ n, kicker, children }) {
  return (
    <header className="sec-head">
      <span className="chapter" aria-hidden="true">{n}</span>
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{children}</h2>
      </div>
    </header>
  )
}

// Pastille pour le numéro d'exigence (colonne 0)
const exigenceCell = (j, c) => (j === 0 ? <span className="tag">{c}</span> : c)

function Nav({ open, setOpen, active, progress }) {
  return (
    <>
      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <button
        type="button"
        className="burger"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen(!open)}
      >
        <span className="burger-lines" aria-hidden="true"><i /><i /><i /></span>
        {open ? 'Fermer' : 'Sommaire'}
      </button>

      <nav id="menu" className={`rail${open ? ' open' : ''}`} aria-label="Sections">
        <p className="rail-brand">
          <span className="rail-burger" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>Détecteur<br />de fumée</span>
        </p>
        <ol>
          {MENU.map(([id, nom], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'on' : undefined}
                aria-current={active === id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span>{nom}</span>
              </a>
            </li>
          ))}
        </ol>
        <p className="rail-foot">Projet STI2D · ITEC<br />Lycée Raymond Queneau</p>
      </nav>

      {open && <div className="scrim" aria-hidden="true" onClick={() => setOpen(false)} />}
    </>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(MENU[0][0])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0)

      let courant = MENU[0][0]
      for (const [id] of MENU) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.3) courant = id
      }
      setActive(courant)
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('locked', open)
  }, [open])

  return (
    <>
      <a className="skip" href="#intro">Aller au contenu</a>
      <Nav open={open} setOpen={setOpen} active={active} progress={progress} />

      <main>
        <section id="intro">
          <div className="wrap">
            <p className="kicker">Projet STI2D · ITEC · Terminale</p>
            <h1>Un détecteur de fumée qui se fond dans l'intérieur d'un fast-food.</h1>
            <p className="lead">Proposer un boîtier « plutôt design » de détecteur de fumée pour une habitation individuelle : il doit s'intégrer au style de l'endroit où il est placé et respecter les normes en vigueur.</p>
            <h2>Le contexte</h2>
            <p>La loi exige depuis mars 2015 au moins un détecteur de fumée par habitation. Il en existe beaucoup dans le commerce, mais aucun ne prend en compte l'endroit où il est placé : une pièce rustique, moderne ou classique.</p>
            <h2>Ce que demande le sujet</h2>
            <ul>{SUJET.map((s) => <li key={s}>{s}</li>)}</ul>
            <h2>Le détecteur de départ</h2>
            <p>La maquette numérique fournie est celle d'un détecteur AREV, modèle HS-104, de la société ARLUX Trade. Il est composé de : {PIECES}</p>
            <ul className="meta" aria-label="Équipe">
              {EQUIPE.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        </section>

        <section id="existant">
          <div className="wrap">
            <SecHead n="02" kicker="Étape 1">Le détecteur actuel</SecHead>
            <p>Le sujet demande de lire les descriptions fonctionnelles du détecteur existant, pour voir quelles solutions le constructeur a retenues (exigences 1 à 9).</p>
            <Table head={['Exigence de l’existant', 'Solution du constructeur']} rows={EXISTANT} />
          </div>
        </section>

        <section id="cdc">
          <div className="wrap">
            <SecHead n="03" kicker="Étape 6">Les 11 exigences</SecHead>
            <p>Le sujet demande de chercher une ou deux solutions différentes pour chaque exigence du nouveau cahier des charges, en s'appuyant sur l'analyse du détecteur existant.</p>
            <div className="box">
              <h3>Ce qui ne change pas</h3>
              <ul>{IMPOSE.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <h3 style={{ marginTop: '2.5rem' }}>Les niveaux à respecter</h3>
            <Table head={['N°', 'Exigence', 'Niveau d’acceptation']} rows={EXIGENCES} render={exigenceCell} />
            <p className="note">Le sujet donne deux limites de masse : 200 g en EX-2 et 180 g en EX-4. On vise 180 g pour les trois pièces.</p>
          </div>
        </section>

        <section id="inpi">
          <div className="wrap">
            <SecHead n="04" kicker="Recherche et design">Recherche d’antériorité à l’INPI</SecHead>
            <p>Avant de dessiner, on a vérifié que nos idées n’existaient pas déjà : on a cherché sur le site de l’INPI les dessins et modèles déposés, puis on a gardé ceux qui pouvaient nous inspirer sans être de la contrefaçon.</p>
            <div className="inpi">
              {INPI.map((m) => (
                <figure key={m.ref}>
                  <div className="pair">
                    {m.vues.map((vue, i) => (
                      <Shot
                        key={vue}
                        fit
                        debug={false}
                        ratio="4 / 3"
                        path={`img/INPI/${vue}`}
                        alt={`Dessin ou modèle déposé à l’INPI, référence ${m.ref}, vue ${i + 1}`}
                        label={`Vue ${i + 1}`}
                      />
                    ))}
                  </div>
                  <figcaption>
                    <a href={m.url} target="_blank" rel="noreferrer">{m.ref}</a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="modelisation">
          <div className="wrap">
            <SecHead n="05" kicker="Étapes 7 à 9">Réalisation 3D</SecHead>
            <p className="lead">Trois pièces sont à modifier sous SolidWorks : la platine de fixation (trop épaisse), le boîtier intermédiaire, et le boîtier supérieur pour le design et l'ergonomie. Le logo est modélisé aussi, et l'assemblage doit être validé dans le modeleur volumique.</p>
            <p>Le matériau et le procédé d'obtention se choisissent avec CES Edupack. Le moulage par injection est possible si le détecteur est produit en grande série : il impose des formes avec dépouille, une épaisseur de matière constante et pas de contre-dépouille. Les formes sont ensuite affinées en fonction de la matière, du procédé et de l'épaisseur mini.</p>
            <div className="gallery">
              {GALERIE.map((g) => (
                <figure key={g.path}>
                  <Shot fit ratio={g.ratio} path={g.path} alt={g.caption} label={g.label} />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="fichiers">
          <div className="wrap">
            <SecHead n="06" kicker="Fichiers SolidWorks">Télécharger la maquette</SecHead>
            <p className="lead">Tous les fichiers de la maquette numérique sont regroupés dans une seule archive : les assemblages, les pièces, les mises en plan, les croquis et le fichier eDrawings.</p>
            <p className="dl">
              <a className="btn" href={asset(ARCHIVE.path)} download={ARCHIVE.nom}>Télécharger l’archive complète (.zip)</a>
              <span className="dl-size">Archive de 38 Mo · 24 fichiers</span>
            </p>
            <div className="needs">
              {CONTENU.map(([titre, items]) => (
                <div className="box" key={titre}>
                  <h3>{titre}</h3>
                  <ul>{items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="argumentation">
          <div className="wrap">
            <SecHead n="07" kicker="Le design retenu">L’argumentation</SecHead>
            <p className="lead">{ARGUMENTATION}</p>
          </div>
        </section>
      </main>

      <footer>
        <p>Projet STI2D – ITEC – Détecteur avertisseur autonome de fumée (DAAF) – Lycée Raymond Queneau, Terminale STI2D</p>
        <p className="sources">
          Recherche d'antériorité INPI (dessins et modèles) :{' '}
          <a href="https://data.inpi.fr/dessins_modeles/FR996552-003">FR996552-003</a> ·{' '}
          <a href="https://data.inpi.fr/dessins_modeles/WODM/216932-001">WODM/216932-001</a> ·{' '}
          <a href="https://data.inpi.fr/dessins_modeles/FR20232267-001">FR20232267-001</a>
        </p>
      </footer>
    </>
  )
}
