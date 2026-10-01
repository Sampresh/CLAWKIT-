// Terms of Service shown at /terms (linked from the app). Rendered as React elements, never raw HTML.
//
// Inline text is a string or an array of parts: 'plain', { b: 'bold' }, { link: 'text', href: '/path' }.
// Blocks: { p }, { ul: [] }, { h3 }, { callout: { tone: 'warning' | 'note', title?, text } }.
// Section ids are public anchors (clawkit.us/terms#<id>) — the app may deep-link to them, so don't rename.

export const termsMeta = {
  title: 'Terms of Service',
  updated: 'September 6, 2026',
  updatedIso: '2026-09-06',
  summary:
    'What Clawkit is, what it is not, and what we each agree to. It is a record-keeping tool, not a veterinarian.',
};

export const termsIntro = {
  id: 'before-you-start',
  title: 'Before you start',
  blocks: [
    {
      p: [
        'These Terms of Service (“Terms”) are an agreement between you and ',
        { b: 'Ausasi LLC' },
        ' — Tyler, Texas, United States (“Ausasi LLC,” “Clawkit,” “we,” “us,” or “our”), covering your use of the Clawkit mobile application (“Clawkit” or the “App”).',
      ],
    },
    {
      p: [
        'By tapping “I agree” or by using Clawkit, you accept these Terms and the ',
        { link: 'Privacy Policy', href: '/privacy' },
        '. If you do not agree, please do not use the App.',
      ],
    },
    {
      callout: {
        tone: 'warning',
        title: 'Clawkit is not a veterinarian',
        text: 'Clawkit helps you write down and organise what happened to your pet. It does not diagnose, treat, or decide what is an emergency. If you think your pet is in danger, contact a veterinarian immediately — do not wait for the App.',
      },
    },
  ],
};

