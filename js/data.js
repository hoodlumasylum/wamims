/* Demo data only – no real backend */
window.WAMIMS_DATA = {
  hubs: [
    { id: "mental-health", name: "Mental Health Support", icon: "🧠", short: "Mental Health" },
    { id: "spiritual", name: "Spiritual Talks", icon: "✨", short: "Spiritual Talks" },
    { id: "podcast", name: "Podcast Hub", icon: "🎙️", short: "Podcast Hub" },
    { id: "music", name: "Music & Audio", icon: "🎵", short: "Music" },
    { id: "films", name: "Films & Media", icon: "🎬", short: "Films & Media" },
    { id: "artists", name: "Artists & Creators", icon: "🎨", short: "Artists & Creators" },
    { id: "sports", name: "Sports & Fitness", icon: "🏃", short: "Sports & Fitness" },
    { id: "gaming", name: "Gaming & Esports", icon: "🎮", short: "Gaming" },
    { id: "hair", name: "Hair & Beauty", icon: "💇", short: "Hair & Beauty" },
    { id: "fashion", name: "Fashion & Brands", icon: "👗", short: "Fashion & Brands" },
    { id: "charity", name: "Charity & Community", icon: "🤝", short: "Charity & Projects" },
    { id: "events", name: "Events & Meet Ups", icon: "📅", short: "Events" }
  ],
  sidebar: [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "mental-health", label: "Mental Health", icon: "🧠" },
    { id: "podcast", label: "Podcast Hub", icon: "🎙️" },
    { id: "music", label: "Music", icon: "🎵" },
    { id: "films", label: "Films & Media", icon: "🎬" },
    { id: "artists", label: "Artists & Creators", icon: "🎨" },
    { id: "hair", label: "Hair & Beauty", icon: "💇" },
    { id: "fashion", label: "Fashion & Brands", icon: "👗" },
    { id: "sports", label: "Sports & Fitness", icon: "🏃" },
    { id: "gaming", label: "Gaming", icon: "🎮" },
    { id: "charity", label: "Charity & Projects", icon: "🤝" },
    { id: "events", label: "Events", icon: "📅" },
    { id: "support", label: "Support & Advice", icon: "💚" }
  ],
  users: [
    { id: "you", name: "Code", handle: "@code", bio: "Building WAMIMS – Walk A Mile In My Shoes.", avatar: "assets/avatar-you.jpg", location: "UK" },
    { id: "jay", name: "Jay M.", handle: "@jaybeats", bio: "Rap battles & community nights.", avatar: "assets/host-tunde.jpg", location: "Birmingham" },
    { id: "rina", name: "Rina K.", handle: "@rinacreates", bio: "Hair artist & style battles.", avatar: "assets/host-mei.jpg", location: "Manchester" },
    { id: "sam", name: "Sam O.", handle: "@samstories", bio: "Mental health peer support.", avatar: "assets/host-ola.jpg", location: "London" }
  ],
  hosts: [
    { id: "amara", name: "Amara Okeke", nationality: "British Nigerian", avatar: "assets/host-amara.jpg", voice: "Warm, clear London English" },
    { id: "dev", name: "Dev Sharma", nationality: "British Indian", avatar: "assets/host-dev.jpg", voice: "Calm Midlands English" },
    { id: "mei", name: "Mei Chen", nationality: "British Chinese", avatar: "assets/host-mei.jpg", voice: "Thoughtful Northern English" },
    { id: "ola", name: "Ola Kowalska", nationality: "Polish British", avatar: "assets/host-ola.jpg", voice: "Friendly conversational English" },
    { id: "tunde", name: "Tunde Adebayo", nationality: "Nigerian British", avatar: "assets/host-tunde.jpg", voice: "Confident clear English" }
  ],
  concepts: [
    {
      id: "solar-pack",
      title: "MileLight Solar Daypack",
      type: "Invention",
      hostId: "dev",
      image: "assets/concept-solar.jpg",
      blurb: "A modular daypack with a flexible solar panel strip and cyan status LEDs – charge a phone while you walk. Built for community outreach days and night shifts.",
      ownership: "WAMIMS Concept Lab"
    },
    {
      id: "walk-wave",
      title: "Walk Wave – Community Anthem Suite",
      type: "Music",
      hostId: "amara",
      image: "assets/concept-music.jpg",
      blurb: "An open collaboration music suite: loops, verses and stems for artists to remix stories about struggle, recovery and hope.",
      ownership: "WAMIMS Concept Lab"
    },
    {
      id: "neon-steps",
      title: "Neon Steps Mural Kit",
      type: "Art",
      hostId: "mei",
      image: "assets/concept-art.jpg",
      blurb: "A community mural concept – glowing cyan footprints leading diverse silhouettes forward. Designed for youth centres and charity walls.",
      ownership: "WAMIMS Concept Lab"
    },
    {
      id: "peer-radio",
      title: "Peer Radio Booth",
      type: "Invention",
      hostId: "ola",
      image: "assets/podcast-banner.jpg",
      blurb: "A portable recording booth kit for peer-led mental health podcasts in libraries and community halls.",
      ownership: "WAMIMS Concept Lab"
    },
    {
      id: "fit-miles",
      title: "FitMiles Challenge Cards",
      type: "Art",
      hostId: "tunde",
      image: "assets/trend-community.jpg",
      blurb: "Illustrated challenge cards that turn walking a mile into a shared story – photo prompts, mood check-ins and charity goals.",
      ownership: "WAMIMS Concept Lab"
    }
  ],
  posts: {
    "mental-health": [
      { userId: "sam", text: "Rough week, but the peer circle tonight helped. Sharing in case anyone else needs a reminder: you're not alone.", when: "2h ago" },
      { userId: "you", text: "WAMIMS Mental Health hub is for listening, not diagnosing. Check the Support page for UK helplines.", when: "5h ago" }
    ],
    "podcast": [
      { userId: "jay", text: "New episode drop: Real Life Stories – working nights and keeping your head.", when: "1h ago" },
      { userId: "sam", text: "Looking for co-hosts for a spiritual talks series. Message me.", when: "yesterday" }
    ],
    "music": [
      { userId: "jay", text: "Demo verse for Walk Wave collab is up in Concept Lab.", when: "3h ago" },
      { userId: "rina", text: "Beat battle Friday – talent vs talent, no beef.", when: "8h ago" }
    ],
    "films": [
      { userId: "you", text: "Independent short film night next month – submit cuts in Films & Media.", when: "4h ago" }
    ],
    "artists": [
      { userId: "rina", text: "Neon Steps mural kit concept looks mint. Backed it in Concept Lab.", when: "6h ago" }
    ],
    "hair": [
      { userId: "rina", text: "Hair Style vs Hair Style live room this Saturday. Bring skill, leave ego.", when: "2h ago" }
    ],
    "fashion": [
      { userId: "mei", text: "Upcycled streetwear showcase – post your fits.", when: "1d ago" }
    ],
    "sports": [
      { userId: "tunde", text: "Community 5k walk for Mind – sign up under Events.", when: "9h ago" }
    ],
    "gaming": [
      { userId: "jay", text: "Friendly FIFA clash tonight – gifts go to creators, not trash talk.", when: "3h ago" }
    ],
    "charity": [
      { userId: "sam", text: "Local food bank drive list is in Charity & Projects.", when: "7h ago" }
    ],
    "events": [
      { userId: "you", text: "WAMIMS Community Meet Up: Creative Showcase & Live Podcast – save the date.", when: "12h ago" }
    ],
    "spiritual": [
      { userId: "sam", text: "Quiet reflection thread – share what grounds you. Kindness only.", when: "5h ago" }
    ],
    "community": [
      { userId: "you", text: "Welcome to WAMIMS. Real people, real struggles, real change.", when: "1h ago" },
      { userId: "jay", text: "VS Battles board is open – talent vs talent.", when: "4h ago" }
    ],
    "support": [
      { userId: "sam", text: "If you're in crisis, please use the helplines on this page. We're peers, not clinicians.", when: "now" }
    ]
  },
  trending: [
    { title: "New Music Releases", sub: "Walk Wave stems", img: "assets/trend-music.jpg", href: "#/hub/music" },
    { title: "Independent Films", sub: "Short film night", img: "assets/trend-film.jpg", href: "#/hub/films" },
    { title: "Podcast Highlights", sub: "Real Life Stories", img: "assets/trend-podcast.jpg", href: "#/hub/podcast" },
    { title: "Mental Health Stories", sub: "Peer voices", img: "assets/trend-mh.jpg", href: "#/hub/mental-health" },
    { title: "Spiritual Talks", sub: "Quiet reflection", img: "assets/trend-spiritual.jpg", href: "#/hub/spiritual" },
    { title: "Community Projects", sub: "Neon Steps mural", img: "assets/trend-community.jpg", href: "#/concepts" }
  ],
  battles: [
    { id: "rap1", type: "Rap Battle", a: "Jay M.", b: "Lex Cold", status: "Live demo", imgA: "assets/host-tunde.jpg", imgB: "assets/host-dev.jpg" },
    { id: "art1", type: "Art Battle", a: "Mei Chen", b: "InkRoot", status: "Upcoming", imgA: "assets/host-mei.jpg", imgB: "assets/concept-art.jpg" },
    { id: "hair1", type: "Hair Style vs Hair Style", a: "Rina K.", b: "FadeLab", status: "Upcoming", imgA: "assets/host-mei.jpg", imgB: "assets/host-ola.jpg" },
    { id: "fashion1", type: "Fashion Clash", a: "StreetForm", b: "ReuseRunway", status: "Upcoming", imgA: "assets/concept-solar.jpg", imgB: "assets/trend-community.jpg" },
    { id: "debate1", type: "Debate", a: "Dev Sharma", b: "Ola K.", status: "Open room", imgA: "assets/host-dev.jpg", imgB: "assets/host-ola.jpg" },
    { id: "pod1", type: "Podcast Clash", a: "Amara Okeke", b: "Sam O.", status: "Upcoming", imgA: "assets/host-amara.jpg", imgB: "assets/host-ola.jpg" },
    { id: "dance1", type: "Dance Battle", a: "MoveUnit", b: "PulseCrew", status: "Upcoming", imgA: "assets/host-amara.jpg", imgB: "assets/host-tunde.jpg" },
    { id: "beat1", type: "Beat-Making", a: "Jay M.", b: "DrumGhost", status: "Open room", imgA: "assets/host-tunde.jpg", imgB: "assets/concept-music.jpg" },
    { id: "game1", type: "Gaming", a: "PadOne", b: "RetroRina", status: "Upcoming", imgA: "assets/host-dev.jpg", imgB: "assets/host-mei.jpg" }
  ]
};
