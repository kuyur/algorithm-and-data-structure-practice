/**
 * @author kuyur@kuyur.info
 */

/**
 * Return maximum valid distance of sibling numbers of given array.
 * @param {Array.<number>} arr
 * @return {number}
 */
function solution(arr) {
  // crate a cache map
  var map = {};
  var numbers = [];
  var length = arr.length;
  var num;
  for (var i = 0; i < length; i++) {
    num = arr[i];
    if (!map[num]) {
      map[num] = {
        start: i,
        end: i,
        num: num
      };
      numbers.push(map[num]);
    } else {
      map[num].end = i;
    }
  }

  if (numbers.length <= 1) {
    return -1;
  }
  numbers.sort(function(a, b) {
    return a.num - b.num;
  });
  var previous = numbers[0];
  var current = null;
  var max = -1;
  for (var j = 1, len = numbers.length; j < len; j++) {
    current = numbers[j];
    var distance = Math.max(Math.abs(current.end - previous.start), Math.abs(current.start - previous.end));
    if (distance > max) {
      max = distance;
    }
    previous = current;
  }
  return max;
}
