// @flow
import React from 'react';
import { observable, computed } from 'mobx';

export type NodeType = {
  id: string,
  type: string,
  children: Node[],
  component: (key : string) => React.Component;
}

export const LibraryState : NodeType = observable({
  id: '1',
  type: 'root',
  children: [{
    id: 2,
    type: 'artist',
    children: [],
    @computed get component() : (key : string) => React.Element {
      return (key : string) : React.Component => <span key={key}>artist 1</span>;
    },
  },
    {
      id: '3',
      type: 'artist',
      children: [{
        id: '4',
        type: 'album',
        children: [{
          id: '5',
          type: 'track',
          children: [],
          @computed get component() : (key : string) => React.Element {
            return (key : string) : React.Element => <span key={key}>track</span>;
          },
        }],
        @computed get component() : (key : string) => React.Element {
          return (key : string) : React.Element => <span key={key}>album</span>;
        },
      }],
      @computed get component() : (key : string) => React.Component {
        return (key : string) : React.Element => <span key={key}>artist 2</span>;
      },
    }],
  @computed get component() : (key : string) => React.Element {
    return (key : string) : React.Element => <b key={key}>root</b>;
  },
});
