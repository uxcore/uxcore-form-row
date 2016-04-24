
const React = require('react');
const {Bundle} = require('engine');
const {BoolSetter, TextSetter, ChoiceSetter, JsonSetter, NumberSetter} = require('engine-utils');

module.exports = Bundle.createPrototype({
    title: "行",
    category: "表单",
    icon: require("./logo.svg"), // todo: require("./logo.svg"),
    componentName: "FormRow",
    canHovering: true,
    canSelecting: true,
    canDraging: true,
    isInline: false,
    isContainer: true,
    canDropto: true,
    conDroping: true,
    configure: []
});
