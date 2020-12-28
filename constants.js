
const plusRandomMilliseconds = () => {
    return Math.floor(Math.random()*999)+1;
}

module.exports = {
    PRESS_ENTER     : String.fromCharCode(13),
    TEN_SECONDS     : 10000  + plusRandomMilliseconds(),
    EIGHT_SECONDS   : 8000   + plusRandomMilliseconds(),
    FIVE_SECONDS    : 5000   + plusRandomMilliseconds(),
    FOUR_SECONDS    : 4000   + plusRandomMilliseconds(),
    THREE_SECONDS   : 3000   + plusRandomMilliseconds(),
    TWO_SECONDS     : 2000   + plusRandomMilliseconds(),
    ONE_SECOND      : 1000   + plusRandomMilliseconds(), 
    NINE_SECONDS    : 9000   + plusRandomMilliseconds(),

    APP_WIDTH       : 1000,
    APP_HEIGHT      : 600,
}