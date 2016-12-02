---
title: AJAX Only Option
heading: AJAX Only Option
date: 2016-08-20
layout: static.html
---
The "AJAX Only?" option sets up an endpoint that always returns a JSON object.

By default your endpoint supports both redirect and JSON modes. When this option
is enabled then your endpoint will only support JSON mode. All requests will return
a body with an object that contains the submission id. It should look something
like this:

```js
{"id":"sub_48ATRBzNKf458L16Wlz2O3lu"}
```

You will need to know how to write AJAX code if you want to use this option.
Merge with teams branch
