/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMyInfo } from '../../../hooks/myInfo';

function MultiHeader({ multiData, pageUrl }) {
  const [selected, setSelected] = useState('');
  const { myInfo } = useMyInfo();

  const { singlePages: pages, title, url } = multiData;

  useEffect(() => {
    setSelected(pageUrl);
  }, [pageUrl]);

  console.log(pageUrl);
  const navLists = useMemo(() => {
    if (multiData && pages && myInfo) {
      const navList = pages.map((page, i) => {
        const key = i + 1;
        return (
          <li key={key} css={[pureList, navListStyles]}>
            <Link
              css={[pureButton, selected === page.singlePageUrl && underline]}
              to={`/${myInfo.url}/${url}/${page.singlePageUrl}`}
            >
              {page.singlePageUrl}
            </Link>
          </li>
        );
      });
      return navList;
    }
    return <></>;
  }, [multiData, myInfo, pageUrl]);

  return (
    <header>
      <div css={displayCenter}>
        <h1 css={titleStyles}>{title}</h1>
      </div>
      <div css={displayCenter}>
        <ul css={navGap}>{navLists}</ul>
      </div>
    </header>
  );
}

export default MultiHeader;

const displayCenter = css`
  display: flex;
  justify-content: center;
`;

const titleStyles = css`
  height: 33px;
  margin: 44.22px 77.88px 35.64px;
  object-fit: contain;
  font-family: SUIT;
  font-size: 26.4px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: var(--black);
`;

const pureList = css`
  list-style: none;
  float: left;
  margin: 10px;
`;

const navListStyles = css`
  height: 16.5px;
  margin: 0 0 5.94px;
  object-fit: contain;
  font-family: SUIT;
  font-size: 13.2px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
`;

const pureButton = css`
  padding: 0;
  border: 0;
  outline: 0;
  padding-bottom: 2.54px;
  &:hover {
    border-bottom: solid 1.5px #fc3d1d;
    color: #fc3d1d;
  }
`;

const navGap = css`
  display: flex;
  gap: 26.4px;
  margin-bottom: 31.68px;
`;

const underline = css`
  border-bottom: solid 1.5px;
  color: #fc3d1d;
`;
