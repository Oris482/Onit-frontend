/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFloating, shift, offset } from '@floating-ui/react-dom';
import { flip } from '@floating-ui/core';
import GridLayout from './GridLayout';
import MouseGridLayout from './MouseGridLayout';
import { createReplacementWidgetsAction } from '../../redux/slice';
import { WidgetElement } from '../Widgets/WidgetElement';
import {
  GRID_COLS,
  GRID_MARGIN,
  newWidgetHeight,
  newWidgetWidth,
  WIDGET_COMMON_RADIUS,
} from '../../styles/style';
import {
  ACTION_NONE,
  ACTION_EDIT,
  TYPE_MOUSE,
  TYPE_NONEDISPLAY,
  TYPE_NEW,
} from '../../utils/constantValue';
import useWindowSize from './useWindowSize';
import ToolBar from '../ToolBar/ToolBar';
import { useAddEmptyWidget } from '../../hooks/widget';

const mouseOverWidgetDefaultValue = {
  i: '0',
  w: newWidgetWidth,
  h: newWidgetHeight,
  x: 0,
  y: 0,
  widget_type: TYPE_NONEDISPLAY,
  isResizable: false,
};

function EditModeGrid() {
  const { addEmptyWidget } = useAddEmptyWidget();
  const windowWidth = useWindowSize().width;
  // min-width 지정;
  const minWindowWidth = useMemo(() => {
    if (windowWidth > 1124) {
      return windowWidth;
    } else {
      return 1124;
    }
  }, [windowWidth]);
  // mouseOver위젯(빈 공간 클릭 시 나오는 위젯)과 보통의 위젯이 겹치는 지 판단해주는 state
  const [isWidgetOverlap, setIsWidgetOverlap] = useState(false);
  const [mouseOverWidget, setMouseOverWidget] = useState([
    mouseOverWidgetDefaultValue,
  ]);
  // toolBar 선택위한 위젯
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [gridHeight, setGridHeight] = useState(1);
  const {
    x,
    y,
    floating,
    reference,
    strategy,
    update: updateFloatingUi,
  } = useFloating({
    placement: 'top-start',
    middleware: [shift(), flip(), offset(25)],
  });

  const dispatch = useDispatch();
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));

  // Y축 스크롤에 따라서 height 늘려주기
  useEffect(() => {
    window.addEventListener('scroll', () => handleScrollWidth());
    return () => {
      window.removeEventListener('scroll', () => handleScrollWidth()); // clean up
    };
  }, []);

  const handleScrollWidth = () => {
    if (window.scrollY > 100 && window.scrollY < 10000) {
      setGridHeight(window.scrollY);
    }
  };

  // delete처리 된 위젯 필터링
  const layoutInfo = useMemo(() => {
    // console.log('update layoutInfo');
    const newList = widgets.list.filter(function (element) {
      return element.widget_action !== 'D';
    });
    return newList;
  }, [widgets]);

  // 빈 그리드 클릭 시 빈 위젯 생성
  const makeNewWidgetEvent = () => {
    if (selectedWidget) {
      setSelectedWidget(null);
    }
    if (isWidgetOverlap === false) {
      addEmptyWidget(mouseOverWidget);
    }
  };

  // 그리드 수정 시 변경된 정보를 dispatch로 전송해줌.
  const renewWidgetsList = useCallback(
    (target) => {
      const items = JSON.parse(JSON.stringify(widgets.list));
      const found = items.find((element) => element.i === target.i);
      found.x = target.x;
      found.y = target.y;
      found.w = target.w;
      found.h = target.h;
      if (found.widget_action === ACTION_NONE || found._id !== '') {
        found.widget_action = ACTION_EDIT;
      }
      dispatch(
        createReplacementWidgetsAction({
          ...widgets,
          list: items,
        })
      );
    },
    [widgets]
  );

  // about grid style
  const gridStyle = useMemo(
    () => ({
      position: 'relative',
      top: '-5px',
      minWidth: '1124px',
      minHeight: `calc(150vh + ${gridHeight}px)`,
      width: '100%',
    }),
    [gridHeight]
  );
  const mouseOverGridStyle = useMemo(
    () => ({
      position: 'absolute',
      top: '-5px',
      left: '0px',
      width: '100%',
      minWidth: '1124px',
      minHeight: `100%`,
      zIndex: '-100',
      backgroundSize: `calc((${minWindowWidth}px - ${GRID_MARGIN[0]}px) / ${GRID_COLS}) calc((${minWindowWidth}px - ${GRID_MARGIN[0]}px) / ${GRID_COLS})`,
      backgroundPosition: `${GRID_MARGIN[0] / 2 - 1}px ${
        GRID_MARGIN[0] / 2 - 1
      }px`,
      backgroundImage: `linear-gradient(to right, #eee 2px, transparent 2px),
  linear-gradient(to bottom, #eee 2px, transparent 2px)`,
    }),
    [minWindowWidth, GRID_MARGIN, GRID_COLS]
  );
  // grid공식 가로 calc((100% - ${margin}px) / ${cols}) calc((100% - ${margin}px - X좌표 스크롤바픽셀) / ${cols})

  // 마우스오버 위젯 그리드(기존 그리드와 레이어 되어 있음)
  const mouseOverWidgetGridForm = useMemo(() => {
    return (
      <MouseGridLayout style={mouseOverGridStyle} mylayout={mouseOverWidget}>
        {mouseOverWidget[0].widget_type === TYPE_MOUSE && (
          <div key='0'>
            <WidgetElement element={mouseOverWidget[0]} mode='normal' />
          </div>
        )}
      </MouseGridLayout>
    );
  }, [mouseOverWidget, mouseOverGridStyle]);

  // 마우스 위치를 계산하기 위한 함수
  const mouseWidgetPosition = (e) => {
    if (isWidgetOverlap === false && e.clientX > 5) {
      const newData = {
        w: newWidgetWidth,
        h: newWidgetHeight,
        i: '0',
        widget_type: TYPE_MOUSE,
        x: Math.floor(((e.pageX - 5) * 16) / (minWindowWidth - 10)),
        y: Math.floor((e.pageY * 16) / (minWindowWidth - 10)),
      };
      setMouseOverWidget([
        {
          ...newData,
          isResizable: false,
        },
      ]);
    } else {
      setMouseOverWidget([mouseOverWidgetDefaultValue]);
    }
    updateFloatingUi();
  };
  const setOverlapTrue = useCallback(() => {
    setIsWidgetOverlap(true);
  }, [setIsWidgetOverlap]);

  const setOverlapFalse = useCallback(() => {
    setIsWidgetOverlap(false);
  }, [setIsWidgetOverlap]);

  const onListChanged = useCallback(
    (layout, oldItem, newItem) => {
      renewWidgetsList(newItem);
    },
    [renewWidgetsList]
  );

  const initMouseOverWidget = useCallback(() => {
    setMouseOverWidget([mouseOverWidgetDefaultValue]);
  }, [setMouseOverWidget]);

  const gridLayoutItems = useMemo(() => {
    return layoutInfo.map((element) => {
      return (
        <div
          key={element.i}
          css={gridLayoutItemStyle}
          onMouseEnter={setOverlapTrue}
          onMouseLeave={setOverlapFalse}
          onMouseOver={updateFloatingUi}
          onFocus={updateFloatingUi}
        >
          <div
            css={widgetWrapperStyle}
            ref={(ref) => {
              if (ref && element.i === selectedWidget) {
                reference(ref);
                updateFloatingUi();
              }
            }}
          >
            <WidgetElement
              element={element}
              mode='edit'
              setSelectedWidget={setSelectedWidget}
              setIsWidgetOverlap={setIsWidgetOverlap}
            />
          </div>
          <div css={mouseOverWidgetGuardStyle} />
        </div>
      );
    });
  }, [layoutInfo, selectedWidget, setSelectedWidget]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        onMouseMove={mouseWidgetPosition}
        onMouseLeave={initMouseOverWidget}
        onClick={makeNewWidgetEvent}
        css={removeBtnStyle}
      >
        <GridLayout
          style={gridStyle}
          onResizeStart={setOverlapTrue}
          onResizeStop={onListChanged}
          onResize={setOverlapTrue}
          onDragStart={setOverlapTrue}
          onDrag={setOverlapTrue}
          onDragStop={onListChanged}
          mylayout={layoutInfo}
        >
          {gridLayoutItems}
        </GridLayout>
        {selectedWidget && (
          <div
            ref={floating}
            onMouseEnter={setOverlapTrue}
            onMouseLeave={setOverlapFalse}
            style={{
              position: strategy,
              top: y ?? '',
              left: x ?? '',
              zIndex: 10000,
            }}
          >
            <ToolBar />
          </div>
        )}
        {mouseOverWidgetGridForm}
      </div>
    </>
  );
}

export default EditModeGrid;

const widgetWrapperStyle = css`
  height: 100%;
`;

const gridLayoutItemStyle = css`
  background-color: lightgray;
  border-radius: ${WIDGET_COMMON_RADIUS};
  width: calc(100% + 20px);
`;

const mouseOverWidgetGuardStyle = css`
  position: absolute;
  top: -6px;
  left: -6px;
  margin: 0;
  padding: 0;
  border: 0;
  width: calc(100% + 13px);
  height: calc(100% + 13px);
  z-index: -999;
`;

const removeBtnStyle = css`
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
`;
