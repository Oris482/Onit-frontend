import TextEditor from './Text';

function TextBox({ element, mode }) {
  const Viewer = ({ content }) => {
    return (
      <div
        className='ck-content'
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };
  return mode === 'normal' ? (
    <Viewer content={element.widget_data.thumbnail} />
  ) : (
    <TextEditor widgetId={element.i} isStatic={element.static} />
  );
}

export default TextBox;
