/* eslint-disable import/prefer-default-export */
export const currentWorkFormConfig = [
  {
    key: 'typeKey',
    title: '유형',
    name: 'type',
    radioConfig: [
      { key: 'discriminationKey', value: 'discrimination', label: '차별' },
      { key: 'hateKey', value: 'hate', label: '혐오' },
      { key: 'sexualKey', value: 'sexual', label: '선정' },
      { key: 'blameKey', value: 'blame', label: '비난' },
      { key: 'swearKey', value: 'swear', label: '욕설' },
      { key: 'crimeKey', value: 'crime', label: '범죄' },
    ],
  },
  {
    key: 'scoreKey',
    title: '강도',
    name: 'score',
    radioConfig: [
      { key: 'one', value: 1, label: 1 },
      { key: 'two', value: 2, label: 2 },
      { key: 'three', value: 3, label: 3 },
    ],
  },
  {
    key: 'targetKey',
    title: '대상',
    name: 'target',
    radioConfig: [
      { key: 'personKey', value: 'person', label: '개인' },
      { key: 'cultureKey', value: 'culture', label: '문화' },
      { key: 'communityKey', value: 'community', label: '공동체' },
      { key: 'natureKey', value: 'nature', label: '자연' },
    ],
  },
];
