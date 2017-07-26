export default {
    arrayRemoveValue: function (array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                array.splice(i, 1);
                break;
            }
        }
    },
    getElementsByAttr: function (parentNode, attr) {
        return Array.from(parentNode.querySelectorAll('[' + attr + ']'));
    },
    arrayContains: function (arr, obj) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    },
    htmlCodeToHtmlNode: function (htmlCode) {
        let htmlCodeContainer = document.createElement('div');
        htmlCodeContainer.innerHTML = htmlCode;
        return htmlCodeContainer.firstChild;
    }
}