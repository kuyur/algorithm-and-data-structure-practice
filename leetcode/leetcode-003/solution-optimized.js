/**
 * Given a string s, find the length of the longest substring without repeating characters.
 * Example:
 *
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (!s || !s.length) {
    return 0;
  }

  var longest = 1;
  var active_start = 0,
    active_end = 0;
  var used_chars = {};
  for (var i = 0; i <= 127; ++i) {
    used_chars[String.fromCharCode(i)] = -1;
  }
  used_chars[s[0]] = 0;

  for (var i = 1, length = s.length; i < length; i++) {
    if (used_chars[s[i]] >= 0) {
      var old_position = used_chars[s[i]];
      // clear the outdated used chars
      for (var j = active_start; j <= used_chars[s[i]]; j++) {
        used_chars[s[j]] = -1;
      }
      // update the new position
      used_chars[s[i]] = i;

      active_start = old_position + 1;
      active_end = i;

      longest = Math.max(longest, active_end - active_start + 1);
    } else {
      used_chars[s[i]] = i;
      active_end = i;
      longest = Math.max(longest, active_end - active_start + 1);
    }
  }

  return longest;
};
