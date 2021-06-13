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
 * @author kuyur@kuyur.info
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (!s || !s.length) {
    return 0;
  }

  var longest = [0, 0];
  var active = [0, 0];
  var used_chars = {};
  used_chars[s[0]] = {
    'position': 0
  };

  for (var i = 1, length = s.length; i < length; i++) {
    if (used_chars[s[i]]) {
      var old_position = used_chars[s[i]].position;
      var start = used_chars[s[i]].position + 1;
      var end = i;
      var old_start = active[0];
      active = [start, end];
      if (end - start >= longest[1] - longest[0]) {
        longest = [start, end];
      }
      if (start === end) {
        used_chars = {};
        used_chars[s[i]] = {
          'position': i
        };
      } else {
        // clear the outdated used chars
        for (var j = old_start; j <= old_position; j++) {
          used_chars[s[j]] = null;
        }
        // update the new position
        used_chars[s[i]] = {
          'position': i
        };
      }
    } else {
      used_chars[s[i]] = {
        'position': i
      };
      active[1] = i;
      if (active[1] - active[0] >= longest[1] - longest[0]) {
        longest = [active[0], active[1]];
      }
    }
  }

  return longest[1] - longest[0] + 1;
};
