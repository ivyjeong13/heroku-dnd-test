import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from  '@material-ui/core/TextField';
import NumberDisplay from './NumberDisplay';

class Shifter extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalMinorCharges: 0,
      totalMajorCharges: 0,
      wisdomModifier: 0,
      level: 0,
    };

    this.recalculate();
  }

  handleChange = (key, event) => {
    this.setState({
      [key]: parseFloat(event.target.value),
    }, () => {
      this.recalculate();
    });
  }

  recalculate = () => {
    const { wisdomModifier, level, usedMajorCharges, usedMinorCharges, } = this.state;
    const totalMajorCharges = (level || 0) + (wisdomModifier || 0) - (usedMajorCharges || 0);
    const totalMinorCharges = 3 + (level || 0) - (usedMinorCharges || 0);

    this.setState({ totalMinorCharges, totalMajorCharges });
  }

  render(){
    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            label="Level"
            type="number"
            variant="filled"
            value={this.state.level}
            onChange={(event)=>{this.handleChange('level', event)}} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Wisdom Modifier"
            type="number"
            variant="filled"
            value={this.state.wisdomModifier}
            onChange={(event)=>{this.handleChange('wisdomModifier', event)}} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Used Minor Charges"
            type="number"
            variant="filled"
            value={this.state.usedMinorCharges}
            onChange={(event)=>{this.handleChange('usedMinorCharges', event)}} 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Used Major Charges"
            type="number"
            variant="filled"
            value={this.state.usedMajorCharges}
            onChange={(event)=>{this.handleChange('usedMajorCharges', event)}} 
          />
        </Grid>

        <Grid item xs={12}>
          <NumberDisplay label="Remaining Minor Aspect Charges" value={this.state.totalMinorCharges} />
        </Grid>
        <Grid item xs={12}>
          <NumberDisplay label="Remaining Major Aspect Charges" value={this.state.totalMajorCharges} />
        </Grid>
      </Grid>
    );
  }
}

export default Shifter;