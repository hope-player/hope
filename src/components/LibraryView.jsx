// @flow
import React from 'react';
import { NodeType } from '../state/LibraryState';

type LibraryViewProps = {
  library: NodeType,
}

export class LibraryView extends React.Component {
  props: LibraryViewProps

  renderNode(node : NodeType, key : string) : React.Element {
    return (
      <li>
        {
          node.component(`node_${key}`)
        }
        <ul>
        {
          node.children.map((child : NodeType, i : number) : React.Component =>
            this.renderNode(child, key + i))
        }
        </ul>
      </li>
    );
  }

  render() : React.Element {
    const library = this.props.library;
    return (
      <div>
      {
        this.renderNode(library, 1)
      }
      </div>
    );
  }
}
