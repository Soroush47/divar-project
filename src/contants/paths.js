const paths = [
    "src",
    "assets",
    "components",
    "configs",
    "layouts",
    "pages",
    "router",
    "services",
    "styles",
    "utils",
];

const alias = paths.reduce((acc, cur) => {
    return {
        ...acc,
        [cur]: `/${cur === "src" ? cur : "src/" + cur}`,
    };
}, {});

export default alias;
