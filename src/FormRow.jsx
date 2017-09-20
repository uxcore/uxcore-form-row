const React = require('react');
const classnames = require('classnames');

class FormRow extends React.Component {

  constructor(props) {
    super(props);
    this.totalFlex = 0;
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
      if (typeof child.type === 'function') {
        const displayName = child.type.displayName;
        if (/FormField/.test(displayName)) {
          if (child.props.jsxshow) {
            me.totalFlex += child.props.jsxflex || 1;
          }
          elements.push(child);
        }
      }
    });

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
            value,
            key: child.props.jsxname || index,
            asyncValidate: me.props.asyncValidate,
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
};
FormRow.propTypes = {
  /**
   * @title 类名前缀
   * @veIgnore
   */
  jsxprefixCls: React.PropTypes.string,
  /**
   * @title 弹性比例总和
   */
  totalFlex: React.PropTypes.number,
  /**
   * @title CSS类名
   * @veIgnore
   */
  className: React.PropTypes.string,
};
FormRow.displayName = 'FormRow';

module.exports = FormRow;
