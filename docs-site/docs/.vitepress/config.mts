import { defineConfig } from 'vitepress'

// Base path for GitHub Pages project sites. Auto-derived from the repo name during
// the GitHub Actions build (GITHUB_REPOSITORY = "owner/repo"), so it works whatever
// the repo is named. Override with DOCS_BASE if needed; defaults to '/' locally.
const base =
  process.env.DOCS_BASE ??
  (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/')

export default defineConfig({
  base,
  title: 'maximo-kit',
  description: 'A Maximo configuration copilot - recipes, evidence-backed knowledge, and the MCP Working Set lifecycle',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  // Internal planning/dev docs live in the repo but are not published to the site.
  srcExclude: [
    'recipe-coverage-matrix.md',
    'server-tool-proposals.md',
    'dev-integration-test.md',
  ],
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
  ],
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'maximo-kit' },
    siteTitle: 'maximo-kit',
    nav: [
      { text: 'Guide', link: '/getting-started', activeMatch: '/getting-started|/concepts|/workflow|/mcp-lifecycle|/mcp-setup' },
      { text: 'Commands', link: '/commands' },
      { text: 'Recipes', link: '/recipes' },
      { text: 'Architecture', link: '/architecture' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Concepts', link: '/concepts' },
          { text: 'Architecture', link: '/architecture' },
        ],
      },
      {
        text: 'Using it',
        items: [
          { text: 'Design to commit', link: '/workflow' },
          { text: 'Commands', link: '/commands' },
          { text: 'MCP lifecycle', link: '/mcp-lifecycle' },
          { text: 'MCP setup', link: '/mcp-setup' },
          { text: 'validusewith primer', link: '/validusewith-primer' },
        ],
      },
      {
        text: 'Recipes',
        items: [
          { text: 'Recipe model', link: '/recipes' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/soumyaprasadrana/maximo-kit' },
    ],
    footer: {
      message: 'maximo-kit - recipes, knowledge, and the MCP Working Set lifecycle',
      copyright: 'MIT License. Built and maintained by Soumya Prasad Rana.',
    },
    search: { provider: 'local' },
  },
})
