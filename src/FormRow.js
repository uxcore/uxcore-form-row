let React = require('react');
let ReactDOM = require('react-dom');
let classnames = require("classnames");

class FormRow extends React.Component {

    constructor(props) {
        super(props);
        this.totalFlex = 0;
    }

    _processChild(children) {
        let me = this;
        me.totalFlex = 0;
        let length = React.Children.count(children);
        let elements = [];
        if (length == 0) {
            console.warn("FORM: You must pass children to the form component");
            return false;
        }
        React.Children.forEach(children, function(child, index) {
            // 如果是自己添加的 DOM 直接抛弃
            if (typeof child.type == 'function') {
                let displayName = child.type.displayName;
                if (displayName === 'EngineNode') {
                    displayName = child.props._componentName;
                }
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
        let me = this;
        let elements = me._processChild(me.props.children);
        let totalFlex = me.props.totalFlex || me.totalFlex;
        return (
            <div className={classnames({
                [me.props.jsxprefixCls]: true,
                [me.props.className]: !!me.props.className
            })}>
                {!!elements && elements.map(function(child, index) {
                    let value = me.props.data[child.props.jsxname];
                    return React.cloneElement(child, {
                        mode: me.props.mode,
                        jsxinstant: me.props.instantValidate,
                        value: value,
                        key: child.props.jsxname || index,
                        totalFlex: totalFlex,
                        style: {width: child.props.jsxflex / me.totalFlex * 100 + '%'},
                        attachFormField: me.props.attachFormField,
                        detachFormField: me.props.detachFormField,
                        handleDataChange: me.props.handleDataChange,
                        getValues: me.props.getValues,
                        resetValues: me.props.resetValues
                    });

                    return child;
                })}
            </div>
        );

    }
}

FormRow.defaultProps = {
    jsxprefixCls: "kuma-uxform-row"
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
    className: React.PropTypes.string
};
FormRow.displayName = "FormRow";

module.exports = FormRow;
