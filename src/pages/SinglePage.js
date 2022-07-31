import React, { useEffect, useState } from 'react';
import { NormalWrapper, NormalModeGrid, PageWrapper } from '../components';
import Mobile, {
  isMobile,
} from '../components/PublishingPage/SinglePage/Mobile';

function SinglePage({ theme, pageNow, widgetList }) {
  const [width, setWidth] = useState(window.innerWidth);

  // resize 이벤트 받아서 width 변경
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  // 인스타 그램용 사이즈 조절
  useEffect(() => {
    if (window.screen.width < window.innerWidth) {
      setWidth(window.screen.width);
    }
  }, []);

  return (
    <PageWrapper>
      {isMobile(width) ? (
        <Mobile widgetList={widgetList} />
      ) : (
        <NormalWrapper>
          <NormalModeGrid />
        </NormalWrapper>
      )}
    </PageWrapper>
  );
}

SinglePage.defaultProps = {
  theme: 'normalPage',
};

export default SinglePage;
