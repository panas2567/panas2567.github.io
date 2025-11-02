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

Function `len` returns the number of items of an object, its length.

> :gear: Python version: 3.14

The header of the function:

```python
len(object, /)
```

Me, for example, I want to quickly check the length of a list or a pandas DataFrame to get number of rows,
number of characters in a string, etc.

```python
len("25 characters long string")
"""<cellout>25</cellout>"""
len(range(24))
"""<cellout>24</cellout>"""
len([1, 2]*10)
"""<cellout>20</cellout>"""
```

This won't work though:

```python
len(1)
"""<cellout>
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    len(1)
    ~~~^^^
TypeError: object of type 'int' has no len()
</cellout>"""
```

The argument to the `len` function has to be an object with the `__len__` method implemented.
`len` is just calling the object's `__len__` method with additional sanity checks, like that the returned
value is `int` and `<= sys.maxsize`.

For example, I'm interested in defining the length of a centipede according to its number of legs:

```python
class AlienCentipede:
  def __len__(self):
    return 100
```

Then I'm able to obtain its length by calling the `len` built-in on it:

```python
len(AlienCentipede())
"""<cellout>100</cellout>"""
```

The advantage of using `len` over calling the `__len__` method directly (and in general this applies to all built-ins I believe)
is the already mentioned sanity check. See the difference in the following example.

If the class would've been defined like this (for some (?) reason):

```python
class AmILengthMeasurable:
  def __len__(self):
    return "my length is 10 meters, so I have to be!"
```

Then we would see the difference between the following two calls:

```python
AmILengthMeasurable().__len__()
"""<cellout>"my length is 10 meters, so I have to be!"</cellout>"""
len(AmILengthMeasurable())
"""<cellout>
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    len(AmILengthMeasurable())
    ~~~^^^^^^^^^^^^^^^^^^^^^^^
TypeError: 'str' object cannot be interpreted as an integer
</cellout>"""
```

Question to the "crowd": Why did I name the centipede _AlienCentipede_?

## References

- [Python Built-in Functions official docs](https://docs.python.org/3/library/functions.html){:target="_blank"}
