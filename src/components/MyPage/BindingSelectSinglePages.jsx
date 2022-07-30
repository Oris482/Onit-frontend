/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useSelector } from 'react-redux';
import BindingSinglePageBlock from './BindingSinglePageBlock';

const BindingSelectSinglePages = ({ selectedPages, setSelectedPages }) => {
  const { singlePages } = useSelector((state) => ({
    singlePages: state.info.singlePages,
  }));
  const singlePagesInfo = singlePages.data;

  function handleSelect(selectedPageUrl) {
    let newSinglePageList;
    if (
      selectedPages.filter(
        (element) => element.singlePageUrl === selectedPageUrl
      ).length === 0
    ) {
      newSinglePageList = [
        ...selectedPages,
        { singlePageUrl: selectedPageUrl },
      ];
    } else {
      newSinglePageList = selectedPages.filter(
        (element) => element.singlePageUrl !== selectedPageUrl
      );
    }
    setSelectedPages(newSinglePageList);
  }

  return singlePages.data.length !== 0 ? (
    <div css={siteViewBZone}>
      {singlePagesInfo.map((page, index) => {
        const semiIndex = index + 1;
        return (
          <div key={semiIndex}>
            <BindingSinglePageBlock
              data={page}
              handleSelect={handleSelect}
              selectedPages={selectedPages}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <div css={[noneSinglePageMsg]}>싱글 페이지가 없습니다!</div>
  );
};

export default BindingSelectSinglePages;

const siteViewBZone = css`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 680px;
  max-height: 284px;
  min-height: 150px;
  height: 29vh;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px 10px 10px 20px;
  border-radius: 20px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const noneSinglePageMsg = css`
  display: block;
  margin-top: 10px;
`;
