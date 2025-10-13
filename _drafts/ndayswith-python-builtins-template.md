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

We can see each number `0 1 2 3 4 ` being printed one character at a time.

Note the `flush=True` argument, which is another option we have to call the `print()` function with.
Let's see what happens if the `flush=True` argument wasn't there.

## `flush` &#8594; Flush buffer

The `flush` argument allows us to forcibly flush the buffered output.
We run again the similar code as above, except now, without `flush=True`.

```python
import time
for i in range(5):
    print(i, end=" ")
    time.sleep(1)
```

Then, the difference is that we don't get one character printed to stdout per second.
We only get the final result `0 1 2 3 4 ` at once after the 5 seconds elapse.
That's because the output is buffered, until it receives a newline character, or due to other events.
More details are e.g. in this [SO question](https://stackoverflow.com/questions/15608229/what-does-prints-flush-do).

## `file` &#8594; Output file

By default, the output is written to `sys.stdout`. With `file` argument we can redirect the output
of the `print` function to another file. 
More generally, we can provide _any_ object that implements method `write(str)`.

Alright, why not. I can imagine having a need for something like this:

```python
import sys
import random

class DrunkOutput:
    @classmethod
    def write(cls, msg: str):
        msg = msg[:30] # Max 30 character are sent. The message was sent unfinished...
        wrong_idxs = random.sample(range(len(msg)), len(msg) // 5)  # Random characters are missed
        drunk_msg = "".join([c for i, c in enumerate(msg) if i not in wrong_idxs])  # Remove the random chars
        sys.stdout.write(drunk_msg)
```

Perhaps, we're planning to go out tonight, and we'd like to see how our messages would roughly look
like, to prepare as easy sentences (making strategy).
Then, by specifying the `file` argument with our object `DrunkOutput` that implements `write(str)` method,
we could expect something like:

```python
print("Hello, will you go on a date with me? <3", file=DrunkOutput)
>>> Hell, willyo on a date w
```

Implementing a custom class like this uncovers an unexpected catch (or rather more than one), 
but that would've been for a separate post itself.

# Day 2 - `open()`

# Day 3 - `len()`

# Day 4 - `dict()`

# Day 5 - `dir()`

# References

- [Python Built-in Functions official docs](https://docs.python.org/3/library/functions.html)