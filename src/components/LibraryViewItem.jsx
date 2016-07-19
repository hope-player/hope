import React from 'react';
import { observer } from 'mobx-react';

@observer export class LibraryViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.addToPlayList = this.addToPlayList.bind(this);
  }

  toggle() {
    this.props.toggle(this.props.node.get('id'));
  }

  addToPlayList() {
    this.addNodeToPlayList(this.props.node);
  }

  addNodeToPlayList(node) {
    if (node.get('type') === 'track') {
      this.props.addToPlayList(node);
    } else if (node.get('children').size) {
      node.get('children').forEach(child => {
        this.addNodeToPlayList(child);
      });
    }
  }

  renderChildren() {
    const { node, isExpanded, toggle, addToPlayList } = this.props;
    const result = [];
    if (isExpanded(node.get('id'))) {
      node.get('children').forEach(child => {
        result.push(
          <LibraryViewItem
            key={`lvi_${child.get('id')}`}
            node={child}
            toggle={toggle}
            isExpanded={isExpanded}
            addToPlayList={addToPlayList}
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
        result = <a className="icon-expand_less" onClick={this.toggle} />;
      } else {
        result = <a className="icon-expand_more" onClick={this.toggle} />;
      }
    }
    return result;
  }

  render() : React.Element {
    const { node } = this.props;
    return (
      <div className={"library-view-item"}>
        <div className={"library-view-item-header"}>
          <div className="library-view-item-text">
            {
              this.renderExpand()
            }
          </div>
          {
            node.get('type') === 'track' ? `${node.getIn(['metadata', 'no'])}. ` : null
          }
          {
            node.get('name')
          }
          <a className="icon-add playlist-add" onClick={this.addToPlayList} />
        </div>
        {
          this.renderChildren()
        }
      </div>
    );
  }
}
