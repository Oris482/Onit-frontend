/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PAGE_MARGIN, PAGE_WIDTH } from '../../styles/style';
import PageList from './PageList';

function Bzone({
  singlePagesState,
  multiPagesState,
  userMatched,
  userUrl,
  setAddSinglePagePopUp,
  addSinglePagepopUp,
  setBindingPopUp,
  bindingPopUp,
}) {
  return (
    <div css={MyPageBZoneWrapper}>
      <div css={MyPageBZone}>
        <PageList
          title='Book'
          pageType='muliti'
          pagesInfo={multiPagesState}
          userMatched={userMatched}
          userUrl={userUrl}
          setAddSinglePagePopUp={setAddSinglePagePopUp}
          addSinglePagepopUp={addSinglePagepopUp}
          setBindingPopUp={setBindingPopUp}
          bindingPopUp={bindingPopUp}
        />
        <PageList
          title='Paper'
          pageType='single'
          pagesInfo={singlePagesState}
          userMatched={userMatched}
          userUrl={userUrl}
          setAddSinglePagePopUp={setAddSinglePagePopUp}
          addSinglePagepopUp={addSinglePagepopUp}
          setBindingPopUp={setBindingPopUp}
          bindingPopUp={bindingPopUp}
        />
        <div css={[overFlowHidden]} />
      </div>
    </div>
  );
}

const MyPageBZoneWrapper = css`
  min-width: ${PAGE_WIDTH};
  width: 80vw;
  margin: ${PAGE_MARGIN};
  margin-top: 20px;
  background-color: white;
`;

const MyPageBZone = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const overFlowHidden = css`
  overflow: hidden;
`;

export default Bzone;
