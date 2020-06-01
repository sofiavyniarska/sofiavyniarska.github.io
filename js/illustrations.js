// Util functions
function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


// Event Listeners
// onClick add clases before transition
const items = document.getElementsByClassName('image');
Array.prototype.forEach.call(items, function (item, i) {
    item.addEventListener('click', function (e) {

        // For testing purposes im using toggle. Remove Later
        console.log(i);
        item.classList.toggle('active');
        Array.prototype.forEach.call(items, function (otherItem, i) {
            if (otherItem != item)
                otherItem.classList.toggle('close');
        });

    });
});


// Scroll image Animation (small Y movement)

const inners = document.getElementsByClassName('inner');
const maxTranslate = 30;
const setTranslate = () => {
    Array.prototype.forEach.call(inners, function (item, i) {
        const rect = item.getBoundingClientRect();
        const top = Math.min(0, Math.max(-100,
            (rect.top * 100) / rect.height
        ));
        const bot = Math.min(100, Math.max(0,
            ((rect.bottom - window.innerHeight) * 100) / rect.height
        ));

        let minAbsValue = 0;
        // If bot values are 0 it means the image is inside viewport

        // Always get biggest value
        if (Math.abs(top) > Math.abs(bot)) {
            minAbsValue = top;
        }
        if (Math.abs(bot) > Math.abs(top)) {
            minAbsValue = bot;
        }
        // If image is smaller that viewport
        // Caculate closest percentage.
        // If the image extends to the top and the bot the same height
        // then value will be 0
        if (top != 0 && bot != 0) {
            minAbsValue = top + bot;
        }
        // Then map it to a number between MaxTranslate negative and positive
        const mapped = map(minAbsValue, -100, 100, -maxTranslate, maxTranslate).toFixed(6);
        item.style.transform = `translateY(${mapped * -1}%)`;

    });

}
// eEvent lsiteners
window.addEventListener('scroll', function (e) {
    setTranslate();
});

// On start of page
const init = () => {

    // Initiate innerImage translate Effect in case page is already scrolled
    setTranslate();

    // Initiate panels depending on Index
    const panels = document.getElementsByClassName('panel');
    Array.prototype.forEach.call(panels, function (p, i) {
        // Calculate Real Index
        // Normal index is first left and then right
        const lastLeftIndex = Math.floor(panels.length / 2);
        const realIndex = (i >= lastLeftIndex ? 1 + (2 * (i - lastLeftIndex)) : 2 + 2 * i) - 1;
        console.log(i, 'index', realIndex);
        // Third of transition duration
        p.style.transitionDelay = `${0.375 * realIndex}s`;
        p.style.transform = 'scaleX(0)'
    });


}
init();
