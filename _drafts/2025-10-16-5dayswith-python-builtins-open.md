---
title: "5 Days With Python Built-ins (`open`)"
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

Function's header:
```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

Function `file` opens a file and returns [file-like](https://docs.python.org/3/glossary.html#term-file-object) object.

## `file` &#8594; File

The only required argument is `file`, i.e. the `str` (or `bytes`) object representing the relative or
the absolute path to the file to be opened. There are two ways how to manipulate with an opened file-like object
after. 

First approach, **assignment to a variable**, needs awareness of closing the file object, when the job is done.

```python
f = open("test.txt", "w")
f.closed
>>> False
f.close()
f.closed
>>> True
```

The second, **using context manager**, is the one usually used, and recommended.
That's because the user doesn't have to worry about how the corresponding context block exits,
and the context manager makes sure the file is closed in any case.

```python
with open("test.txt", "w") as f:
    f.write("Let's fill your void.")
```

## `mode` &#8594; Opening mode

There are multiple [modes](https://docs.python.org/3/library/functions.html#open) of how we can open the file:

- `'r'` &#8594; open for reading
- `'w'` &#8594; open for writing, truncating the file first
- `'x'` &#8594; open for writing, exclusive creation, fails if `file` already exists
- `'a'` &#8594; open for writing, appending to the end
- `'b'` &#8594; binary mode
- `'t'` &#8594; text mode
- `'+'` &#8594; open for updating, reading and writing

### Read/Write mode

By far, the `r` and `w` are the two modes used the most by me (with the default `t` included).
Let's explore some of the typical cases for the rest of arguments.

### Exclusive creation

Helpful in cases where we want to be sure the selected file is not truncated, if it already exists.
Especially useful when the same file might be accessed by two different processes concurrently.

```python
with open("exclusive.txt", "x") as f:
    f.write("I'm doing this only once...")

with open("exclusive.txt", "x") as f:
    f.write("I'm doing this only once...")

"""
Traceback (most recent call last):
  File "<python-input-34>", line 1, in <module>
    with open("exclusive.txt", "x") as f:
         ~~~~^^^^^^^^^^^^^^^^^^^^^^
FileExistsError: [Errno 17] File exists: 'exclusive.txt'
"""
```

### Appending

The `a` mode allows us to open (and create if not exists) the file without the truncation.

```python
with open("exclusive.txt", "a") as f:
    f.write("I'm doing this again...")
```

### Binary mode

Let's assume we have file named "foo.txt", and its content to be only a single letter `á`.
Then we can read this file in two different ways:

```python
# First - default text mode
with open("b.txt", "r") as f:
    s = f.read()
s
>>> 'á'
type(s)
>>> <class 'str'>
# Second - binary mode
with open("b.txt", "rb") as f:
    s = f.read()
s
>>> b'\xc3\xa1'
type(s)
>>> <class 'bytes'>
```

In the second case, the `read` method of the file-like object returns `bytes` instead of `str`. 

### The `+` mode

---> continue here

What's the difference between `w+` and `r+`?
The opened file-like object is both readable and writable.
The difference is only that with `w+`, then file is truncated with
its opening, whereas the `r+` option preserves the content.

```python
>>> with open("baz.txt", "r+") as f:
...     print(f.read())
...     f.write("123")
...     
some text
3
```

## `buffering` &#8594; 

## `encoding` &#8594; 

## `errors` &#8594; 

## `newline` &#8594; 

## `closefd` &#8594; 

## `opener` &#8594; 

## References

- [Python Built-in Functions official docs](https://docs.python.org/3/library/functions.html)