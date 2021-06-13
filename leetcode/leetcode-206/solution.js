/**
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 */

/**
 * @author kuyur@kuyur.info
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if (!head) {
    return null;
  }
  if (!head.next) {
    return head;
  }

  var current = head.next;
  var previous = head;
  var next = null;
  while (current) {
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  head.next = null;

  return previous;
};

var n5 = {
  val: 5,
  next: null
};
var n4 = {
  val: 4,
  next: n5
};
var n3 = {
  val: 3,
  next: n4
};
var n2 = {
  val: 2,
  next: n3
};
var n1 = {
  val: 1,
  next: n2
};

var result = reverseList(n1);
console.log(result);
