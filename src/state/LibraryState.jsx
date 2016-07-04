// @flow
import React from 'react';
import { observable, computed } from 'mobx';

export type NodeType = {
  id: number,
  type: string,
  children: Node[],
  component: (key : string) => React.Component;
}

export const LibraryState : NodeType = observable({
  id: 1,
  type: 'root',
  children: [{
    id: 2,
    type: 'artist',
    children: [],
    @computed get component() : (key : string) => React.Element {
      return (key : string) : React.Component => <p key={key}>artist 1</p>;
    },
  },
    {
      id: 3,
      type: 'artist',
      children: [{
        id: 4,
        type: 'album',
        children: [],
        @computed get component() : (key : string) => React.Element {
          return (key : string) : React.Element => <p key={key}>album</p>;
        },
      }],
      @computed get component() : (key : string) => React.Component {
        return (key : string) : React.Element => <p key={key}>artist 2</p>;
      },
    }],
  @computed get component() : (key : string) => React.Element {
    return (key : string) : React.Element => <b key={key}>root</b>;
  },
});
