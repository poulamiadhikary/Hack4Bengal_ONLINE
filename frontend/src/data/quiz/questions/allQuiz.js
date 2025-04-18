import { rust } from '../questions/Rust.js'
import { algorithm } from '../questions/algo.js'
import { c } from '../questions/c.js'
import { cpp } from '../questions/cpp.js'
import { css } from '../questions/css.js'
import { cyber } from '../questions/cyber.js'
import { ds } from '../questions/ds.js'
import { html } from '../questions/html.js'
import { java } from '../questions/java.js'
import { js } from '../questions/js.js'
import { mongodb } from '../questions/mongodb.js'
import { mysql } from '../questions/mysql.js'
import { networking } from '../questions/networking.js'
import { nodejs } from '../questions/node.js'
import { os } from '../questions/os.js'
import { postgres } from '../questions/postgresql.js'
import { python } from '../questions/python.js'
import { react } from '../questions/react.js'
import { software } from '../questions/software.js'
import { ts } from '../questions/ts.js'
import { ubuntu } from '../questions/ubuntu.js'

export const allQuestions = [
    {
        id: 1,
        title: 'rust',
        data: rust,
        category: 'programming'
    },
    {
        id: 2,
        title: 'algorithms',
        data: algorithm,
        category: 'cs'
    },
    {
        id: 3,
        title: 'c',
        data: c,
        category: 'programming'
    },
    {
        id: 4,
        title: 'cpp',
        data: cpp,
        category: 'programming'
    },
    {
        id: 5,
        title: 'css',
        data: css,
        category: 'development'
    },
    {
        id: 6,
        title: 'cyber',
        data: cyber,
        category: 'cs'
    },
    {
        id: 7,
        title: 'data structure',
        data: ds,
        category: 'cs'
    },
    {
        id: 8,
        title: 'html',
        data: html,
        category: 'development'
    },
    {
        id: 9,
        title: 'java',
        data: java,
        category: 'programming'
    },
    {
        id: 10,
        title: 'javascript',
        data: js,
        category: 'programming'
    },
    {
        id: 11,
        title: 'mongodb',
        data: mongodb,
        category: 'database'
    },
    {
        id: 12,
        title: 'mysql',
        data: mysql,
        category: 'database'
    },
    {
        id: 13,
        title: 'networking',
        data: networking,
        category: 'cs'
    },
    {
        id: 14,
        title: 'nodejs',
        data: nodejs,
        category: 'development'
    },
    {
        id: 15,
        title: 'operating system',
        data: os,
        category: 'cs'
    },
    {
        id: 16,
        title: 'postgres',
        data: postgres,
        category: 'database'
    },
    {
        id: 17,
        title: 'python',
        data: python,
        category: 'programming'
    },
    {
        id: 18,
        title: 'react',
        data: react,
        category: 'development'
    },
    {
        id: 19,
        title: 'software',
        data: software,
        category: 'cs'
    },
    {
        id: 20,
        title: 'typescript',
        data: ts,
        category: 'programming'
    },
    {
        id: 21,
        title: 'ubuntu',
        data: ubuntu,
        category: 'cs'
    },
];
