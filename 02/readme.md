# Background

There is a matrix panel, holding a light in every cell.

Here are the rules of Lights Out Game:
* There are two statuses, `on` and `off`, for each light. Let's mark `on` as `1`, and `off` as `0`.
* We can touch the cell to toggle the status of light. However, the status of adjacent lights also will be toggled at the same time.
* You can touch only one cell a time. One touching is calculated as 1 step. 

For example, consider that we have a matrix panel now:

    0 0 0 0 0
    0 1 1 0 0
    0 0 0 0 0

If we touch the cell`[1, 2]` (row-index=1, column-index=2, indexes are 0-based.), the matrix will become:

    0 0 1 0 0
    0 0 0 1 0
    0 0 1 0 0

Because (the touched cell is marked as ❶):

    0 0 0 0 0     0 0 0 0 0     0 0 1 0 0
    0 1 1 0 0  →  0 1 ❶ 0 0  →  0 0 0 1 0
    0 0 0 0 0     0 0 0 0 0     0 0 1 0 0

You can refer to https://en.wikipedia.org/wiki/Lights_Out_(game) for more detail.

# Question
Given a matrix panel with some lights on, find out the solution with minimum steps to turn off all lights. If there is no solution, return null.

For example, given a matrix panel:

    0 0 0 0 1
    0 0 0 0 0
    0 0 1 0 0
    0 0 0 0 0

One possible solution (with 4 steps) is:

    [1, 4] → [2, 3] → [2, 4] → [3, 4]

# Hint

The order of steps is not important actually. Even we disrupt the order, it still be a valid solution, e.g.:

    [2, 3] → [2, 4] → [1, 4] → [3, 4]

The solution can be represented in another matrix:

    0 0 0 0 0
    0 0 0 0 1
    0 0 0 1 1
    0 0 0 0 1

# Answer

## English
It is a Linear algebra mathematical problem actually.

## Chinese
这是一道线性代数数学题。

# Code
    var matrix = [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    var result = findSolution(4, 5, matrix);
    console.log(result);
    // [
    //   [0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 1],
    //   [0, 0, 0, 1, 1],
    //   [0, 0, 0, 0, 1]
    // ]
