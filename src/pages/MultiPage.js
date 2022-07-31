import React from 'react';
import { NormalWrapper, PageWrapper } from '../components';
import MultiHeader from '../components/PublishingPage/MultiPage/MultiHeader';
import SinglePage from './SinglePage';

function MultiPage({ multiData, pageUrl }) {
  return (
    <PageWrapper>
      <NormalWrapper>
        <MultiHeader multiData={multiData} pageUrl={pageUrl} />
        <SinglePage />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default MultiPage;
