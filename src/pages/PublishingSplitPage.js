import { useCallback } from 'react';
import MultiPage from './MultiPage';
import SinglePage from './SinglePage';

function PublishingSplitPage() {
  // 싱글 멀티 구분
  // const { res, request } = useRequestAuth({
  //   endpoint: endpoint,
  //   method: 'patch',
  //   data: {
  //     nickname: nicknametest,
  //   },
  // });
  const res = 'single';

  const container = useCallback(() => {
    if (res === 'single') {
      // 싱글 -> 페이지 정보 받아서 띄워주기
      return <SinglePage />;
    } else if (res === 'multi') {
      return <MultiPage />;
    }
    return;
  }, [res]);

  return <>{container}</>;
}

export default PublishingSplitPage;
