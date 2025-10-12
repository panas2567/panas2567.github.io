---
title: "5 days with Python built-ins"
categories:
  - NDaysWith
tags:
  - Python
  - Programming
  - NDaysWith

toc: true
toc_label: "Elements"
toc_icon: "list-ol"  # corresponding Font Awesome icon name (without fa prefix)
---

I'm picking up 5 Python built-ins, and I'll invest few minutes per day per each of them. As a starter, the built-ins
chosen are the ones I use the most on a daily basis. Am I going to find out the potential usage of these 
I had no idea about?

> :gear: Python version: 3.14

# Day 1 - `print()`

The header of the function: 

`print(*objects, sep=' ', end='\n', file=None, flush=False)`

My typical usage:
```python
print("Some statement...")
print("first string", "second one")
```

What about the rest of the arguments? Honestly, I barely used `print` function in a different way than the
one above. Let's explore the other options.

## `sep` &#8594; Separator

`sep` argument let's you define a custom separator between the objects, defaults to a blank space.

```python
print("a", "b", "c", sep=" & ")
>>> a & b & c
```

This potentially makes concatenating a list elements more explicit and readable:

```python
my_list = ["a", "b", "c"]
print("_".join(my_list))  # instead of this
print(*my_list, sep="_")  # one can use this
```

## `end` &#8594; Ending character

`end` allows to define an optional end character other than newline `\n`. I think the main advantage is
that this can be useful in loops. It can serve e.g. like a progress tracking. For example:

```python
import time
for i in range(5):
    print(i, end=" ", flush=True)
    time.sleep(1)
```

Note the `flush=True` argument, which is another option we have to call the `print()` function with.
Let's see what happens if the `flush=True` argument wasn't there.

## `flush` &#8594; Flush buffer

# Day 2 - `open()`

# Day 3 - `len()`

# Day 4 - `dict()`

# Day 5 - `dir()`

# References

- [Python Built-in Functions official docs](https://docs.python.org/3/library/functions.html)



