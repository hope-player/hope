import React from 'react';

export class LibraryViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.addToPlayList = this.addToPlayList.bind(this);
  }

  toggle() {
    this.props.toggle(this.props.node);
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
    const { node, toggle, addToPlayList } = this.props;
    const result = [];
    if (node.get('expanded')) {
      node.get('children').forEach(child => {
        result.push(
          <LibraryViewItem
            key={`lvi_${child.get('id')}`}
            node={child}
            toggle={toggle}
            addToPlayList={addToPlayList}
          />);
      });
    }
    return result;
  }

  renderExpand() {
    const { node } = this.props;
    let result = null;
    if (node.get('expanded')) {
      result = <a className="icon-expand_less" onClick={this.toggle} />;
    } else {
      result = <a className="icon-expand_more" onClick={this.toggle} />;
    }
    return result;
  }

  render() {
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
