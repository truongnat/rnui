import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'RNUI',
    tagline: 'Premium React Native UI components for high-end applications.',
    url: 'https://rnui.dev',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    organizationName: 'rnui',
    projectName: 'rnui',

    markdown: {
        format: 'mdx',
        mermaid: true,
        preprocessor: ({filePath, fileContent}) => {
            return fileContent;
        },
        hooks: {
            onBrokenMarkdownLinks: 'warn',
        },
    },

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/rnui/rnui/tree/main/docs/',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                },
                blog: {
                    showReadingTime: true,
                    postsPerPage: 'ALL',
                    blogSidebarTitle: 'All posts',
                    blogSidebarCount: 'ALL',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    plugins: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                hashed: true,
                indexDocs: true,
                indexBlog: true,
                indexPages: true,
                language: ["en"],
                docsRouteBasePath: "/docs",
            },
        ],
    ],

    themeConfig: {
        // metadata for SEO
        metadata: [
            {name: 'keywords', content: 'react native, ui kit, design system, headless ui, reanimated'},
            {name: 'twitter:card', content: 'summary_large_image'},
        ],
        image: 'img/social-card.png',
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'RNUI',
            hideOnScroll: true,
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Documentation',
                },
                {
                    type: 'search',
                    position: 'right',
                },
                {
                    href: 'https://github.com/rnui/rnui',
                    position: 'right',
                    className: 'header-github-link',
                    'aria-label': 'GitHub repository',
                },
            ],
        },
        footer: {
            style: 'light',
            links: [
                {
                    title: 'Learn',
                    items: [
                        {label: 'Introduction', to: '/docs/'},
                        {label: 'Installation', to: '/docs/getting-started'},
                        {label: 'Theming', to: '/docs/theming'},
                    ],
                },
                {
                    title: 'Advanced',
                    items: [
                        {label: 'Headless Hooks', to: '/docs/headless'},
                        {label: 'Tokens', to: '/docs/theming'},
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {label: 'GitHub', href: 'https://github.com/rnui/rnui'},
                        {label: 'Issues', href: 'https://github.com/rnui/rnui/issues'},
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} RNUI Project. Built with passion.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['bash', 'json', 'typescript', 'tsx'],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
