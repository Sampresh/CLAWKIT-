// Hero frame sequence. To use your own animation (e.g. an app walkthrough video):
//   1. Export the video to JPGs: ffmpeg -i hero.mp4 -vf "fps=30,scale=1600:-1" -q:v 4 public/frames/frame_%04d.jpg
//   2. Set USE_LOCAL_FRAMES = true and LOCAL_FRAME_COUNT to the number of files written.
const USE_LOCAL_FRAMES = false;
const LOCAL_FRAME_COUNT = 0;

const STOCK = [
  '1517849845537-4d257902454a', // pug
  '1561037404-61cd46aa615b', // jack russell
  '1583511655857-d19b40a7a54e', // french bulldog
  '1537151625747-768eb6cf92b2', // corgi puppy
  '1552053831-71594a27632d', // golden retriever
  '1587300003388-59208cc962cb', // aussie
  '1543466835-00a7907e9de1', // beagle
  '1548199973-03cce0bbc87b', // two dogs running
];

export const heroFrames = USE_LOCAL_FRAMES
  ? {
      count: LOCAL_FRAME_COUNT,
      path: (i) => `/frames/frame_${String(i).padStart(4, '0')}.jpg`,
      eager: 140,
      scrollHeight: '600vh',
    }
  : {
      count: STOCK.length,
      path: (i) => `https://images.unsplash.com/photo-${STOCK[i - 1]}?auto=format&fit=crop&w=1800&q=75`,
      eager: STOCK.length,
      scrollHeight: '420vh',
    };
