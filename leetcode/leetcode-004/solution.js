/**
 * Assume that arr1 and arr2 are non-empty and sorted in ascending order.
 * @param {Array.<number>} arr1
 * @param {Array.<number>} arr2
 * @return {number}
 */
var findMedianSortedArrays = function(arr1, arr2) {
  var len1 = arr1.length,
    len2 = arr2.length;
  var total = len1 + len2;
  var k1 = len1 >> 1,
    k2 = (total >> 1) - k1;
  var bound_left = 0,
    bound_right = len1;
  var dir;
  while ((dir = check_(arr1, len1, k1, arr2, len2, k2)) !== 0) {
    var delta = dir === 1 ? Math.max(1, (bound_right - k1) >> 1) : -Math.max(1, (k1 - bound_left) >> 1);
    if (k2 - delta < 0) {
      delta = 1;
    } else if (k2 - delta >= len2) {
      delta = -1;
    }
    if (dir === 1) {
      bound_left = k1;
    } else {
      bound_right = k1;
    }
    k1 += delta;
    k2 -= delta;
  }
  return (total & 1) === 0 ? medianOfEven_(arr1, len1, k1, arr2, len2, k2) :
    medianOfOdd_(arr1, len1, k1, arr2, len2, k2);
};

/**
 * @private
 * @param {Array.<number>} arr1
 * @param {number} len1
 * @param {number} k1
 * @param {Array.<number>} arr2
 * @param {number} len2
 * @param {number} k2
 * @return {number}
 */
var check_ = function(arr1, len1, k1, arr2, len2, k2) {
  if (k1 !== 0 && k2 !== len2) {
    if (arr1[k1 - 1] > arr2[k2]) {
      return -1;
    }
  }
  if (k1 !== len1 && k2 !== 0) {
    if (arr1[k1] < arr2[k2 - 1]) {
      return 1;
    }
  }

  return 0;
};

/**
 * @private
 * @param {Array.<number>} arr1
 * @param {number} len1
 * @param {number} k1
 * @param {Array.<number>} arr2
 * @param {number} len2
 * @param {number} k2
 * @return {number}
 */
var medianOfEven_ = function(arr1, len1, k1, arr2, len2, k2) {
  var left, right;

  if (k1 === 0) {
    left = arr2[k2 - 1];
  } else if (k2 === 0) {
    left = arr1[k1 - 1];
  } else {
    left = Math.max(arr1[k1 - 1], arr2[k2 - 1]);
  }

  if (k1 === len1) {
    right = arr2[k2];
  } else if (k2 === len2) {
    right = arr1[k1];
  } else {
    right = Math.min(arr1[k1], arr2[k2]);
  }

  return (left + right) / 2;
};

/**
 * @private
 * @param {Array.<number>} arr1
 * @param {number} len1
 * @param {number} k1
 * @param {Array.<number>} arr2
 * @param {number} len2
 * @param {number} k2
 * @return {number}
 */
var medianOfOdd_ = function(arr1, len1, k1, arr2, len2, k2) {
  if (k1 === len1) {
    return arr2[k2];
  } else if (k2 === len2) {
    return arr1[k1];
  }
  return Math.min(arr1[k1], arr2[k2]);
};
