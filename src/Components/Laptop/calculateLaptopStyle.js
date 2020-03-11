export default function calculateInlineStyle({
    heightModifier = 0.55,
    widthModifier = 0.55,
    leftModifier = 0.1,
    topModifier = 0.1
    } = {}) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    //If mobile
    if (windowWidth < 600){
        const style = {
            height: windowHeight / 2,
            width: windowWidth * 0.9,
            left: 0,
            top: 0,
        };
        return style;
    }

    if (windowWidth > 600){
        const style = {
            height: windowHeight * heightModifier,
            width: windowWidth * widthModifier,
            left: windowWidth * leftModifier,
            top: windowHeight * topModifier,
        };
        return style;
    }
}