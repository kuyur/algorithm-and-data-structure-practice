/**
 * Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @author kuyur@kuyur.info
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) {
    return null;
  }
  var pA = headA;
  while (pA) {
    pA.flagA = true;
    pA = pA.next;
  }

  var pB = headB;
  while (pB) {
    if (pB.flagA) {
      return pB;
    }
    pB = pB.next;
  }

  return null;
};