'use client';

import { ComponentProps } from '../types';

import classes from '../style/checkbox.module.css';

const Checkbox: ComponentProps = (props) => {
  const { children, id, name, disabled = false, useLabel = true, style, checked, onChange } = props;

  return (
    <label className={classes.container} style={style}>
      <input type="checkbox" name={name} id={id} disabled={disabled} checked={checked} onChange={onChange} />
      <div className={classes.custom}></div>
      {useLabel && <span>{children}</span>}
    </label>
  );
};

export default Checkbox;
