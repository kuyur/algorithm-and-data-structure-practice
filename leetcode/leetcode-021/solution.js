/**
 * @param {{val: number, next: {}}} l1
 * @param {{val: number, next: {}}} l2
 * @return {{val: number, next: {}}}
 */
var mergeTwoLists = function(l1, l2) {
  if (l1 == null) {
    return l2;
  }
  if (l2 == null) {
    return l1;
  }

  if (l1.val > l2.val) {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  } else {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  }
};
