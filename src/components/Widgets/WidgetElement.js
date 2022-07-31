/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSet, settingSet } from '../../asset';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../redux/slice';
import {
  ACTION_CREATE,
  ACTION_DELETE,
  TYPE_IMAGE,
  TYPE_MOUSE,
  TYPE_VIDEO,
  TYPE_NONEDISPLAY,
  TYPE_NEW,
  TYPE_TEXT,
  ACTION_EDIT,
} from '../../utils/constantValue';
import ImageBox from './Image/ImageBox';
import VideoBox from './Video/VideoBox';
import MouseOverBox from './MouseOver/MouseOverBox';
import NewBox from './New/NewBox';
import { WIDGET_COMMON_RADIUS } from '../../styles/style';
import { convertType2String, isNewWidget } from '../../utils/util';
import { commonBtn, getAbsoluteBtn } from '../../styles/GlobalStyles';
import TextBox from './Text/TextBox';
import { useReverseStaticWidget } from '../../hooks/widget';

export function WidgetElement({
  element,
  mode,
  setIsWidgetOverlap,
  setSelectedWidget,
}) {
  const [hover, setHover] = useState(false);
  const layout = element;
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const dispatch = useDispatch();
  // dispatch
  const openEditWindow = (id) => {
    dispatch(
      createReplacementModalAction({
        ...modal,
        imgInputWindow: true,
        targetWidgetId: id,
      })
    );
  };

  const updateWidgets = (newWidgetList) => {
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        list: newWidgetList,
      })
    );
  };

  const { reverseStatic } = useReverseStaticWidget();

  const openEditModalByType = (id, type) => {
    const stringType = convertType2String(type);
    if (type !== TYPE_TEXT) {
      dispatch(
        createReplacementModalAction({
          ...modal,
          targetWidgetId: id,
          popUpWindow: true,
          popUpWindowType: stringType,
        })
      );
    }
    // else if (type === TYPE_TEXT) {
    // const changed = JSON.parse(JSON.stringify(widgets.list));
    // const targetItem = changed.find((widget) => widget.i === id);
    // 임시로 getNewWidgetList 에서 처리. Redux 비동기 처리 적용하면 별도 훅으로 분리
    // reverseStatic(id, !targetItem.static);
    // }
  };

  function getNewWidgetList(targetItemIndex, newAction) {
    const newList = JSON.parse(JSON.stringify(widgets.list));
    const found = newList.find((widget) => widget.i === targetItemIndex);
    if (found.widget_action === ACTION_CREATE && newAction === ACTION_DELETE) {
      found.widget_action = newAction;
    } else if (found.widget_action !== ACTION_CREATE) {
      found.widget_action = newAction;
    }
    // Text 위젯 이동 고정처리 임시 방편
    if (found.widget_type === TYPE_TEXT && newAction === ACTION_EDIT) {
      found.static = !found.static;
    }
    return newList;
  }

  function classifyBox(curInfo) {
    if (curInfo.widget_type === TYPE_NEW) {
      return <NewBox element={element} />;
    } else if (curInfo.widget_type === TYPE_IMAGE) {
      return <ImageBox element={element} mode={mode} />;
    } else if (curInfo.widget_type === TYPE_VIDEO) {
      return <VideoBox element={element} mode={mode} />;
    } else if (curInfo.widget_type === TYPE_TEXT) {
      return <TextBox element={element} mode={mode} />;
    } else if (curInfo.widget_type === TYPE_MOUSE) {
      return <MouseOverBox element={element} />;
    } else if (curInfo.widget_type === TYPE_NONEDISPLAY) {
      return <></>;
    } else {
      return (
        <div
          key={curInfo.i}
          style={{ backgroundColor: 'lightgray', borderRadius: '10px' }}
        >
          <center className='text'>
            {curInfo.x}, {curInfo.y}
          </center>
        </div>
      );
    }
  }

  // const newList = JSON.parse(JSON.stringify(widgets.list));
  // const targetId = modal.targetWidgetId;
  // const found = newList.find((widget) => widget.i === targetId);
  // let isPinned = false;
  // if (found?.static !== undefined) {
  //   isPinned = found.static === true;
  // }

  const diameter = 44;
  const { btn, img } = getAbsoluteBtn(5, 33, diameter / 2);
  const { btn: settingBtn, img: settingBtnImg } = getAbsoluteBtn(
    5,
    5,
    diameter / 2,
    false
    // isPinned
  );

  return (
    <div
      key={layout.i}
      css={[widgetFrame]}
      onMouseEnter={() => {
        setHover(true);
      }}
      onKeyDown={() => {
        setHover(false);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {mode === 'edit' && hover && (
        <>
          {/* 이미 있는 위젯 위에 마우스 호버 시 투명한 회색 레이어 */}
          {/* <div css={[positionAbsolute, hoverBackground]} /> */}
          <button
            type='button'
            css={[commonBtn, btn]}
            onClick={() => {
              updateWidgets(getNewWidgetList(layout.i, 'D'));
              setIsWidgetOverlap(false);
            }}
          >
            <div css={img}>
              <img alt='img' height={diameter} src={closeSet} />
            </div>
          </button>
          <button
            type='button'
            css={[commonBtn, settingBtn]}
            onClick={() => {
              if (isNewWidget(layout.widget_type)) {
                openEditWindow(layout.i);
                setSelectedWidget(layout.i);
              } else {
                openEditModalByType(layout.i, layout.widget_type);
              }
              updateWidgets(getNewWidgetList(layout.i, 'E'));
            }}
          >
            <div css={settingBtnImg}>
              <img alt='img' height={diameter} src={settingSet} />
            </div>
          </button>
        </>
      )}
      {classifyBox(layout)}
    </div>
  );
}

const widgetFrame = css`
  background-color: white;
  width: 100%;
  height: 100%;
  border-diameter: ${WIDGET_COMMON_RADIUS};
`;

/*
const positionAbsolute = css`
  position: absolute;
`;

const hoverBackground = css`
  width: 100%;
  height: 100%;
  border-radius: ${WIDGET_COMMON_RADIUS};
  opacity: 0.2;
  background-color: #000;
`;
*/
