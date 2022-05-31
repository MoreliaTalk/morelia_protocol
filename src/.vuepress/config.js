const { description } = require('../../package.json')
const {defaultTheme} = require("vuepress");

module.exports = {
    base: "morelia_protocol",
    title: "MoreliaProtocol Documentation",
    description: description,
    lang: "ru-RU",
    search: true,

    theme: defaultTheme({
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        sidebar: [{
            children: [
                {
                    text: "О протоколе",
                    link: "README.md",
                },
                "api.md",
                "methods.md",
                "errors.md",
            ]
        }]
    }),

    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
    ]
}
