import { ACTION_CREATE, ACTION_NONE, TYPE_NEW } from './constantValue';

function changeKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
  return obj;
}

function deleteKey(obj, targetKey) {
  delete obj[targetKey];
  return obj;
}

export function convertForServer(infos) {
  const widgetsInfo = JSON.parse(JSON.stringify(infos));
  const converted = widgetsInfo.filter(function (element) {
    return element.widget_type !== TYPE_NEW;
  });
  converted.map(function (info) {
    changeKey(info, 'x', 'pos_x');
    changeKey(info, 'y', 'pos_y');
    changeKey(info, 'w', 'width');
    changeKey(info, 'h', 'height');
    deleteKey(info, 'i');
    if (info.widget_action === ACTION_CREATE) {
      info.widget_code = '';
    }
    if (info.widget_action === ACTION_NONE) {
      deleteKey(info, 'widget_action');
    }
    return info;
  });
  return converted;
}

function createIdKey(obj, index) {
  obj.i = index.toString();
  return obj;
}

export function convertForRedux(infos) {
  if (!infos) return [];
  const widgets = JSON.parse(JSON.stringify(infos));
  const converted = widgets.filter(function (element) {
    return element.widget_type !== TYPE_NEW;
  });
  converted.map(function (info, index) {
    changeKey(info, 'pos_x', 'x');
    changeKey(info, 'pos_y', 'y');
    changeKey(info, 'width', 'w');
    changeKey(info, 'height', 'h');
    createIdKey(info, index);
    info.widget_action = ACTION_NONE;
    return info;
  });
  return converted;
}
