import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/AppState';

import { applyName } from './Actions';

interface Props {
  applyName: typeof applyName;
}

class General extends React.PureComponent<Props>  {
  public handleApplyName = () => {
    this.props.applyName();
  }

  public render() {
    return (
      <div>
        General
        <button onClick = {this.handleApplyName}>
          Click to change name
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  name: state.pages.general.name,
});

const mapDispatchToProps = {
  applyName,
};

export default connect(mapStateToProps, mapDispatchToProps)(General);
