import React from 'react';

import { LibraryViewItem } from './LibraryViewItem';

function renderTabs(root, active, changeActive) {
  const result = [];
  root.get('children').forEach((child) => {
    const className =
      child.get('name') === active
        ? 'library-tabs-item library-tabs-item-active'
        : 'library-tabs-item';
    result.push(
      <div
        className={className}
        onClick={() => changeActive(child.get('name'))}
      >
        {child.get('name')}
      </div>
    );
  });
  result.push(
    <div className="library-tabs-item">+</div>
  );
  return result;
}

function renderLibrary(libraryRoot, active, toggle, addToPlayList) {
  if (active !== '') {
    return (
      <LibraryViewItem
        node={libraryRoot.getIn(['children', active])}
        toggle={toggle}
        addToPlayList={addToPlayList}
        key={'lvi_0'}
        root
      />
    );
  }
  return null;
}

export default ({ root, toggle, addToPlayList, active, changeActive }) =>
  <div className={"library-view"}>
    <div className="library-tabs">
      {renderTabs(root, active, changeActive)}
    </div>
    <div className="library-tree">
      {renderLibrary(root, active, toggle, addToPlayList)}
    </div>
  </div>;
