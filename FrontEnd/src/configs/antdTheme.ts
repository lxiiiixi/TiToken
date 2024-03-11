const antdTheme = {
    token: {
        fontFamily: "PrintChar21",
        colorTextBase: "#fefefe",
        colorBgBase: "#242424",
        colorPrimary: "#ffe804",
        colorInfo: "#ffe804",
    },
    components: {
        Button: {
            primaryShadow: "",
            defaultShadow: "",
            dangerShadow: "",
            colorTextLightSolid: "rgb(36, 40, 43)",
        },
        Table: {
            borderColor: "rgb(103, 106, 58)",
            colorBgContainer: "rgba(78, 80, 68, 0.6)",
            cellFontSize: 12,
            padding: 14,
        },
        Divider: {
            colorSplit: "rgba(249, 250, 251, 0.15)",
            // margin: 10,
            // marginLG: 12,
        },
        Dropdown: {
            colorBgElevated: "rgb(255, 255, 255)",
            colorText: "rgb(0, 0, 0)",
            controlItemBgHover: "rgba(239, 208, 3, 0.5)",
        },
        Tooltip: {
            colorBgSpotlight: "rgb(23, 24, 18)",
            fontSize: 12,
        },
    },
};

export default antdTheme;
