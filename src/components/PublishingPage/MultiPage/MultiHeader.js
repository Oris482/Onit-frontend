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
          <li key={key} css={[pureList]}>
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
        <h1>{title}</h1>
      </div>
      <div css={displayCenter}>
        <ul>{navLists}</ul>
      </div>
    </header>
  );
}

export default MultiHeader;

const displayCenter = css`
  display: flex;
  justify-content: center;
`;

const pureList = css`
  list-style: none;
  float: left;
  margin: 10px;
`;

const pureButton = css`
  padding: 0;
  border: 0;
  outline: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const underline = css`
  text-decoration: underline;
`;
