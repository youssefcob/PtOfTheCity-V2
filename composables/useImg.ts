
const images = {
  careers: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754150749/ptofthecity/content/careers.webp',
  contactUs: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754150662/ptofthecity/content/contactUs.webp',
  eligibilityForm: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754150883/ptofthecity/content/eligibility.webp',
  whoWeAreSection: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754150936/ptofthecity/content/whoweare.webp',
  whoWeArePage: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754150991/ptofthecity/content/whoWeArePage.webp',

  // values
  compassion: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152227/ptofthecity/content/values/compassion.webp",
  fun: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152229/ptofthecity/content/values/fun.webp",
  integrity: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152231/ptofthecity/content/values/integrity.webp",
  Ownership: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152233/ptofthecity/content/values/Ownership.webp",
  reliability: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152235/ptofthecity/content/values/reliability.webp",
  uniqueness: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152238/ptofthecity/content/values/uniqueness.webp",

  //body

  abdomen: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152361/ptofthecity/content/body/abdomen.webp",
  back: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152363/ptofthecity/content/body/back.webp",
  body: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152365/ptofthecity/content/body/body.webp",
  elbows: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152366/ptofthecity/content/body/elbows.webp",
  feet: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152369/ptofthecity/content/body/feet.webp",
  hands: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152371/ptofthecity/content/body/hands.webp",
  knees: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152375/ptofthecity/content/body/knees.webp",
  lowerBack: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152377/ptofthecity/content/body/lowerBack.webp",
  neck: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152379/ptofthecity/content/body/neck.webp",
  shoulder: "https://res.cloudinary.com/dzilc11zf/image/upload/v1754152381/ptofthecity/content/body/shoulder.webp"
}

export const useImg = (img: string | undefined, width = 1200) => {
  if (!img) return '';
  const resolved = images[img as keyof typeof images] || img;
  const m = resolved.split('/');
  if (m[2] === 'res.cloudinary.com' && !m[6]?.startsWith('f_auto')) {
    m.splice(6, 0, `f_auto,q_auto:good,w_${width}`);
    return m.join('/');
  }
  return resolved;
}
