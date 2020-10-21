import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CalcSwitch from './CalcSwitch';
import TextField from  '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {SKILLS} from './constants';
import NumberDisplay from './NumberDisplay';

class Calc extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
      totalBab: 0,
      totalDamage: 0,
      totalArmorClass: 0,
      bab: 0,
      damage: 0,
      strengthMod: 0,
      armorClass: 0,
      selected:{},
    };
  }

  recalculate = () => {
    const {bab, damage, strengthMod, selected, armorClass,} =this.state;
    let totalDamage = strengthMod + damage;
    let totalBab = strengthMod + bab;
    let totalArmorClass = armorClass; 

    Object.values(selected).forEach(data => {
      const {damage, bab, ac} = data || {};
      totalDamage += (damage || 0);
      totalBab += (bab || 0);
      totalArmorClass += (ac || 0);
    });

    this.setState({
      totalBab,
      totalDamage,
      totalArmorClass,
    });
  }

  handleChange = (key, event) => {
    this.setState({
      [key]: parseFloat(event.target.value),
    }, () => {
      this.recalculate();
    });
  }

  select = (key, checked) => {
    const { selected } = this.state;
    if(checked){
      selected[key] = SKILLS[key];
    } else {
      delete selected[key];
    }
    this.setState({selected}, ()=>{
      this.recalculate();
    });
  }

  render(){
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label="Strength Modifier"
              type="number"
              variant="filled"
              value={this.state.strengthMod}
              onChange={(event)=>{this.handleChange('strengthMod', event)}} 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Armor Class"
              type="number"
              variant="filled"
              value={this.state.armorClass}
              onChange={(event)=>{this.handleChange('armorClass', event)}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              label="BaB"
              type="number"
              variant="filled"
              value={this.state.bab}
              onChange={(event)=>{this.handleChange('bab', event)}} 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Damage"
              type="number"
              variant="filled"
              value={this.state.damage}
              onChange={(event)=>{this.handleChange('damage', event)}}
            />
          </Grid>

          
          {Object.keys(SKILLS).map(id=>{
            const { label } = SKILLS[id];
            return(
              <Grid key={id} item xs={6}>
                <CalcSwitch id={id} label={label} onChange={this.select} />
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <NumberDisplay label="Total BaB" value={this.state.totalBab} />
          </Grid>

          <Grid item xs={12}>
            <NumberDisplay label="Total Damage" value={this.state.totalDamage} />
          </Grid>

          <Grid item xs={12}>
            <NumberDisplay label='Armor Class' value={this.state.totalArmorClass} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
const styles = {
  center: {
    textAlign: 'center',
  },
};
export default withStyles(styles)(Calc);