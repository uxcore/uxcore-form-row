import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CONST from 'uxcore-const';

class FormRow extends React.Component {
  constructor(props) {
    super(props);
    this.totalFlex = 0;
    this.isAllViewMode = true;
  }

  processChild(children) {
    const me = this;
    me.totalFlex = 0;
    const length = React.Children.count(children);
    const elements = [];
    if (length === 0) {
      console.warn('FORM: You must pass children to the form component');
      return false;
    }
    React.Children.forEach(children, (child) => {
      // 如果是自己添加的 DOM 直接抛弃
      if (child && typeof child.type === 'function') {
        const displayName = child.type.displayName;
        const mode = child.props.jsxmode || this.props.mode;
        if (mode === CONST.MODE.EDIT) {
          this.isAllViewMode = false;
        }
        if (/FormField/.test(displayName)) {
          if (child.props.jsxshow) {
            me.totalFlex += child.props.jsxflex || 1;
          }
          elements.push(child);
        }
      }
    });
    // if autoAdjustSpacing is not active, isAllViewMode is not active
    if (!this.props.autoAdjustSpacing) {
      this.isAllViewMode = false;
    }
    return elements;
  }

  render() {
    const me = this;
    const elements = me.processChild(me.props.children);
    const totalFlex = me.props.totalFlex || me.totalFlex;
    return (
      <div
        className={classnames({
          [me.props.jsxprefixCls]: true,
          [me.props.className]: !!me.props.className,
        })}
      >
        {!!elements && elements.map((child, index) => {
          const value = me.props.data[child.props.jsxname];
          return React.cloneElement(child, {
            mode: me.props.mode,
            jsxinstant: me.props.instantValidate,
            jsxVerticalAlign: me.props.verticalAlign,
            jsxsize: me.props.size,
            value,
            key: child.props.jsxname || index,
            asyncValidate: me.props.asyncValidate,
            isAllViewMode: this.isAllViewMode,
            totalFlex,
            style: { width: `${(child.props.jsxflex / me.totalFlex) * 100}%` },
            attachFormField: me.props.attachFormField,
            detachFormField: me.props.detachFormField,
            handleDataChange: me.props.handleDataChange,
            getValues: me.props.getValues,
            resetValues: me.props.resetValues,
          });
        })}
      </div>
    );
  }
}

FormRow.defaultProps = {
  jsxprefixCls: 'kuma-uxform-row',
  mode: CONST.MODE.EDIT,
};
FormRow.propTypes = {
  mode: PropTypes.string,
  autoAdjustSpacing: PropTypes.bool,
};
FormRow.displayName = 'FormRow';

export default FormRow;
