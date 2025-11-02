---
title: "How to merge two videos easily (on pretty much any operating system)"
categories:
  - QuickTip
tags:
  - Mac
  - QuickTip

toc: true
toc_label: "Elements"
toc_icon: "list-ol"  # corresponding Font Awesome icon name (without fa prefix)
---

<span class="tldr">To merge two videos into one, one can leverage this cool **command line tool** [ffmpeg](https://www.ffmpeg.org/){:target="_blank"}.</span>

<div class="tldr-only" style="white-space: pre-line">
The usage:
</div>

{:.tldr-only}
```shell
ffmpeg -i video1.mov -i video2.mov -filter_complex "vstack=inputs=2" video-combined.mov
```

# FFmpeg

`FFmpeg` is a highly versatile [framework](https://www.ffmpeg.org/documentation.html){:target="_blank"}, available for pretty much 
any operating system, including Linux, Mac OS X, Windows, etc., that offers functionality 
to work with multimedia, audio and video, of any format.

# My case

I needed to vertically include two videos of my screen recording into a single one on Mac (Tahoe),
so that both can be played at the same time.

My case was very simple, and that's why I wanted a very simple way to do it quickly.

So basically, the following two lines were all I had to do, and `FFmpeg` did exactly I needed it to do
on the very first go.

```shell
brew install ffmpeg
ffmpeg -i video1.mov -i video2.mov -filter_complex "vstack=inputs=2" video-combined.mov
```

The first line assumes the <a href="https://brew.sh/" target="_blank">Homebrew is installed</a>.

The result:
<video width="900" height="350" controls="controls">
  <source src="/assets/videos/buffering-combined.mov" type="video/mp4">
</video>

# Other cases

Of course, this is only one specific example out of the vast number of features this framework provides.
Check the following links to see other use cases possible with `ffmpeg`.

- [How to use FFmpeg](https://shotstack.io/learn/how-to-use-ffmpeg/){:target="_blank"}
- [FFmpeg-A-Short-Guide](https://github.com/term7/FFmpeg-A-short-Guide){:target="_blank"}