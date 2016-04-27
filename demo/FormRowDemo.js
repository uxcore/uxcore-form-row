/**
 * FormRow Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');

let Form = require('uxcore-form/build/Form');
let InputFormField = require('uxcore-form/build/FormField/InputFormField');
let FormRow = require('../src');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <FormRow totalFlex={5}>
                        <InputFormField jsxname="test1" jsxlabel="表单1" />
                        <InputFormField jsxname="test2" jsxlabel="表单2" />
                    </FormRow>
                </Form>
            </div>
        );
    }
};

module.exports = Demo;
