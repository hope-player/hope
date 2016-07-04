// @flow
import React from 'react';
import { NodeType } from '../state/LibraryState';

type LibraryViewProps = {
  library: NodeType,
}

type LibraryViewState = {
  expanded: Set<string>,
}

export class LibraryView extends React.Component {
  constructor(props : LibraryViewProps) {
    super(props);
    this.state = {
      expanded: new Set('1'),
    };
  }

  state: LibraryViewState
  props: LibraryViewProps

  toggle(id : string) {
    const nextExpanded = this.state.expanded;
    if (this.state.expanded.has(id.toString())) {
      nextExpanded.delete(id.toString());
    } else {
      nextExpanded.add(id.toString());
    }
    this.setState({ expanded: nextExpanded });
  }

  renderNode(node : NodeType, key : string) : React.Element {
    return (
      <li key={'li_' + key}><a onClick={this.toggle.bind(this, node.id)}> + </a>
        {
          node.component(`node_${key}`)
        }
        <ul key={'ul_' + key}>
        {
          node.children.map((child : NodeType, i : number) : React.Component => {
            if (this.state.expanded.has(node.id)) {
              return this.renderNode(child, key + i);
            } else {
              return null;
            }
          })
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
        this.renderNode(library, '1')
      }
      </div>
    );
  }
}
