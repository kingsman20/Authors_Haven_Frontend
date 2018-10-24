import configureMockStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import DefaultReadArticle, { ReadArticle } from '../../../components/article/ReadArticle';

const mockStore = configureMockStore([thunk]);
describe('Read Article component', () => {
  let wrapper, store, props, initialState;
  beforeEach(() => {
    props = {
      article: {
        Tags: ['tag a', 'tag b'],
        User: {
          email: null,
          firstname: null,
          id: 5,
          image: null,
          lastname: null,
          reset_password_hash: null
        },
        body: '<p>The story started few years back</p>',
        createdAt: '2018-10-15T11:27:58.250Z',
        description: '<p>the description</p>',
        id: 71,
        readingTime: '1 min read',
        slug: 'new-article',
        title: 'new article',
        updatedAt: '2018-10-15T11:27:58.250Z',
        userId: 5

      },
      comment: {
        id: 179,
        createdAt: '2018-10-23T08:41:31.073Z',
        updatedAt: '2018-10-23T08:41:31.073Z',
        body: 'Life is a race what do I do?',
        User: {
          username: 'faksam',
          email: 'fakunlesamuel@gmail.com',
          image: null
        }
      },
      fetchSingleArticle: jest.fn(),
      loadCommentsAction: jest.fn(),
      match: {
        params: { slug: 'new-article' },
        url: '/articles/new-article'
      },
      location: { pathname: '/articles/new-article' },
      history: {}
    };
    initialState = {
      articleReducer: {
        articles: [
          {
            Tags: ['tag a', 'tag b'],
            User: {
              email: null,
              firstname: null,
              id: 5,
              image: null,
              lastname: null,
              reset_password_hash: null
            },
            body: '<p>The story started few years back</p>',
            createdAt: '2018-10-15T11:27:58.250Z',
            description: '<p>the description</p>',
            id: 71,
            readingTime: '1 min read',
            slug: 'new-article',
            title: 'Writing a new article',
            updatedAt: '2018-10-15T11:27:58.250Z',
            userId: 5
          }, {
            Tags: ['tag a', 'tag b'],
            User: {
              email: null,
              firstname: null,
              id: 5,
              image: null,
              lastname: null,
              reset_password_hash: null
            },
            body: '<p>The story started few years back when i was</p>',
            createdAt: '2018-10-15T11:27:58.250Z',
            description: '<p>the description of new article</p>',
            id: 71,
            readingTime: '1 min read',
            slug: 'new-article-edited',
            title: 'Writing a new article in a new dimension',
            updatedAt: '2018-10-15T11:27:58.250Z',
            userId: 5
          }
        ]
      },
      commentReducer: {
        comments: {
          paginationMeta: {
            currentPage: 1,
            pageSize: 10,
            totalCount: 5,
            resultCount: 5,
            pageCount: 1
          },
          comments: {
            0: {
              id: 179,
              createdAt: '2018-10-23T08:41:31.073Z',
              updatedAt: '2018-10-23T08:41:31.073Z',
              body: 'This article is correct edit',
              User: {
                username: 'faksam',
                email: 'fakunlesamuel@gmail.com',
                image: null
              }
            },
            1: {
              id: 179,
              createdAt: '2018-10-23T08:41:31.073Z',
              updatedAt: '2018-10-23T08:41:31.073Z',
              body: 'Life is a race what do I do?',
              User: {
                username: 'faksam',
                email: 'fakunlesamuel@gmail.com',
                image: null
              }
            },
            2: {
              id: 179,
              createdAt: '2018-10-23T08:41:31.073Z',
              updatedAt: '2018-10-23T08:41:31.073Z',
              body: 'This article is hot',
              User: {
                username: 'faksam',
                email: 'fakunlesamuel@gmail.com',
                image: null
              }
            },
          },
          commentsCount: 5
        },
      }
    };
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <DefaultReadArticle {...props} />
      </Provider>
    );
  });

  it('should render Article page correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('ComponentDidMount', () => {
    const props = { // eslint-disable-line
      article: null,
      fetchSingleArticle: jest.fn(),
      loadCommentsAction: jest.fn(),
      match: {
        params: { slug: 'new-article' },
        url: '/articles/new-article'
      },
      location: { pathname: '/articles/new-article' },
      history: {}
    };
    wrapper = shallow(<ReadArticle store={store} {...props} />);
    expect(props.fetchSingleArticle).toHaveBeenCalled();
    expect(props.loadCommentsAction).toHaveBeenCalled();
    wrapper = shallow(<ReadArticle {...props} />);
  });

  it('should display the necessary element', () => {
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('div').length).toEqual(3);
  });

  it('ComponentDidMount', () => {
    const newProp = { ...props, artcile: null };
    wrapper = shallow(<ReadArticle {...newProp} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Loading')).toBeDefined();
  });
});
