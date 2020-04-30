export function binarySearch(items, value) {
    var startIndex = 0,
        stopIndex = items.length - 1,
        middle = Math.floor((stopIndex + startIndex) / 2);

    while (items[middle].value !== value && startIndex < stopIndex) {
        //adjust search area
        if (value < items[middle].value) {
            stopIndex = middle - 1;
        } else if (value > items[middle].value) {
            startIndex = middle + 1;
        }

        //recalculate middle
        middle = Math.floor((stopIndex + startIndex) / 2);
    }

    //make sure it's the right value
    return items[middle].value !== value ? -1 : middle;
}
