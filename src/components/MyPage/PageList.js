/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import AddPageBlock from './AddPageBlock';
import PageBlock from './PageBlock';

function PageList({
  title,
  pageType,
  state,
  userMatched,
  userUrl,
  setAddSinglePagePopUp,
  addSinglePagepopUp,
  setBindingPopUp,
  bindingPopUp,
}) {
  const [userPageBlock, setUserPageBlock] = useState('<></>');

  const setPopUp =
    pageType === 'single' ? setAddSinglePagePopUp : setBindingPopUp;
  const popUp = pageType === 'single' ? addSinglePagepopUp : bindingPopUp;
  useEffect(() => {
    if (state && state.data.length !== 0) {
      const usersb = state.data;
      const userData = usersb.map((page, index) => {
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
      setUserPageBlock(userData);
    } else setUserPageBlock(null);
  }, [state]);

  return (
    <div>
      <div>
        <p css={[titleFont]}>{title}</p>
      </div>
      <div css={[flexWrap]}>
        {userPageBlock && (
          <PageBlock userMatched={userMatched} userUrl={userUrl} />
        )}
        <AddPageBlock
          userMatched={userMatched}
          setPopUp={setPopUp}
          popUp={popUp}
        />
      </div>
    </div>
  );
}

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

export default PageList;
