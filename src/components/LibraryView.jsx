import React from 'react';
import { NodeType } from '../state/LibraryState';

type LibraryViewProps = {
  library: NodeType,
}

export class LibraryView extends React.Component {
  props: LibraryViewProps
  render() : React.Component {
    const library = this.props.library;
    return (
      <p>{library.renderNode}</p>
    );
  }
}
