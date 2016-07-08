// @flow
import React from 'react';
import { observer } from 'mobx-react';


@observer export class LibraryViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle(this.props.node.get('id'));
  }

  renderChildren() {
    const { node, isExpanded, toggle } = this.props;
    const result = [];
    if (isExpanded(node.get('id'))) {
      node.get('children').map(child => {
        result.push(
          <LibraryViewItem
            node={child}
            toggle={toggle}
            isExpanded={isExpanded}
          />);
      });
    }
    return result;
  }

  renderExpand() {
    const { node, isExpanded, toggle } = this.props;
    let result = null;
    if (node.get('children').size) {
      if (isExpanded(node.get('id'))) {
        result = <a onClick={this.toggle}>-</a>;
      } else {
        result = <a onClick={this.toggle}>+</a>;
      }
    }
    return result;
  }

  render() : React.Element {
    const { node } = this.props;
    return (
      <div className={"library-view-item"}>
        <div className={"library-view-item-header"}>
          {
            this.renderExpand()
          }
          {
            node.get('name')
          }
        </div>
        {
          this.renderChildren()
        }
      </div>
    );
  }
}
