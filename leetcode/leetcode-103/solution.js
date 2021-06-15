/**
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).
 * 
 * Example :
 *
 * Tree structure:
 * 3 -> 9, 20
 * 9 -> null, null
 * 20 -> 15, 7
 *
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[20,9],[15,7]]
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @author kuyur@kuyur.info
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  var result = [];
  traversal(root, result, 0);
  return result;
};

var traversal = function(node, result, level) {
  if (!node) {
    return;
  }

  if (!result[level]) {
    result[level] = [];
  }

  if (level & 1 === 1) { // right -> left, level 1,3,5,7,...
    result[level].unshift(node.val);
  } else {
    result[level].push(node.val);
  }

  traversal(node.left, result, level + 1);
  traversal(node.right, result, level + 1);
};