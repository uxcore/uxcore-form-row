/**
 * FormRow Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import Form from 'uxcore-form/build/Form';
import InputFormField from 'uxcore-input-form-field';
import FormRow from '../src/FormRow';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Form>
          <FormRow>
            <InputFormField jsxname="test1" jsxlabel="表单1" />
            <InputFormField jsxname="test2" jsxlabel="表单2" />
            {null}
          </FormRow>
        </Form>
      </div>
    );
  }
}

export default Demo;
