<style scoped>
.toggle {
    --width: 80px;
    --height: calc(var(--width) / 3);

    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);
    border-radius: var(--height);
    cursor: pointer;
}

.toggle input {
    display: none;
}

.toggle .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--height);
    border: 2px solid #969696;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    transition: all 0.4s ease-in-out;
}

.toggle .slider::before {
    content: '';
    position: absolute;
    top: 2.5px;
    left: 2px;
    width: calc(var(--height) * 0.6);
    height: calc(var(--height) * 0.6);
    border-radius: calc(var(--height) / 2);
    border: 3px solid #969696;
    background-color: #dbdbdb;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    transition: all 0.4s ease-in-out;
}

.toggle input:checked + .slider {
    border-color: #2196f3;
}

.toggle input:checked + .slider::before {
    border-color: #2196f3;
    background-color: #c6e5ff;
    transform: translateX(calc(var(--width) - var(--height)));
}

.toggle .labels {
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    height: 100%;
    color: #4d4d4d;
    font-size: 12px;
    font-family: sans-serif;
    transition: all 0.4s ease-in-out;
}

.toggle .labels::after {
    content: attr(data-off);
    position: absolute;
    right: 5px;
    opacity: 1;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    transition: all 0.4s ease-in-out;
}

.toggle .labels::before {
    content: attr(data-on);
    position: absolute;
    left: 5px;
    opacity: 0;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
    transition: all 0.4s ease-in-out;
}

.toggle input:checked ~ .labels::after {
    opacity: 0;
}

.toggle input:checked ~ .labels::before {
    opacity: 1;
}
</style>

<template>
    <label class="toggle">
        <input type="checkbox" />
        <span class="slider"></span>
        <span class="labels" data-on="Кораблестроение" data-off="OFF"></span>
    </label>
</template>
