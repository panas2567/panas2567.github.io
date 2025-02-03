---
title: "UTF-8 101"
categories:
  - Article
tags:
  - Formats
  - Python
---

The time has come.

The time for me to finally dig a bit into terms like _ascii, unicode, utf-8_ which a data engineer sees a lot but usually
is like: _OK, I don't care who you are, but you seem familiar to me, hence I trust you._

I'll try to extract only the most important findings about this topic I believe can be helpful 
for others in the same situation as me.

# ASCII

_American Standard Code for Information Interchange_ defines a numerical representation of 128 characters including
lowercase and capital letters of the English alphabet, numbers, some special characters such as `&#$`, and other,
non-printable characters. Check the original table from the [RFC20](https://www.rfc-archive.org/getrfc?rfc=20#gsc.tab=0).

```text
|----------------------------------------------------------------------|
  B  \ b7 ------------>| 0   | 0   | 0   | 0   | 1   | 1   | 1   | 1   |
   I  \  b6 ---------->| 0   | 0   | 1   | 1   | 0   | 0   | 1   | 1   |
    T  \   b5 -------->| 0   | 1   | 0   | 1   | 0   | 1   | 0   | 1   |
     S                 |-----------------------------------------------|
               COLUMN->| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
|b4 |b3 |b2 |b1 | ROW  |     |     |     |     |     |     |     |     |
+----------------------+-----------------------------------------------+
| 0 | 0 | 0 | 0 | 0    | NUL | DLE | SP  | 0   | @   | P   |   ` |   p |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 0 | 0 | 1 | 1    | SOH | DC1 | !   | 1   | A   | Q   |   a |   q |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 0 | 1 | 0 | 2    | STX | DC2 | "   | 2   | B   | R   |   b |   r |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 0 | 1 | 1 | 3    | ETX | DC3 | #   | 3   | C   | S   |   c |   s |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 1 | 0 | 0 | 4    | EOT | DC4 | $   | 4   | D   | T   |  d  |   t |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 1 | 0 | 1 | 5    | ENQ | NAK | %   | 5   | E   | U   |  e  |   u |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 1 | 1 | 0 | 6    | ACK | SYN | &   | 6   | F   | V   |  f  |   v |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 1 | 1 | 1 | 7    | BEL | ETB | '   | 7   | G   | W   |  g  |   w |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 0 | 0 | 0 | 8    | BS  | CAN | (   | 8   | H   | X   |  h  |   x |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 0 | 0 | 1 | 9    | HT  | EM  | )   | 9   | I   | Y   |  i  |   y |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 0 | 1 | 0 | 10   | LF  | SUB | *   | :   | J   | Z   |  j  |   z |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 0 | 1 | 1 | 11   | VT  | ESC | +   |  ;  | K   | [   |  k  |   { |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | 0 | 0 | 12   | FF  | FS  | ,   | <   | L   | \   |  l  |   | |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | 0 | 1 | 13   | CR  | GS  | -   | =   | M   | ]   |  m  |   } |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | 1 | 0 | 14   | SO  | RS  | .   | >   | N   | ^   |  n  |   ~ |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | 1 | 1 | 15   | SI  | US  | /   | ?   | O   | _   |  o  | DEL |
+----------------------+-----------------------------------------------+
```

This standard uses a single byte, where the most significant bit is set to 0, hence 7 bits remaining hold the information.

Well, ASCII apparently fulfilled its purpose to define the basic set of the most common characters, yet the limitation
of 128 entities is obvious. Fortunately, there is the _Unicode_ standard with the _UTF-8_ encoding, thanks to which 
I can write beautiful Czech sentence like: _Ověnčený chmýřím, neštěstí šíříš._ Please, don't ask me to translate this :grimacing:. 

# Unicode

Unicode standard defines more characters. Way more characters. Actually, it's capable of mapping more than 1.1 million
of unique characters.

Currently version of Unicode ([16.0](https://en.wikibooks.org/wiki/Unicode/Versions#Unicode_16.0)) defines 
154,998 characters. The limit for the amount of characters described by the Unicode depends on its encodings, 
more specifically on [_UTF-16_](https://stackoverflow.com/questions/130438/do-utf-8-utf-16-and-utf-32-differ-in-the-number-of-characters-they-can-store),
which is the most restricted compared to the two others _UTF-8_ and _UTF-32_.

However, only one of these plays the crucial role in today's world of computers, and it is... **UTF-16**.

Just kidding, here it's a bit similar to a series of movies. _Usually_, the episodes with the smaller numbers are
better. _UTF-8_ is the variant we're interested in the most.

# UTF-8

Based on the current statistics (2025), the usage of this character encoding is more than [98%](https://w3techs.com/technologies/overview/character_encoding).

TODO: Explain what actually is the character encoding and why Unicode as a charset has to define it's encodings (to know what characters is it able to define).

# References
- [RFC20: ASCII Format for Network Interchange](https://www.rfc-archive.org/getrfc?rfc=20#gsc.tab=0)
- [RFC5198: Unicode Format for Network Interchange](https://www.rfc-archive.org/getrfc?rfc=5198#gsc.tab=0)
- [SO: How many characters can be mapped with Unicode?](https://stackoverflow.com/questions/5924105/how-many-characters-can-be-mapped-with-unicode)
