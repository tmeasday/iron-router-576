iron-router-576
===============

Simple reproduction of https://github.com/EventedMind/iron-router/issues/576

1. Notice that `data` is unset when the template is created. 

2. Swap the `loading` and `recordExists` hooks. Notice that `data` is now set.

3. Alternatively, put a timeout before the ready signal in the publication. Notice that `data` is set.
