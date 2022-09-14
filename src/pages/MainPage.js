import { Header, NormalWrapper, PageWrapper } from '../components';
import MainContents from '../components/Main/MainContents';

function MainPage() {
  return (
    <PageWrapper>
      <NormalWrapper>
        <Header pageType='main' />
        <MainContents />
      </NormalWrapper>
    </PageWrapper>
  );
}

export default MainPage;
