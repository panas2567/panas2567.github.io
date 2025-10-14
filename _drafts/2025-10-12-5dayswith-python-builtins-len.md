---
title: "5 Days With Python Built-ins (`len`)"
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

> :gear: Python version: 3.14

The header of the function:

```python
len(object, /)
```

Function `len` returns the number of items of an object, its length.
For example, I want to quickly check the length of a list or a pandas DataFrame to get number of rows.

```python
>>> len("25 characters long string")

>>> len(range(24))
>>> len([1, 2]*10)
```

## References

- [Python Built-in Functions official docs](https://docs.python.org/3/library/functions.html)
