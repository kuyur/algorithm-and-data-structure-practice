/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * You can return the answer in any order.
 * 
 * Example:
 *
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  if (!nums || nums.length <= 1) {
    return [];
  }

  nums = nums.map((value, index) => {
    return {
      value: value,
      index: index
    };
  });
  nums.sort((a, b) => {return a.value - b.value;});

  // use two pointers
  var length = nums.length;
  var i = 0,
    j = length - 1;
  for (; i < length; ++i) {
    for (; j > i; --j) {
      var sum = nums[i].value + nums[j].value;
      if (sum < target) {
        break;
      }
      if (sum === target) {
        return [nums[i].index, nums[j].index];
      }
    }
  }
  return [];
};
