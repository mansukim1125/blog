'use strict';

import Router from '../lib/router/router';

import NavBarComponent from '../components/NavBar';
import HomeComponent from '../components/Home';
import PostsComponent from '../components/Posts';
import PostComponent from '../components/Post';
import ProjectsComponent from '../components/Projects';
import BlogNavBarComponent from '../components/BlogNavBar';

const routes = [
    {
        path: '/',
        component: NavBarComponent,
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: HomeComponent
            },
            {
                path: '/projects',
                component: ProjectsComponent
            }
        ]
    },
    {
        path: '/blog',
        component: BlogNavBarComponent,
        redirect: '/blog/posts',
        children: [
            {
                path: '/posts',
                component: PostsComponent
            },
            {
                path: '/posts/:id',
                component: PostComponent,
                param: {
                    type: String,
                    name: 'postId'
                }
            }
        ]
    }
];

export const router = new Router(routes);
