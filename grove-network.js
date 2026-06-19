/* The Grove — Network Channels dataset
   Species nodes + validated interaction "channels" grounded in iNaturalist
   observations from project "thegrove" (Matela, Portugal). Animal & plant
   taxa are real observations; channels are ecological interactions, each with
   evidence and a community-validation state mirroring iNaturalist grades. */
window.GROVE = (function () {
  // taxon palette (bridges the DSL-IP constellation + TerraFirme Living Network)
  const TAXON = {
    Plantae:   { c: '#2E7D4F', label: 'Plant' },
    Insecta:   { c: '#E0A23C', label: 'Insect' },
    Arachnida: { c: '#B08FE0', label: 'Arachnid' },
    Amphibia:  { c: '#36B3A6', label: 'Amphibian' },
    Aves:      { c: '#5BA9DE', label: 'Bird' },
    Mammalia:  { c: '#FF6A45', label: 'Mammal' },
    Mollusca:  { c: '#C9B458', label: 'Mollusc' },
    Animalia:  { c: '#8FA39A', label: 'Other invertebrate' }
  };
  // interaction channel types
  const TYPES = {
    pollination: { label: 'Pollination',         glyph: 'P', c: '#C6F25A' },
    herbivory:   { label: 'Herbivory / host',     glyph: 'H', c: '#9BD86A' },
    predation:   { label: 'Predation',            glyph: 'X', c: '#FF6A45' },
    gall:        { label: 'Gall / parasitism',    glyph: 'G', c: '#B08FE0' },
    frugivory:   { label: 'Frugivory / dispersal', glyph: 'F', c: '#5BA9DE' },
    detritus:    { label: 'Detritivory / dung',   glyph: 'D', c: '#C9B458' },
    mutualism:   { label: 'Mutualism',            glyph: 'M', c: '#36B3A6' },
    mining:      { label: 'Leaf mining',          glyph: 'N', c: '#E0A23C' },
    management:  { label: 'Management (human)',    glyph: 'A', c: '#EFF1E9' }
  };

  // group = trophic cluster (used for radial layout angle)
  const S = (sci, common, taxon, group, idGrade, n) => ({ id: sci, sci, common, taxon, group, idGrade, n });
  const species = [
    // --- plants (producers) ---
    S('Quercus suber','Cork oak','Plantae','plant','research',3),
    S('Quercus pyrenaica','Pyrenean oak','Plantae','plant','research',1),
    S('Pinus pinaster','Maritime pine','Plantae','plant','research',1),
    S('Crataegus monogyna','Hawthorn','Plantae','plant','research',4),
    S('Prunus avium','Wild cherry','Plantae','plant','research',1),
    S('Salix','Willow','Plantae','plant','research',5),
    S('Cistus ladanifer','Gum rock-rose','Plantae','plant','research',3),
    S('Lavandula pedunculata','French lavender','Plantae','plant','research',1),
    S('Cytisus striatus','Hairy-fruited broom','Plantae','plant','research',3),
    S('Genista tridentata','Carqueja','Plantae','plant','research',1),
    S('Trifolium incarnatum','Crimson clover','Plantae','plant','research',1),
    S('Rubus','Bramble','Plantae','plant','research',1),
    S('Echium','Vipers-bugloss','Plantae','plant','research',1),
    S('Digitalis purpurea','Foxglove','Plantae','plant','research',1),
    S('Urtica','Nettle','Plantae','plant','research',1),
    S('Poaceae','Grasses','Plantae','plant','research',3),
    // --- herbivorous / phytophagous insects ---
    S('Aporia crataegi','Black-veined white','Insecta','herbivore','research',2),
    S('Iphiclides feisthamelii','Iberian scarce swallowtail','Insecta','herbivore','research',2),
    S('Polyommatus icarus','Common blue','Insecta','herbivore','needs_id',1),
    S('Zygaena trifolii','Five-spot burnet','Insecta','herbivore','research',1),
    S('Aglais io','European peacock','Insecta','herbivore','research',1),
    S('Chrysolina americana','Rosemary beetle','Insecta','herbivore','research',1),
    S('Chrysomela populi','Poplar leaf beetle','Insecta','herbivore','research',1),
    S('Thaumetopoea pityocampa','Pine processionary','Insecta','herbivore','research',1),
    S('Monochamus galloprovincialis','Pine sawyer beetle','Insecta','herbivore','needs_id',1),
    S('Aphididae','Aphids','Insecta','herbivore','needs_id',1),
    // --- gall / mining ---
    S('Andricus quercustozae','Oak gall wasp','Insecta','gall','research',1),
    S('Neuroterus quercusbaccarum','Common spangle gall wasp','Insecta','gall','research',1),
    S('Phyllonorycter quercifoliella','Oak midget (leaf miner)','Insecta','gall','needs_id',1),
    // --- pollinators ---
    S('Bombus terrestris','Buff-tailed bumblebee','Insecta','pollinator','needs_id',1),
    S('Xylocopa cantabrita','Cantabrian carpenter bee','Insecta','pollinator','research',1),
    // --- invertebrate predators ---
    S('Coccinella septempunctata','Seven-spot ladybird','Insecta','predator','research',1),
    S('Mantis religiosa','European mantis','Insecta','predator','research',2),
    S('Empusa pennata','Conehead mantis','Insecta','predator','research',2),
    S('Messor barbarus','Barbary harvester ant','Insecta','predator','needs_id',1),
    S('Scarabaeus laticollis','Dung beetle','Insecta','decomposer','research',1),
    // --- arachnids ---
    S('Agalenatea redii','Gorse orbweaver','Arachnida','spider','research',2),
    S('Synema globosum','Napoleon crab spider','Arachnida','spider','research',1),
    // --- molluscs / decomposers ---
    S('Arion ater','Black slug','Mollusca','decomposer','research',2),
    S('Cornu aspersum','Garden snail','Mollusca','decomposer','research',1),
    S('Crassiclitellata','Earthworms','Animalia','decomposer','needs_id',1),
    // --- amphibians ---
    S('Salamandra salamandra','Fire salamander','Amphibia','amphibian','research',2),
    S('Bufo spinosus','Spiny toad','Amphibia','amphibian','research',1),
    S('Rana iberica','Iberian frog','Amphibia','amphibian','research',2),
    // --- birds ---
    S('Turdus merula','Common blackbird','Aves','bird','research',1),
    S('Erithacus rubecula','European robin','Aves','bird','research',1),
    // --- mammals ---
    S('Capreolus capreolus','Roe deer','Mammalia','mammal','needs_id',1),
    S('Lepus granatensis','Iberian hare','Mammalia','mammal','needs_id',1),
    S('Sus scrofa','Wild boar','Mammalia','mammal','research',1),
    S('Vulpes vulpes','Red fox','Mammalia','mammal','research',1),
    S('Genetta genetta','Common genet','Mammalia','mammal','research',1),
    S('Cricetidae','Voles','Mammalia','mammal','needs_id',1),
    // --- human agent ---
    { id:'Eichner', sci:'Homo sapiens', common:'Eichner', taxon:'Mammalia', group:'agent', idGrade:'na', n:1, agent:true,
      proficiency:'Mediocre farmer', access:{ Market:'Low', Information:'Low', Inputs:'Low' }, inputs:'seeds · seedlings · labour · innovation' }
  ];

  // channel: [a, b, type, description, agree, disagree, evidence]
  const C = (a,b,type,desc,agree,disagree,ev) => ({ id:a+'__'+b, a, b, type, desc, agree, disagree, ev: ev||'' });
  const channels = [
    // gall / mining on oak — strongly evidenced
    C('Andricus quercustozae','Quercus suber','gall','Larvae induce woody "oak apple" galls on cork-oak buds, diverting plant resources to the developing wasp.',6,0,'Obs of A. quercustozae on Quercus, The Grove'),
    C('Neuroterus quercusbaccarum','Quercus pyrenaica','gall','Asexual generation forms flat "spangle" galls on the underside of oak leaves.',5,0,''),
    C('Phyllonorycter quercifoliella','Quercus suber','mining','Larva mines between the leaf surfaces of oak, leaving a tentiform blotch mine.',3,1,''),
    // host-plant herbivory — noted in observations
    C('Aporia crataegi','Crataegus monogyna','herbivory','Caterpillars feed on hawthorn; adults observed clinging to hawthorn branches at the site.',5,0,'Note: "They were clinging to hawthorn branches."'),
    C('Iphiclides feisthamelii','Prunus avium','herbivory','Larval host plant; larvae found on the leaves of a young wild cherry.',5,0,'Note: "Found on the leaves of a young cherry tree (Prunus avium)."'),
    C('Polyommatus icarus','Trifolium incarnatum','herbivory','Larvae feed on clovers and other legumes (Fabaceae).',3,1,''),
    C('Zygaena trifolii','Trifolium incarnatum','herbivory','Larval host plants are legumes such as clovers and bird\'s-foot trefoil.',3,0,''),
    C('Aglais io','Urtica','herbivory','Larvae feed gregariously on common nettle.',4,0,''),
    C('Chrysolina americana','Lavandula pedunculata','herbivory','Adults and larvae feed on aromatic Lamiaceae including lavender and rosemary.',4,0,''),
    C('Chrysomela populi','Salix','herbivory','Leaf beetle grazing on willow and poplar foliage.',3,0,''),
    C('Thaumetopoea pityocampa','Pinus pinaster','herbivory','Processionary caterpillars defoliate pines, building communal silk nests.',6,0,''),
    C('Monochamus galloprovincialis','Pinus pinaster','herbivory','Saproxylic larva bores in stressed/dead pine wood; vector of pine wood nematode. Found in a pine stump.',4,1,'Note: "Wood borer inside a pine tree stump."'),
    C('Aphididae','Cytisus striatus','herbivory','Aphids feed on phloem sap of broom and other shrubs.',2,1,''),
    // pollination
    C('Bombus terrestris','Echium','pollination','Buzz-pollinating bumblebee foraging on viper\'s-bugloss.',3,1,''),
    C('Bombus terrestris','Digitalis purpurea','pollination','Long-tongued bumblebees are the principal pollinators of foxglove.',4,0,''),
    C('Xylocopa cantabrita','Cytisus striatus','pollination','Carpenter bee trips the explosive flowers of broom, transferring pollen.',3,0,''),
    C('Xylocopa cantabrita','Lavandula pedunculata','pollination','Large carpenter bee foraging on lavender.',2,1,''),
    C('Aglais io','Rubus','pollination','Adult butterflies nectar on bramble blossom, moving pollen between flowers.',2,1,''),
    C('Zygaena trifolii','Cistus ladanifer','pollination','Day-flying burnet moths nectar on rock-rose.',2,1,''),
    // pollinator <-> ambush predator on flowers
    C('Synema globosum','Cistus ladanifer','predation','Crab spider ambushes pollinators from rock-rose flowers — sit-and-wait predation at the flower.',2,1,'Flower-ambush on Cistaceae'),
    C('Synema globosum','Bombus terrestris','predation','Crab spider preys on visiting bees at the flower head.',2,0,''),
    // invertebrate predation
    C('Coccinella septempunctata','Aphididae','predation','Seven-spot ladybird (adult and larva) is a major aphid predator.',7,0,''),
    C('Mantis religiosa','Aporia crataegi','predation','Mantis ambushes butterflies and other flying insects.',2,1,''),
    C('Mantis religiosa','Bombus terrestris','predation','Mantis takes bees and large flying insects.',2,1,''),
    C('Empusa pennata','Bombus terrestris','predation','Conehead mantis preys on flower-visiting insects.',2,1,''),
    C('Agalenatea redii','Zygaena trifolii','predation','Orb-web spider captures day-flying moths and other insects in its web.',2,0,''),
    C('Agalenatea redii','Bombus terrestris','predation','Bees and flies intercepted by the orb web.',2,1,''),
    // ant–aphid mutualism + granivory
    C('Messor barbarus','Aphididae','mutualism','Harvester ants tend aphids for honeydew, protecting them from predators.',2,1,''),
    C('Messor barbarus','Poaceae','herbivory','Harvester ants collect grass seeds, caching and partly dispersing them.',3,0,''),
    // detritivory / dung
    C('Arion ater','Salix','herbivory','Slug grazes on low foliage and seedlings.',2,1,''),
    C('Cornu aspersum','Urtica','herbivory','Garden snail rasps herbaceous foliage.',2,1,''),
    C('Scarabaeus laticollis','Sus scrofa','detritus','Dung beetle buries and feeds on mammal dung, recycling nutrients and burying seeds.',4,0,''),
    C('Scarabaeus laticollis','Capreolus capreolus','detritus','Dung beetle processes roe-deer droppings.',3,1,''),
    C('Crassiclitellata','Quercus suber','detritus','Earthworms decompose oak leaf litter, building soil.',3,0,''),
    // amphibian predation
    C('Salamandra salamandra','Arion ater','predation','Fire salamander preys on slugs and other soft-bodied invertebrates.',4,0,''),
    C('Salamandra salamandra','Crassiclitellata','predation','Salamander feeds on earthworms in the leaf litter.',3,0,''),
    C('Bufo spinosus','Coccinella septempunctata','predation','Spiny toad is a generalist predator of ground beetles and other insects.',2,1,''),
    C('Rana iberica','Agalenatea redii','predation','Iberian frog takes spiders and insects near water.',2,1,''),
    // bird interactions
    C('Turdus merula','Crataegus monogyna','frugivory','Blackbird eats hawthorn haws and disperses the seeds — a key dispersal channel.',5,0,''),
    C('Turdus merula','Rubus','frugivory','Blackbird feeds on blackberries, dispersing seeds across the site.',4,0,''),
    C('Turdus merula','Cornu aspersum','predation','Blackbird smashes and eats snails.',3,0,''),
    C('Erithacus rubecula','Aphididae','predation','Robin gleans aphids and small insects from foliage.',2,1,'Note: recorded on hunter camera'),
    // mammal browsing / herbivory
    C('Capreolus capreolus','Rubus','herbivory','Roe deer browses bramble, oak and shrub foliage.',4,0,'Note: recorded on hunter camera'),
    C('Lepus granatensis','Poaceae','herbivory','Iberian hare grazes grasses and forbs.',3,0,''),
    C('Sus scrofa','Quercus suber','frugivory','Wild boar feeds on fallen acorns and roots in the soil, dispersing some seed.',4,0,''),
    C('Sus scrofa','Crassiclitellata','predation','Rooting boar consume earthworms and soil invertebrates.',3,1,''),
    // mammal predation chains
    C('Vulpes vulpes','Lepus granatensis','predation','Red fox preys on hares.',5,0,''),
    C('Vulpes vulpes','Cricetidae','predation','Fox takes voles and small rodents.',5,0,''),
    C('Genetta genetta','Cricetidae','predation','Common genet hunts small rodents.',4,0,'Note: wildlife camera'),
    C('Vulpes vulpes','Turdus merula','predation','Fox opportunistically takes ground-foraging birds.',2,1,''),
    C('Cricetidae','Poaceae','herbivory','Voles feed on grasses, seeds and roots.',3,0,''),
    // --- human agent channels (Eichner) ---
    C('Eichner','Quercus suber','management','Harvests cork bark and acorns under light silvopastoral management of the oak stand.',3,1,'Field actor — smallholder'),
    C('Eichner','Pinus pinaster','management','Plants and fells maritime pine for timber and resin.',2,1,''),
    C('Eichner','Prunus avium','management','Cultivates wild cherry for fruit; constrained by low input access.',2,1,''),
    C('Eichner','Poaceae','management','Grazes livestock and mows grassland for hay.',3,0,''),
    C('Eichner','Sus scrofa','predation','Hunts wild boar for game and crop protection.',3,0,''),
    C('Eichner','Capreolus capreolus','predation','Hunts roe deer (game).',2,1,'')
  ];

  function gradeOf(ch){
    const a = ch.agree, d = ch.disagree, tot = a + d;
    if (a >= 4 && (tot === 0 || a / tot >= 2/3)) return 'research';
    if (a >= 2 && a / Math.max(tot,1) >= 0.5) return 'review';
    return 'proposed';
  }
  const GRADE = {
    research: { label: 'Research grade', c: '#C6F25A', dash: '' },
    review:   { label: 'Needs review',   c: '#E0A23C', dash: '5 4' },
    proposed: { label: 'Proposed',       c: '#5e7d66', dash: '2 5' }
  };
  return { species, channels, TAXON, TYPES, GRADE, gradeOf };
})();
