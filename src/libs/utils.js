export function getSelector(pathOrTarget) {
  let path;
  if (Array.isArray(pathOrTarget)) {
    path = pathOrTarget
      .reverse()
      .filter((ele) => {
        return ele !== document && ele !== window;
      })
      .map((ele) => {
        if (ele.id) {
          return `${ele.nodeName.toLowerCase()}#${ele.id}`;
        }
        if (ele.className) {
          return `${ele.nodeName.toLowerCase()}#${ele.className}`;
        }
        return ele.nodeName.toLowerCase();
      })
      .join(' ');
  } else {
    if (pathOrTarget.id) {
      path = `${pathOrTarget.nodeName.toLowerCase()}#${pathOrTarget.id}`;
    } else if (pathOrTarget.className) {
      path = `${pathOrTarget.nodeName.toLowerCase()}#${pathOrTarget.className}`;
    } else {
      path = pathOrTarget.nodeName.toLowerCase();
    }
  }
  // console.log('path', path);
  return path;
}
