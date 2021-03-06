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
    this.props.addToPlayList(node);
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
    if (node.get('type') === 'track') {
      return result;
    }
    if (node.get('expanded')) {
      result = <a className="material-icons" onClick={this.toggle}>expand_less</a>;
    } else {
      result = <a className="material-icons" onClick={this.toggle}>expand_more</a>;
    }
    return result;
  }

  renderHeader() {
    const { root, node } = this.props;
    if (!root) {
      return (
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
          <a className="material-icons playlist-add" onClick={this.addToPlayList}>add</a>
        </div>
      );
    }
    return null;
  }

  render() {
    const { node } = this.props;
    return (
      <div className={"library-view-item"} key={`lvi_div_${node.get('id')}`}>
        {this.renderHeader()}
        {this.renderChildren()}
      </div>
    );
  }
}
