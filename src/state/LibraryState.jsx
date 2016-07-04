import React from 'react';
import { observable, computed } from 'mobx';

export type NodeType = {
  id: number,
  type: string,
  children: Node[],
  renderNode: React.Component,
}

export const LibraryState : NodeType = observable({
  id: 1,
  type: 'neco',
  children: [],
  @computed get renderNode() : React.Component {
    return <b>Nothing to see here</b>;
  },
});
