/**
 * Longest Increasing Subsequence.
 * Given an integer array nums, return the length of the longest strictly increasing subsequence.
 *
 * Example:
 * Input: nums = [10,9,2,5,3,7,101,18]
 * Output: 4
 * Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
 * [2,3,7,18] is also a valid subsequence. The length is still 4.
 */

/**
 * @author kuyur@kuyur.info
 */

/**
 * @param {Array.<Array.<number>>} sequences 
 * @param {number} num 
 * @param {number} startIndex 
 * @param {number} endIndex 
 * @return {number}
 */
var findSubsequenceIndex = function(sequences, num, startIndex, endIndex) {
  var index = Math.ceil((startIndex + endIndex)/ 2);
  if (sequences[index][index] === num) {
    return -1; // equal, no need to replace
  }

  if (sequences[index][index] > num) {
    if (index === 0) {
      return 0;
    }
    if (sequences[index - 1][index - 1] === num) {
      return -1;
    }
    if (sequences[index - 1][index - 1] < num) {
      return index;
    }

    return findSubsequenceIndex(sequences, num, startIndex, index - 1);
  }

  if (index + 1 > endIndex) {
    return -1;
  }
  return findSubsequenceIndex(sequences, num, index + 1, endIndex);
};

/**
 * @param {Array.<number>} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  if (!nums || !nums.length) {
    return 0;
  }

  var sequences = [
    [nums[0]]
  ];
  var sequences_count = 1;
  for (var i = 1, length = nums.length; i < length; ++i) {
    var last = sequences[sequences_count - 1];
    if (nums[i] === last[sequences_count - 1]) {
      continue;
    }
    if (nums[i] > last[sequences_count - 1]) {
      var new_last = last.slice();
      new_last.push(nums[i]);
      sequences.push(new_last);
      sequences_count++;
      continue;
    }
    var index = findSubsequenceIndex(sequences, nums[i], 0, sequences_count - 1);
    if (index === 0) {
      sequences[index] = [nums[i]];
    } else if (index >= 1) {
      var prev = sequences[index - 1];
      var seq = prev.slice();
      seq.push(nums[i]);
      sequences[index] = seq;
    }
  }

  return sequences[sequences_count - 1].length;
};
