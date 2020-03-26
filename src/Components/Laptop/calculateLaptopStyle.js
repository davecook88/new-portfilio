export default function calculateInlineStyle({
    heightModifier = 0.55,
    widthModifier = 0.55,
    leftModifier = 0.1,
    topModifier = 0.1
    } = {}) {
    const windowWidth = window.screen.width;
    const windowHeight = window.screen.height;
    //If mobile
    const widthToHeightRatio = windowWidth > 400 ? 2 : 2.2;
    const style = {
        height: windowWidth * widthModifier / widthToHeightRatio,
        width: windowWidth * widthModifier,
        left: windowWidth * leftModifier,
        top: windowHeight * topModifier,
    };
    return style;
}