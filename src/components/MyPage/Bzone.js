/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PAGE_MARGIN, PAGE_WIDTH } from '../../styles/style';
import PageBlock from './PageBlock';

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
  function pageList(title, pageType, state) {
    let userPageBlock = <></>;
    const setPopUp =
      pageType === 'single' ? setAddSinglePagePopUp : setBindingPopUp;
    const popUp = pageType === 'single' ? addSinglePagepopUp : bindingPopUp;
    if (state && state.data.length !== 0) {
      const usersb = state.data;
      userPageBlock = usersb.map((page, index) => {
        const semiIndex = index + 1;

        return (
          <div key={semiIndex}>
            <PageBlock
              userMatched={userMatched}
              userUrl={userUrl}
              data={page}
              setPopUp={setPopUp}
              popUp={popUp}
              pageType={pageType}
            />
          </div>
        );
      });
    }
    const noDataComponent = !userMatched ? (
      <div css={noPageMsg}>현재 만들어진 페이지가 없어요!</div>
    ) : (
      <></>
    );

    return (
      <div>
        <div>
          <p css={[titleFont]}>{title}</p>
        </div>
        <div css={[flexWrap]}>
          {userPageBlock}
          {noDataComponent}
          <PageBlock
            userMatched={userMatched}
            userUrl={userUrl}
            setPopUp={setPopUp}
            popUp={popUp}
          />
        </div>
      </div>
    );
  }

  return (
    <div css={MyPageBZoneWrapper}>
      <div css={MyPageBZone}>
        {pageList('Book', 'muliti', multiPagesState)}
        {pageList('Paper', 'single', singlePagesState)}
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

const titleFont = css`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #5d5d5d;
`;

const flexWrap = css`
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
  padding: 20px 0;
`;

const overFlowHidden = css`
  overflow: hidden;
`;

const noPageMsg = css`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 25px;
`;

export default Bzone;
