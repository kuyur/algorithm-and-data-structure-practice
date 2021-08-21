# Question

There is an array holding the length of edges.
 * The length of any edge must be larger than 0.

Pick up 3 edges from the array. If they can compose a triangle, then we find a valid combination. Output the maximum perimeter between all the valid combinations. If there is no such combination, output -1.

# Answer

Sort the array in ascending order, and search from tail of the array.

# Complexity

Time complexity: O(nlog(n))
