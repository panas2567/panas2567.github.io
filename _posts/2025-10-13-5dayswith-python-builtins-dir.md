---
title: "5 Days With Python Built-ins (`dir`)"
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
dir(object, /)
```

My typical usage of the `dir` function is to explore the attributes and methods of a given object.

```python
import collections
dir(collections)
"""<cellout>
['ChainMap', 'Counter', 'OrderedDict', 'UserDict', 'UserList', 'UserString', '_Link', '_OrderedDictItemsView', '_OrderedDictKeysView', '_OrderedDictValuesView', '__all__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__', '_chain', '_collections_abc', '_count_elements', '_deque_iterator', '_eq', '_iskeyword', '_itemgetter', '_proxy', '_recursive_repr', '_repeat', '_starmap', '_sys', '_tuplegetter', 'abc', 'defaultdict', 'deque', 'heapq', 'namedtuple']
</cellout>"""
```

What's interesting, is the usage of `dir()` without arguments. As per documentation, it returns the 
list of names in the current scope. 
This is the default list of names that one can get when running `dir()` in a plain python file, or
via Python REPL via local venv.

```python
dir()
"""<cellout>
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__']
</cellout>"""
```

The list gets extended after defining our own objects:
```python
def bar():
    ...

def baz():
    pass

class Foo:
    None
    
myvar = "Am I void?"

dir()
"""<cellout>
['Foo', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'bar', 'baz', 'myvar']
</cellout>"""
```

## References

- [Python Built-in Functions official docs](https://docs.python.org/3/library/functions.html){:target="_blank"}