export const termsSections = [
  {
    id: 'who-may-use-clawkit',
    title: 'Who May Use Clawkit',
    blocks: [
      {
        p: [
          'Clawkit is intended for adults. ',
          { b: 'You must be at least 18 years old to create an account or use the App.' },
          ' By agreeing to these Terms you confirm that you are 18 or older and that you are legally able to enter into this agreement.',
        ],
      },
      {
        p: 'If you use Clawkit on behalf of an organisation — a rescue, a boarding facility, a veterinary practice — you confirm you are authorised to accept these Terms for that organisation.',
      },
    ],
  },
  {
    id: 'what-clawkit-does',
    title: 'What Clawkit Does',
    blocks: [
      {
        p: 'Clawkit is a record-keeping tool for pet owners managing a pet with seizures or another ongoing condition. Depending on the features you use, it lets you:',
      },
      {
        ul: [
          'Time and record a seizure as it happens, or add one afterwards',
          'Record symptoms before, during and after an episode',
          'Record daily check-ins, mood, appetite, sleep and other observations',
          'Track medications, doses, schedules and missed doses',
          'Record and keep videos of an episode on your device',
          'Store veterinary and emergency contact details',
          'Generate a report you can show or send to your veterinarian',
          'Back up your records to an optional account and open them on another device',
        ],
      },
      {
        callout: {
          tone: 'note',
          title: 'An account is optional',
          text: 'Clawkit is fully usable with no account at all — your records are saved on your device either way. An account adds backup and access from a second device; it is not required to use any feature of the App.',
        },
      },
    ],
  },
  {
    id: 'not-veterinary-care',
    title: 'Clawkit Is Not Veterinary Care',
    important: true,
    blocks: [
      {
        p: [
          { b: 'This is the most important term in this document.' },
          ' Clawkit is not a veterinarian, a veterinary clinic, an emergency service, a medical device, or a provider of veterinary treatment. Clawkit does not:',
        ],
      },
      {
        ul: [
          'Diagnose seizures or any other medical condition',
          'Prescribe medication or recommend a dosage',
          'Provide veterinary treatment or veterinary advice',
          'Replace a veterinarian, or a veterinarian’s instructions',
          'Decide whether an episode is an emergency',
          'Guarantee that any record, calculation, or report is accurate or complete',
        ],
      },
      {
        p: 'Any general information the App shows about seizures, medications or related topics is for general information only and is not veterinary advice. Always consult a qualified veterinarian about your pet’s care, and follow their instructions over anything shown in the App.',
      },
      {
        callout: {
          tone: 'warning',
          title: 'In an emergency',
          text: 'If you believe your pet is having a medical emergency — including a seizure that is prolonged, repeated, or otherwise concerning — seek veterinary care immediately. Do not rely on Clawkit to tell you when to act.',
        },
      },
    ],
  },
  {
    id: 'alerts-timers-reminders',
    title: 'Alerts, Timers and Reminders Are Not Guarantees',
    blocks: [
      {
        p: 'Clawkit may show timers, thresholds, cluster notices, and medication reminders. These are conveniences built on the information you enter and on your device’s clock and notification system. They can be late, wrong, or absent entirely — because a phone was silenced, offline, out of battery, restarted, denied notification permission, or because the operating system chose to delay or drop a scheduled notification.',
      },
      {
        p: [
          { b: 'You must not rely on Clawkit as the only way you are reminded to give medication, or as the thing that tells you a seizure has gone on too long.' },
          ' Use your veterinarian’s emergency plan and your own judgement.',
        ],
      },
    ],
  },
  {
    id: 'emergency-features',
    title: 'Emergency Features Are Started By You',
    blocks: [
      {
        p: 'Clawkit may let you save a veterinarian, an emergency hospital, and an emergency contact, and to reach them from within the App. Every one of those actions is started by you.',
      },
      {
        p: [
          'Clawkit ',
          { b: 'does not automatically contact' },
          ' a veterinarian, an emergency hospital, an emergency contact, or emergency services on your behalf, and never does so based on a seizure record alone. We cannot guarantee that any call, message, or shared record is delivered, received, or answered.',
        ],
      },
    ],
  },
  {
    id: 'your-records',
    title: 'Your Records, and Who Can See Them',
    blocks: [
      {
        p: 'The information you enter about you and your pet is yours. We do not claim ownership of it. You give us only the permission we need to store, back up, sync and display it so the App can work for you, and to do the things described in the Privacy Policy.',
      },
      { h3: 'Shared accounts' },
      {
        p: 'A Clawkit account may be used by more than one person — two owners in a household, or an owner and a carer. Everyone who can sign in to an account can currently see and change everything in it. There are no per-person permission levels.',
      },
      {
        p: [
          'You are responsible for deciding who you let into your account and for keeping your sign-in details safe. ',
          { b: 'If you share your password, you are sharing your pet’s full medical history.' },
        ],
      },
      { h3: 'What you share outward' },
      {
        p: 'When you export a report, send a video, or share a record with a veterinarian, a family member, or anyone else, it leaves Clawkit. What happens to it after that is governed by whoever received it and whatever service you used to send it, not by us.',
      },
    ],
  },
  {
    id: 'where-records-live',
    title: 'Where Your Records Live',
    blocks: [
      {
        p: 'Clawkit saves your records on your device first, so the App works with no signal. If you have an account, most records are also backed up and synced so they appear on your other devices.',
      },
      {
        callout: {
          tone: 'note',
          title: 'Seizure videos never leave your device',
          text: 'Seizure videos are the exception, and always will be. Videos stay on the device that recorded or imported them. They are never uploaded to our servers and never sync to your other devices. A video exists in exactly one place, so if you lose or wipe that device, the video is gone — export anything you cannot afford to lose.',
        },
      },
      {
        p: [
          { b: 'Without an account there is no backup of any kind.' },
          ' Losing the device loses the records on it. This is a consequence of the design, not a fault, and it is why the App offers an account.',
        ],
      },
      {
        p: 'We aim to keep the service available and your data intact, but we do not guarantee uninterrupted availability, and we are not a backup service. Keep your own copies of anything critical by exporting it.',
      },
    ],
  },
  {
    id: 'accounts-and-security',
    title: 'Accounts and Security',
    blocks: [
      {
        p: 'Where you create an account, you agree to give accurate information, to keep your credentials confidential, and to tell us promptly if you believe someone else has gained access. You are responsible for activity that happens under your account.',
      },
      {
        p: 'You may sign in by email and password with a one-time code, or through Apple or Google where available. We apply reasonable technical and organisational safeguards, but no method of transmission or storage is completely secure and we cannot guarantee absolute security.',
      },
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use',
    blocks: [
      { p: 'You agree not to:' },
      {
        ul: [
          'Use Clawkit for anything unlawful, or in a way that breaks these Terms',
          'Access, or try to access, an account or records that are not yours',
          'Interfere with, disrupt, overload, or probe the App or its infrastructure',
          'Reverse engineer, decompile, or attempt to extract source code, except where the law expressly allows it',
          'Copy, resell, sublicense, or commercially redistribute the App or its content',
          'Upload anything malicious, or anything you do not have the right to upload',
          'Present Clawkit’s output as a veterinary diagnosis, or use it to give veterinary advice to others',
        ],
      },
    ],
  },
  {
    id: 'changes-to-the-app',
    title: 'Changes to the App',
    blocks: [
      {
        p: 'Clawkit is under active development. We may add, change, or remove features, and we may introduce paid features or subscriptions in the future. If we introduce paid features, the terms that apply to them will be presented before you buy anything, and purchases made through the Apple App Store or Google Play are also subject to that store’s terms.',
      },
      { p: 'We will not remove your ability to export your existing records without telling you first.' },
    ],
  },
  {
    id: 'ending-your-use',
    title: 'Ending Your Use',
    blocks: [
      {
        p: 'You may stop using Clawkit at any time. You may delete individual records, remove an account’s data from a device, or request deletion of your account. Where an account is shared, only the designated account holder may delete the whole account.',
      },
      {
        p: 'We may suspend or end access to an account that breaks these Terms, that we reasonably believe is being used unlawfully, or where required by law. Where it is reasonable and lawful to do so, we will give notice and an opportunity to export records first.',
      },
      {
        p: 'Deleting an account does not delete anything you have already exported or saved elsewhere — including videos saved to your device’s Photos or Gallery.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Our Intellectual Property',
    blocks: [
      {
        p: 'The App itself — its software, design, text, logos, and branding — belongs to Ausasi LLC or its licensors, and is protected by intellectual property law. These Terms give you a personal, limited, non-exclusive, non-transferable, revocable licence to use Clawkit for your own pet record-keeping. They do not transfer any ownership to you.',
      },
      { p: 'This does not affect your ownership of the records you create.' },
    ],
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    blocks: [
      {
        p: 'To the fullest extent permitted by law, Clawkit is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement.',
      },
      {
        p: 'We do not warrant that the App will be uninterrupted, error-free, or secure; that reminders or notifications will be delivered on time or at all; or that any record, duration, calculation, pattern, or report is accurate or complete.',
      },
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    blocks: [
      {
        p: 'To the fullest extent permitted by law, Ausasi LLC and its officers, employees and suppliers will not be liable for any indirect, incidental, special, consequential, exemplary or punitive damages, or for any loss of data, records, videos, profits, or goodwill, arising out of or relating to your use of Clawkit — even if we have been advised that such damages are possible.',
      },
      {
        p: [
          'To the fullest extent permitted by law, our total liability for all claims relating to Clawkit is limited to ',
          { b: 'the greater of the amount you paid us for the App in the twelve months before the claim, or US$50' },
          '.',
        ],
      },
      {
        p: 'Some jurisdictions do not allow the exclusion of certain warranties or the limitation of certain damages. Where that is the case, the exclusions and limits above apply only as far as the law allows, and nothing in these Terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.',
      },
    ],
  },
  {
    id: 'indemnity',
    title: 'Indemnity',
    blocks: [
      {
        p: 'You agree to indemnify and hold harmless Ausasi LLC from claims, damages, liabilities and reasonable legal costs arising from your misuse of the App, your breach of these Terms, or your infringement of someone else’s rights. This does not apply to the extent a claim arises from our own wrongdoing.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    blocks: [
      {
        p: 'These Terms are governed by the laws of the State of Texas, United States, without regard to its conflict-of-law rules, and the state and federal courts located in Texas will have jurisdiction — except where the law of your country of residence gives you the right to bring proceedings locally, which these Terms do not take away.',
      },
    ],
  },
  {
    id: 'changes-to-these-terms',
    title: 'Changes to These Terms',
    blocks: [
      {
        p: 'We may update these Terms as Clawkit develops or as the law changes. When we make a significant change we will update the date at the top, and ask you to review and agree again inside the App before you continue using it. Continuing to use Clawkit after an update takes effect means you accept the updated Terms, to the extent the law allows.',
      },
      { p: 'You can read the current Terms and Privacy Policy at any time from Settings.' },
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    blocks: [{ p: 'Questions about these Terms:' }],
    contact: {
      company: 'Ausasi LLC',
      location: 'Tyler, Texas, United States',
      email: 'ausasi.socials@gmail.com',
    },
  },
];
