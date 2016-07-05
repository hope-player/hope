// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { Panel } from 'react-bootstrap';

import { NodeType } from '../state/LibraryState';

type LibraryViewItemProps = {
  toggle: (id : string) => void,
  isExpanded: (id : string) => boolean,
  node: NodeType,
}

@observer export class LibraryViewItem extends React.Component {
  constructor(props : LibraryViewItemProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      expanded: new Set('1'),
    };
  }

  props: LibraryViewItemProps

  toggle() {
    this.props.toggle(this.props.node.id.toString());
  }

  render() : React.Element {
    const { node, isExpanded } = this.props;
    return (
      <div className={"library-view-item"} key={`li_${node.id}`}>
        {
          <div className={"list-group-item"}>
            {
              node.component(`node_${node.id}`)
            }
            <a onClick={this.toggle}>+</a>
          </div>
        }
        <div className={"library-view"} key={`ul_${node.id}`}>
        {
          node.children.map((child : NodeType) : React.Component => {
            if (isExpanded(node.id.toString())) {
              return (
                <LibraryViewItem
                  node={child}
                  key={child.id}
                  toggle={this.props.toggle}
                  isExpanded={isExpanded}
                />);
            }
            return null;
          })
        }
        </div>
      </div>
    );
  }
}
