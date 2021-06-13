/**
 * Merge two sorted linked lists and return it as a sorted list.
 * The list should be made by splicing together the nodes of the first two lists.
 */

/**
 * Example:
 * Input: l1 = [1,2,4], l2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 */

/**
 * @author kuyur@kuyur.info
 */

/**
 * @param {Array.<number>} l1
 * @param {Array.<number>} l2
 * @return {Array.<number>}
 */
var mergeTwoLists = function(l1, l2) {
  if (l1 == null) {
    return l2;
  }
  if (l2 == null) {
    return l1;
  }

  var result = [];
  var len1 = l1.length,
    len2 = l2.length;
  var i = 0,
    j = 0;
  var k = 0;
  while (i < len1 || j < len2) {
    if (l1[i] > l2[j]) {
      result[k++] = l2[j];
      j++;
    } else {
      result[k++] = l1[i];
      i++;
    }
  }

  return result;
};
