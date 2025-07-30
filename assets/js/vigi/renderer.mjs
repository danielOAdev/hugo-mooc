const DEFAULT_TRANSFORMATION = {
    originOffset: false,
    originX: 0,
    originY: 0,
    translateX: 0,
    translateY: 0,
    scale: 1
};
const STYLE_TRANSITION = 'transform 0.3s ease-in-out';
const STYLE_SHADOW = 'black 0em 0em 20px 0px inset'
const hasPositionChanged = ({pos, prevPos}) => pos !== prevPos;
const valueInRange = ({minScale, maxScale, transform: {scale}}) => scale <= maxScale && scale >= minScale;
const getTranslate = (state) => ({pos, axis}) => {
    const {originX, originY, translateX, translateY, scale} = state.transform;
    const axisIsX = axis === "x";
    const prevPos = axisIsX ? originX : originY;
    const translate = axisIsX ? translateX : translateY;
    return valueInRange(state) && hasPositionChanged({
        pos,
        prevPos
    }) ? translate + (pos - prevPos * scale) * (1 - 1 / scale) : translate;
};

const getMatrix = ({scale, translateX, translateY}) => `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`;
const clamp = (value, min, max) => Math.max(Math.min(value, max), min);
const getNewScale = (deltaScale, {transform: {scale}, minScale, maxScale, scaleSensitivity}) => {
    const newScale = scale + deltaScale / (scaleSensitivity / scale);
    return clamp(newScale, minScale, maxScale);
};

const clampedTranslate = ({axis, translate, state}) => {
    const {scale, originX, originY} = state.transform;
    const axisIsX = axis === "x";
    const origin = axisIsX ? originX : originY;
    const axisKey = axisIsX ? "offsetWidth" : "offsetHeight";
    const containerSize = state.container[axisKey];
    const imageSize = state.element[axisKey];
    const bounds = state.element.getBoundingClientRect();
    const imageScaledSize = axisIsX ? bounds.width : bounds.height;
    const defaultOrigin = imageSize / 2;
    const originOffset = (origin - defaultOrigin) * (scale - 1);
    const range = Math.max(0, Math.round(imageScaledSize) - containerSize);
    const max = Math.round(range / 2);
    const min = 0 - max;
    return clamp(translate, min + originOffset, max + originOffset);
};

const renderClamped = ({state, translateX, translateY}) => {
    const {originX, originY, scale} = state.transform;
    state.transform.translateX = clampedTranslate({
        axis: "x",
        translate: translateX,
        state
    });
    state.transform.translateY = clampedTranslate({
        axis: "y",
        translate: translateY,
        state
    });
    requestAnimationFrame( () => {
        if (state.transform.originOffset) {
            state.element.style.transformOrigin = `${originX}px ${originY}px`;
        }
        state.element.style.transform = getMatrix({
            scale,
            translateX: state.transform.translateX,
            translateY: state.transform.translateY
        });
    }
    );
};

const pan = (state, {originX, originY}) => {
    renderClamped({
        state,
        translateX: state.transform.translateX + originX,
        translateY: state.transform.translateY + originY
    });
};

const canPan = (state) => ({
    panBy: (origin) => {
        state.element.style.transition = '';
        pan(state, origin)
        state.element.style.transition = STYLE_TRANSITION;
    },
    panTo: ({originX, originY, scale}) => {
        state.transform.scale = clamp(scale, state.minScale, state.maxScale);
        pan(state, {
            originX: originX - state.transform.translateX,
            originY: originY - state.transform.translateY
        });
    }
});

const canZoom = (state) => ({
    zoomPan: ({scale: scaleValue, x, y, deltaX, deltaY}) => {
        state.element.style.transition = '';
        const {minScale, maxScale, transform: {scale}} = state;
        const newScale = clamp(scaleValue, minScale, maxScale);
        const {left, top} = state.element.getBoundingClientRect();
        const originX = x - left;
        const originY = y - top;
        const newOriginX = originX / scale;
        const newOriginY = originY / scale;
        const translate = getTranslate(state);
        const translateX = translate({
            pos: originX,
            axis: "x"
        });
        const translateY = translate({
            pos: originY,
            axis: "y"
        });
        state.transform = {
            originOffset: true,
            originX: newOriginX,
            originY: newOriginY,
            translateX,
            translateY,
            scale: newScale
        };
        pan(state, {
            originX: deltaX,
            originY: deltaY
        });
        state.element.style.transition = STYLE_TRANSITION;
    },
    zoom: ({x, y, deltaScale}) => {
        const {element, transform: {scale}} = state;
        const {left, top} = element.getBoundingClientRect();
        const newScale = getNewScale(deltaScale, state);
        const originX = x - left;
        const originY = y - top;
        const newOriginX = originX / scale;
        const newOriginY = originY / scale;
        const translate = getTranslate(state);
        const translateX = translate({
            pos: originX,
            axis: "x"
        });
        const translateY = translate({
            pos: originY,
            axis: "y"
        });
        state.transform = {
            ...state.transform,
            originOffset: true,
            originX: newOriginX,
            originY: newOriginY,
            scale: newScale
        };
        renderClamped({
            state,
            translateX,
            translateY
        });
    },
    zoomTo: ({newScale, x, y}) => {
        const {element, transform: {scale}} = state;
        const {left, top} = element.getBoundingClientRect();
        const originX = x - left;
        const originY = y - top;
        const newOriginX = originX / scale;
        const newOriginY = originY / scale;
        const translate = getTranslate(state);
        const translateX = translate({
            pos: originX,
            axis: "x"
        });
        const translateY = translate({
            pos: originY,
            axis: "y"
        });
        state.transform = {
            originOffset: true,
            originX: newOriginX,
            originY: newOriginY,
            scale: newScale,
            translateX,
            translateY
        };
        requestAnimationFrame( () => {
            state.element.style.transformOrigin = `${newOriginX}px ${newOriginY}px`;
            state.element.style.transform = getMatrix({
                scale: newScale,
                translateX,
                translateY
            });
        }
        );
        state.container.style.boxShadow = STYLE_SHADOW;
    }
});

const canInspect = (state) => ({
    getScale: () => state.transform.scale,
    reset: () => {
        state.transform.scale = state.minScale;
        pan(state, {
            originX: 0,
            originY: 0
        });
        state.transform = DEFAULT_TRANSFORMATION;
        state.container.style.boxShadow = '';
    }
    ,
    getState: () => state
});

export const renderer = ({minScale, maxScale, element, container, scaleSensitivity=10}) => {
    const state = {
        container,
        element,
        minScale,
        maxScale,
        scaleSensitivity,
        accumulatedDeltaScale: 0,
        transform: DEFAULT_TRANSFORMATION
    };
    return {
        ...canZoom(state),
        ...canPan(state),
        ...canInspect(state)
    };
};