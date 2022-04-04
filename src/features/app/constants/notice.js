/* eslint-disable import/prefer-default-export */
/* Icons */

export const noticeTypeConfig = [
  { value: 'all', label: '전체' },
  { value: 'notice', label: '알림' },
  { value: 'bug', label: '버그' },
  { value: 'fix', label: '수정' },
];

/* eslint-disable import/prefer-default-export */
export const addNoticeConfig = [
  {
    key: 'titleKey',
    title: '제목',
    name: 'title',
    radioConfig: [],
  },
  {
    key: 'notionKey',
    title: '노션 ID',
    name: 'link',
    radioConfig: [],
  },
  {
    key: 'typeKey',
    title: '타입',
    name: 'type',
    radioConfig: [
      { value: 'notice', label: '알림' },
      { value: 'bug', label: '버그' },
      { value: 'fix', label: '수정' },
    ],
  },
];
