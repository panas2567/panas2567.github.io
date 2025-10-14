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

This won't work though:

```python
>>> len(1)
```

with traceback:

```text
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    len(1)
    ~~~^^^
TypeError: object of type 'int' has no len()
```

The argument to the `len` function has to be an object with the `__len__` method implemented.
`len` is just calling the object's `__len__` with additional sanity checks, like that the returned
value is `int` and `<= sys.maxsize`.

For example, I'm interested in defining the length of a centipede according to its number of legs:

```python
class AlienCentipede:
  def __len__(self):
    return 100
```

Then I'm able to obtaine its length returns by calling the `len` built-in on it:

```python
>>> len(AlienCentipede())
100
```

The advantage of using `len` over calling the `__len__` method directly (and in general this applies to all built-ins I believe)
is the already mentioned sanity check. See the difference in the following example.

If the class would be for some (?) reason defined like this:

```python
class AmILengthMeasurable:
  def __len__(self):
    return "my length is 10 meters, so I have to be!"
```

Then we would see the difference between the following two calls:

```python
>>> AmILengthMeasurable().__len__()

"my length is 10 meters, so I have to be!"

>>> len(AmILengthMeasurable())

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    len(AmILengthMeasurable())
    ~~~^^^^^^^^^^^^^^^^^^^^^^^
TypeError: 'str' object cannot be interpreted as an integer
```

Question to the "crowd": Why did I name the centipede _AlienCentipede_?

## References

- [Python Built-in Functions official docs](https://docs.python.org/3/library/functions.html)
