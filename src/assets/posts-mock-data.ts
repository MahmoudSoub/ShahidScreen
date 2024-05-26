import {ImageSourcePropType} from 'react-native';

export interface PostType {
  id: number;
  backgroundSource: ImageSourcePropType;
  videoSource: string;
  title: string;
  logoSource: ImageSourcePropType;
  description: string;
  episode: string;
}

export const posts: PostType[] = [
  {
    id: 1,
    backgroundSource: require('../assets/breakingbad.jpeg'),
    videoSource:
      'https://videos.pexels.com/video-files/5512609/5512609-hd_1080_1920_25fps.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      'Walt goes on the run. Jesse is taken hostage. Marie forces Skyler to tell Walter, Jr. the truth.Walt goes on the run. Jesse is taken hostage. Marie forces Skyler to tell Walter, Jr. the truth.Walt goes on the run. Jesse is taken hostage. Marie forces Skyler to tell Walter, Jr. the truth.Walt goes on the run. Jesse is taken hostage. Marie forces Skyler to tell Walter, Jr. the truth.Walt goes on the run. Jesse is taken hostage. Marie forces Skyler to tell Walter, Jr. the truth.Walt goes on the run. Jesse is taken hostage. Marie forces Skyler to tell Walter, Jr. the truth.Walt goes on the run. Jesse is taken hostage. Marie forces Skyler to tell Walter, Jr. the truth.',
    episode: 'S5.E14 ∙ Ozymandias',
  },
  {
    id: 2,
    backgroundSource: require('../assets/breakingbad2.jpeg'),
    videoSource:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      "Walter White returns to Albuquerque one last time to secure his family's future and settle old scores.",
    episode: 'S5.E16 ∙ Felina',
  },
  {
    id: 3,
    backgroundSource: require('../assets/breakingbad3.jpeg'),
    videoSource:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      'Jesse is brought to the FBI for questioning on his knowledge of ricin. In a last effort to kill Gus, Walt must ask for help from an old enemy.',
    episode: 'S4.E13 ∙ Face Off',
  },
  {
    id: 4,
    backgroundSource: require('../assets/breakingbad4.jpeg'),
    videoSource:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      "Jesse and Hank come up with an idea to take Walt down. Walt hires Todd's uncle to kill Jesse.",
    episode: "S5.E13 ∙ To'hajiilee",
  },
  {
    id: 5,
    backgroundSource: require('../assets/breakingbad5.jpeg'),
    videoSource:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      'Walt struggles as he adapts to aspects of his new identity. Jesse plans an escape against Jack and his crew.',
    episode: 'S5.E15 ∙ Granite State',
  },
];
