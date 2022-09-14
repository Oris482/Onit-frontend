import React, { useEffect, useRef } from 'react';
import './Text.css';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from 'ckeditor5-custom-build/build/ckeditor';
import { createReplacementModalAction } from '../../../redux/slice';
import { useUpdateTextWidgetData } from '../../../hooks/widget';

function TextEditor(props) {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));

  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const setEditorWidgetId = (id) => {
    dispatch(
      createReplacementModalAction({
        ...modal,
        targetWidgetId: id,
      })
    );
  };

  useEffect(() => {
    const editor = editorRef.current;
    // const newList = JSON.parse(JSON.stringify(widgets.list));
    // const found = newList.find((widget) => widget.i === props.widgetId);
    // let isPinned = false;
    // if (found?.static !== undefined) {
    //   isPinned = found.static;
    // }
    if (editor.editor) {
      if (props.isStatic === true) {
        editor.editor.disableReadOnlyMode(props.widgetId);
        editor.editor.focus();
      } else if (props.isStatic === false) {
        editor.editor.enableReadOnlyMode(props.widgetId);
      }
    }
  }, [props.isStatic]);

  // const handleClick = useCallback(() => {
  //   const editor = editorRef.current;
  //   // const newList = JSON.parse(JSON.stringify(widgets.list));
  //   // const targetId = modal.targetWidgetId;
  //   // const found = newList.find((widget) => widget.i === targetId);
  //   // let isPinned = false;
  //   // console.log(found);
  //   // if (found?.static !== undefined) {
  //   //   isPinned = found.static;
  //   // }
  //   console.log(props.isPinned);
  //   if (props.isPinned === true) {
  //     editor.editor.disableReadOnlyMode(props.widgetId);
  //   }
  // }, [props.isPinned]);

  // useEffect(() => {
  //   const editor = editorRef.current;
  //   editor.domContainer.current.addEventListener('click', handleClick);

  //   return () => {
  //     editor.domContainer.current.removeEventListener('click', handleClick);
  //   };
  // }, []);

  // const [thumbnail, setThumbnail] = useState('');

  const { updateTextData } = useUpdateTextWidgetData();

  // const handleSubmit = useCallback(() => {
  //   if (modal.targetWidgetId !== '-1') {
  //     updateTextData(thumbnail);
  //   }
  // }, [thumbnail]);

  const originText = widgets.list.find(
    (element) => element.i === props.widgetId
  ).widget_data.thumbnail;

  // useEffect(() => {
  //   console.log(originText);
  //   console.log(thumbnail);
  //   if (originText !== thumbnail) {
  //     handleSubmit();
  //   }
  // }, [thumbnail, handleSubmit]);
  return (
    <div className='TextEditor'>
      <div className='Textbox'>
        <div className='Editor'>
          <CKEditor
            ref={editorRef}
            style={{ margin: 0, padding: 0 }}
            editor={InlineEditor}
            data={originText}
            id={props.widgetId}
            config={{
              toolbar: {
                items: ['heading', '|', 'link', 'bold', 'italic', 'alignment'],
                isFloating: true,
                shouldNotGroupWhenFull: true,
              },
              placeholder: '설정 버튼으로 입력/이동 모드를 전환',
              heading: {
                options: [
                  {
                    model: 'paragraph',
                    title: '보통',
                    class: 'ck-heading_paragraph',
                  },
                  {
                    model: 'heading1',
                    view: 'h1',
                    title: '기본크기',
                    class: 'ck-heading_heading1',
                  },
                  {
                    model: 'heading3',
                    view: 'h5',
                    title: '제목',
                    class: 'ck-heading_heading2',
                  },
                ],
              },
              alignment: {
                options: ['left', 'center', 'right'],
              },
              link: {
                defaultProtocol: 'https://',
                decorators: {
                  isExternal: {
                    mode: 'automatic',
                    callback: (url) => url.startsWith('https://'),
                    attributes: {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                  },
                  isDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                      download: 'file.png',
                    },
                  },
                },
              },
            }}
            onFocus={(event, editor) => {
              if (props.widgetId !== undefined && props.widgetId !== -1) {
                setEditorWidgetId(props.widgetId);
              }
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // setThumbnail(data);
              updateTextData(data);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
