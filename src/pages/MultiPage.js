import React from 'react';
import { NormalWrapper, PageWrapper } from '../components';
import MultiHeader from '../components/PublishingPage/MultiPage/MultiHeader';
import { useGetPageUrl } from '../hooks/useParamsUrl';
import SinglePage from './SinglePage';

function MultiPage() {
  const pagesData = {
    title: '사용자 정의 제목',
    url: 'heom',
    thumbnail: 'www.url',
    user_seq: 12345,
    singlePages: [
      { order: 1, singlePageUrl: 'image' },
      { order: 2, singlePageUrl: 'video' },
      { order: 3, singlePageUrl: 'info' },
      { order: 4, singlePageUrl: '하이' },
      { order: 5, singlePageUrl: '바밤바' },
    ],
    isPresentation: {},
  };

  const pageNow = useGetPageUrl() ?? pagesData?.singlePages[0].singlePageUrl;
  console.log(pageNow);
  return (
    <PageWrapper>
      <NormalWrapper>
        <MultiHeader pagesData={pagesData} />
        <SinglePage theme='MultiPage' pageNow={pageNow} />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default MultiPage;
