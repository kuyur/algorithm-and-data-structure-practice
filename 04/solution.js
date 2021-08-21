/**
 * @author kuyur@kuyur.info
 */

/**
 * @return {number}
 * @param {Array.<number>} arr
 */
function solution(arr) {
  if (!arr) {
    return -1;
  }
  var length = arr.length;
  if (length < 3) {
    return -1;
  }

  arr.sort((a, b) => { return a - b;}); // ascending order

  for (var i = length - 3; i >= 0; i--) {
    if (arr[i] + arr[i + 1] > arr[i + 2]) {
      return arr[i] + arr[i + 1] + arr[i + 2];
    }
  }

  return -1;
}
