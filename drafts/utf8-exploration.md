---
title: "UTF-8 101"
categories:
  - Article
tags:
  - Formats
  - Python
---

This article's goal is to introduce terms such as `ascii`, `unicode`, `utf-8`, and explain how they relate
to each other. At the bottom, a few examples on how to operate with these entities in `Python` will be provided.

# Table of Contents

#TODO: Create table of contents before finalizing
#TODO: Check the references before finalizing.

# General terms

Even though everybody has (most likely) pretty much the same understanding of terms like a _character set_ and _encoding_,
their definitions differ slightly across the internet.
I chose the ones that seem the clearest and most rational to me.

A **character set**
: is a collection of characters used to represent text in a computer system[[9]](#nordvpn-charset).

The character set might include numbers, letters, punctuation marks, symbols, emojis, and control characters.
While a _character set_ in general might be considered simply as a set of characters, in the software engineering
field, we usually understand that the character set defines **the mapping of its characters to numbers** as well.

Example character set might look like the following:

| ![charset.svg](../assets/images/utf-8/charset.svg) | 
|:--------------------------------------------------:| 
|              *Sample character set.*               |

An **encoding**
: is an unambiguous mapping between bit strings and the set of possible data[[8]](#ocw-encoding). 

Note that there might be more encodings for a given character set.

<a id="ascii"></a>
# ASCII

**ASCII** (American Standard Code for Information Interchange)
: is a character encoding standard for electronic communications[[5]](#wiki-ascii).

The statement above effectively means that ASCII defines a numerical representation of a set of selected characters.
There are **128** characters including lowercase and capital letters of the English alphabet, numbers, some special characters 
such as `&#$`, and other, non-printable characters. 
Check the original table from the [RFC20](https://www.rfc-archive.org/getrfc?rfc=20#gsc.tab=0).

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

This standard uses a single byte, where the most significant bit is set to 0, hence 7 remaining bits hold the information.

Well, ASCII apparently fulfilled its purpose to define the basic set of the most common characters, yet the limitation
of 128 entries is obvious. Fortunately, there is the _Unicode_ standard with the _UTF-8_ encoding, thanks to which 
I can write beautiful Czech sentence like: _Ověnčený chmýřím, neštěstí šíříš._ Please, don't ask me to translate this :grimacing:. 

<a id="unicode"></a>
# Unicode

The **Unicode** Standard
: is a text encoding standard maintained by the Unicode Consortium designed to support the use of text in all of the 
world's writing systems that can be digitized[[6]](#wiki-unicode).

The standard was invented to reflect the needs of the internet to be able to represent any character in a unified way.
Unicode is a character set, which includes ASCII characters, different accents, CJK characters, emojis, etc.
This standard could define more than 1.1 million of unique characters in total. 

Current version of the Unicode ([16.0](https://en.wikibooks.org/wiki/Unicode/Versions#Unicode_16.0)) defines 
154,998 characters (so still a lot of free slots). 
The limit for the amount of characters described by the Unicode depends on its encodings, more specifically on _UTF-16_,
which is [the most restricted](https://stackoverflow.com/questions/130438/do-utf-8-utf-16-and-utf-32-differ-in-the-number-of-characters-they-can-store)
compared to the two other formats _UTF-8_ and _UTF-32_.

However, the _UTF-8_ version of the format plays the main role in today's world.

<a id="utf-8"></a>
# UTF-8

Based on the current statistics (2025), the usage across the internet of this character encoding is more than [98%](https://w3techs.com/technologies/overview/character_encoding).

**The Unicode Transformation Format - 8 bit**
: is a character encoding standard for electronic communication, defined by the Unicode Standard[[7]](wiki-utf8).

The main difference between the Unicode and UTF-8 is obvious now. Unicode is a _character set_, i.e. mapping of the 
different characters/symbols to numbers, and UTF-8 is an _encoding_, i.e. a way how to translate numbers to bytes,
a series of 1's and 0's.






<a name="examples"></a>
# Examples

<a name="references"></a>
# References
<a id="rfc20-ascii"></a>
1. [RFC20: ASCII Format for Network Interchange](https://www.rfc-archive.org/getrfc?rfc=20#gsc.tab=0)
<a id="rfc5198-unicode"></a>
1. [RFC5198: Unicode Format for Network Interchange](https://www.rfc-archive.org/getrfc?rfc=5198#gsc.tab=0)
<a id="so-unicode"></a>
1. [SO: How many characters can be mapped with Unicode?](https://stackoverflow.com/questions/5924105/how-many-characters-can-be-mapped-with-unicode)
<a id="w3techs"></a>
1. [w3techs.com: Usage statistics of character encodings for websites](https://w3techs.com/technologies/overview/character_encoding)
<a id="wiki-ascii"></a>
1. [Wikipedia: ASCII](https://en.wikipedia.org/wiki/ASCII)
<a id="wiki-unicode"></a>
1. [Wikipedia: Unicode](https://en.wikipedia.org/wiki/Unicode) 
<a id="wiki-utf8"></a>
1. [Wikipeda: UTF-8](https://en.wikipedia.org/wiki/UTF-8)
<a id="ocw-encoding"></a>
1. [MIT OCW: Encoding](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c1/c1s2/c1s2v4/)
<a id="nordvpn-charset"></a>
1. [NordVPN: Character Set](https://nordvpn.com/cybersecurity/glossary/character-set/)