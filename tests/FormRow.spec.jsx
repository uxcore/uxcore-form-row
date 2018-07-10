import expect from 'expect.js';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormField from 'uxcore-form-field';

import FormRow from '../src';

Enzyme.configure({ adapter: new Adapter() });

describe('FormRow', () => {
  it('should render correctly', () => {
    mount(<FormRow />);
  });
  it('should process child correctly', () => {
    const wrapper = mount(
      <FormRow data={{}} attachFormField={() => {}} handleDataChange={() => {}}>
        <FormField />
      </FormRow>,
    );
    expect(wrapper.find(FormField).length).not.to.be(0);
  });
  it('should support child is null', () => {
    mount(
      <FormRow data={{}} attachFormField={() => {}} handleDataChange={() => {}}>
        <FormField />
        {null}
      </FormRow>,
    );
  });
});
