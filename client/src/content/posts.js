// Blog posts. Body is structured blocks (rendered as React elements, never raw HTML).
// Block types: { p }, { h2 }, { ul: [] }
export const posts = [
  {
    slug: 'what-to-do-when-your-dog-has-a-seizure',
    title: 'What to do when your dog has a seizure',
    excerpt: 'A calm, step-by-step guide for the first few minutes, and what to note down afterwards.',
    date: '2026-09-18',
    readMinutes: 5,
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1600&q=75',
    imageAlt: 'A Jack Russell terrier looking at the camera',
    body: [
      { p: 'Watching your dog have a seizure is frightening. Knowing what to do ahead of time makes it easier to stay calm and keep them safe.' },
      { h2: 'During the seizure' },
      {
        ul: [
          'Note the time, or start the CLAWKIT timer. Duration is the single most useful thing to tell your vet.',
          'Move furniture and other objects away, and keep your dog away from stairs and water.',
          'Keep your hands away from their mouth. Dogs do not swallow their tongues.',
          'Keep the room quiet and dim if you can.',
        ],
      },
      { h2: 'When to call the vet immediately' },
      {
        ul: [
          'The seizure lasts longer than five minutes.',
          'Your dog has more than one seizure within 24 hours (a cluster).',
          'Your dog doesn’t recover between seizures.',
          'This is their first seizure.',
        ],
      },
      { h2: 'Afterwards' },
      { p: 'Many dogs are disoriented, restless or temporarily blind for a while after a seizure. This is called the post-ictal phase. Keep them somewhere safe and quiet, offer water once they are steady, and write down what you saw while it is fresh: how it started, which parts of the body were involved, how long recovery took, and anything unusual earlier that day.' },
      { p: 'This guide is general information and not a substitute for advice from your veterinarian.' },
    ],
  },
  {
    slug: 'spotting-seizure-triggers',
    title: 'Spotting seizure triggers with a simple log',
    excerpt: 'Sleep, stress, food and missed doses can all play a part. Here is how a consistent log helps you find patterns.',
    date: '2026-09-04',
    readMinutes: 4,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1600&q=75',
    imageAlt: 'An Australian shepherd on a beach',
    body: [
      { p: 'Not every seizure has an obvious cause, but many owners notice patterns once they have a few months of consistent records.' },
      { h2: 'Common factors owners track' },
      {
        ul: [
          'Late or missed medication doses',
          'Disrupted sleep, travel or changes in routine',
          'Excitement or stress, such as visitors or fireworks',
          'Diet changes and new treats',
          'Time of day and time since the last seizure',
        ],
      },
      { h2: 'Why consistency beats detail' },
      { p: 'A short entry every time is more useful than a long entry some of the time. Gaps make trends harder to see. That’s why CLAWKIT keeps logging to a few taps and lets you add detail later.' },
      { p: 'Always discuss suspected triggers with your vet before changing medication or routine.' },
    ],
  },
  {
    slug: 'preparing-for-a-vet-visit',
    title: 'Getting the most out of your vet appointment',
    excerpt: 'What to bring, what to ask, and how to turn your log into a useful conversation.',
    date: '2026-08-21',
    readMinutes: 3,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1600&q=75',
    imageAlt: 'A happy beagle looking up',
    body: [
      { p: 'Appointments go quickly. A little preparation helps you and your vet focus on what matters.' },
      { h2: 'Bring' },
      {
        ul: [
          'A summary of seizures since the last visit: dates, durations and any clusters',
          'Current medications, doses and any missed doses',
          'Videos of a seizure, if you have one. They help your vet a lot.',
        ],
      },
      { h2: 'Ask' },
      {
        ul: [
          'Is the current frequency within the target for my dog?',
          'Are there side effects I should watch for?',
          'When should blood levels be checked next?',
          'What is our emergency plan for long seizures or clusters?',
        ],
      },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
