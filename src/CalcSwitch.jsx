import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class CalcSwitch extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleChange = (event) =>{
    const { id } = this.props;
    const { checked } = (event || {}).target || {};
    this.setState({
      checked,
    });

    this.props.onChange(id, event.target.checked);
  }

  render(){
    return(
      <FormControlLabel
        control={
          <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            name={this.props.id}
            color="primary"
          />
        }
        label={this.props.label}
      />
    );
  }
}

export default CalcSwitch;