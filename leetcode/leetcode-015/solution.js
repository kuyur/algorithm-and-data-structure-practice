/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 *
 * Notice that the solution set must not contain duplicate triplets.
 * 
 * Example:
 *
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 */

/**
 * @author kuyur@kuyur.info
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if (!nums || nums.length <= 2) {
    return [];
  }

  var zeros = [];
  var negatives = []; // < 0
  var positives = []; // > 0

  var z_count = 0, n_count = 0, p_count = 0;

  for (var i = 0, length = nums.length; i < length; ++i) {
    if (nums[i] > 0) {
      positives[p_count++] = nums[i];
    } else if (nums[i] === 0) {
      zeros[z_count++] = nums[i];
    } else {
      negatives[n_count++] = nums[i];
    }
  }
  positives.sort((a, b) => {return a - b;}); // 1 -> 2 -> 3
  negatives.sort((a, b) => {return a - b;}); // -3 -> -2 -> -1

  var results = [];

  // 3 zeros
  if (z_count >= 3) {
    results.push([0, 0, 0]);
  }

  // 1 zero, 1 negative, 1 positive
  if (z_count >= 1 && n_count >= 1 && p_count >= 1) {
    var last_n_index = n_count - 1; // use a pointer to accelerate
    for (var i = 0; i < p_count; ++i) {
      if (i > 0 && positives[i] === positives[i - 1]) { // deduplicate
        continue;
      }
      for (var j = last_n_index; j >= 0; --j) {
        if (positives[i] + negatives[j] === 0) {
          results.push([negatives[j], 0, positives[i]]);
          last_n_index = j - 1;
          break; // no need to scan the remaining numbers
        }
      }
      if (last_n_index < 0) {
        break;
      }
    }
  }

  // 2 negatives, 1 positive
  if (n_count >= 2 && p_count >= 1) {
    for (var i = 0; i < p_count; ++i) {
      if (i > 0 && positives[i] === positives[i - 1]) { // deduplicate
        continue;
      }

      // 2 sum problem (leetcode-001)
      // use two pointers
      for (var j = 0; j < n_count; ++j) {
        if (j > 0 && negatives[j] === negatives[j - 1]) { // deduplicate
          continue;
        }
        for (var k = n_count - 1; k > j; --k) {
          var sum = negatives[j] + negatives[k];
          if (sum + positives[i] < 0) {
            break;
          }
          if (sum + positives[i] === 0) {
            results.push([negatives[j], negatives[k], positives[i]]);
            break;
          }
        }
      }
    }
  }

  // 1 negative, 2 positive
  // similar to the case above
  if (n_count >= 1 && p_count >= 2) {
    for (var i = 0; i < n_count; ++i) {
      if (i > 0 && negatives[i] === negatives[i - 1]) { // deduplicate
        continue;
      }

      // use two pointers
      for (var j = 0; j < p_count; ++j) {
        if (j > 0 && positives[j] === positives[j - 1]) { // deduplicate
          continue;
        }
        for (var k = p_count - 1; k > j; --k) {
          var sum = positives[j] + positives[k];
          if (sum + negatives[i] < 0) {
            break;
          }
          if (sum + negatives[i] === 0) {
            results.push([negatives[i], positives[j], positives[k]]);
            break;
          }
        }
      }
    }
  }

  return results;
};