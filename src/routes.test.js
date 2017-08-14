import React from 'react';
import { BrowserRouter, MemoryRouter, Match, Redirect } from 'react-router';
import { shallow, mount } from 'enzyme';
import App from './App';
import chai, { expect } from 'chai';
import { inspect } from 'util';
import createRouterContext from 'react-router-test-context'
import renderer from 'react-test-renderer';

describe('it tests the router', () => {
  it('it starts at topics', () => {
    let comp = mount(
      <MemoryRouter initialEntries={[ '/topics' ]}>
        <App/>
      </MemoryRouter>
    )

    let nestedRoutes = comp.component.state.props.children.type().props.children.props;

    // console.log(`Nested routes ${ inspect(nestedRoutes)}`);

    nestedRoutes.children.map((el, index) => {
      console.log(`\n\n ${ inspect(el.props)} \n\n`);
    })

  })

  it('renders fooo', () => {
    const context = createRouterContext()
    const wrapper = mount(<MemoryRouter initialEntries={[ '/topics' ]}><App /></MemoryRouter>, { context })
    let youngLink = wrapper.find('Link')
    console.log(`CONTEXT 1${inspect(context.router)}`);
    youngLink.simulate('click')
    console.log(`YOUNG LINK ${ inspect(youngLink) }`);
    console.log(`CONTEXT 2${inspect(context.router)}`);
  })
})
