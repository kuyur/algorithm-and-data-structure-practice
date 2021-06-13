/**
 * Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.
 *
 * k is a positive integer and is less than or equal to the length of the linked list.
 * If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
 *
 * You may not alter the values in the list's nodes, only nodes themselves may be changed.
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

var reverse_ = function(start, end) {
  if (start === end) {
    return;
  }

  var p = start.next;
  var previous = start;
  var next = null;
  while (p !== end) {
    next = p.next;
    p.next = previous;
    previous = p;
    p = next;
  }
  end.next = previous;
};

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  if (k === 1) {
    return head;
  }
  var next = head.next;
  if (!next) {
    return head;
  }

  var counter = 1;
  var start = head;
  var first_tail = null;
  var previous_tail = null;
  var next_next = null;
  while (next) {
    counter++;
    next_next = next.next;

    if (counter === k) {
      // reverse
      reverse_(start, next);
      if (!first_tail) {
        first_tail = next;
      }
      // reset counter
      counter = 0;
      if (previous_tail) {
        previous_tail.next = next;
      }
      previous_tail = start;
      start = next_next;
    }

    next = next_next;
  }
  if (counter !== k) {
    // last group
    previous_tail.next = start;
  }

  return first_tail;
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

var result = reverseKGroup(n1, 2);
console.log(result);